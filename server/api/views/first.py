from .super_view import ModelViewSetBase
from rest_framework import mixins
from api import serializers
from first.models import FIRST

import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.response import Response
from rest_framework import status

from PyAstronomy import pyasl
from decimal import Decimal

"""
API filter
    source: char 
        returns a table of all FIRST sources within a user inpute degree radius of a user-specified position 
    FIRST: char
        Identifying Name in Survey
    RAJ2000: float
        Right Ascension in decimal degree units
    DEJ2000: float
        Declination in decimal degree units
    Fint: float
        Integrated flux density (akin to intensity) in radio astronomer units
    c1: char
        SDSS classification (s=star; g=galaxy; or blank)
"""
class FirstFilter(django_filters.FilterSet):
    source = django_filters.CharFilter(method='filter_by_source',label="Source (Ra,Dec,Radius,Sexigessimal)")
    FIRST = django_filters.CharFilter(lookup_expr='icontains')
    RAJ2000=django_filters.RangeFilter()
    DEJ2000=django_filters.RangeFilter()
    Fint=django_filters.NumberFilter(lookup_expr='icontains')
    c1=django_filters.CharFilter(lookup_expr='icontains')
    class Meta:
        model = FIRST
        fields = ['DEJ2000',]
    
    def filter_by_source(self, qs, name, value):
        if value is not None:
            parms=value.split(',')
            if len(parms)==4:
                radius=float(parms[2])
                sexi=parms[3]
                try:
                    ra, de = self.translate_source(parms[0],parms[1],sexi)
                except:
                    return FIRST.objects.none()
                #caculate upper and lower case
                ra_up=ra+radius
                ra_low=ra-radius
                de_up=de+radius
                de_low=de-radius
                qs = qs.filter(RAJ2000__gte=ra_low,RAJ2000__lte=ra_up,DEJ2000__gte=de_low,DEJ2000__lte=de_up).order_by('-ID')
        return qs
    
    """
    if Sexigessimal is true, convert to decimal.
    """
    def translate_source(self,ra,dec,sexi):
        valid_true=['true','TRUE','True','t','T']
        if sexi in valid_true:
            if dec[0]!="+" or dec[0]!="-":
                dec="+%s" % (dec)
            hd1=ra+" "+dec
            ra, dec = pyasl.coordsSexaToDeg(hd1)
        # print(pyasl.coordsDegToSexa(float(ra),float(dec)))
        return float(ra),float(dec)


"""
return a list of first objects according user filter, only get method allowed.
"""
class FirstViewSet(ModelViewSetBase):
    queryset = FIRST.objects.all().order_by('-ID')
    serializer_class = serializers.FirstSerializer
    filter_backends = (DjangoFilterBackend,OrderingFilter)
    filterset_class = FirstFilter
    http_method_names = ['get',]
    """
    return list with angular separation.
    """
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        try:
            source=request.GET.getlist('source')
            print(source)
            if source[0]!='':
                parms=source[0].split(',')
                if len(parms)==4:
                    ra=float(parms[0])
                    de=float(parms[1])
                    radius=float(parms[2])
                    sexi=parms[3]

                    if page is not None:
                        serializer = self.get_serializer(page, many=True)
                        self.angular_separation(serializer.data,ra,de)
                        return self.get_paginated_response(serializer.data)

                    serializer = self.get_serializer(queryset, many=True)
                    return Response(serializer.data)
                else:
                    return Response({"Failure": "Filter <source> need 4 parameters"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return super(FirstViewSet,self).list(request, *args, **kwargs)
    """
    caculate angular separation
    """
    def angular_separation(self,dataList,sourceRa,sourceDe):
        for item in dataList:
            angular_separation=pyasl.getAngDist(sourceRa,sourceDe,float(item['RAJ2000']),float(item['DEJ2000']))
            item.update({'angular_separation':angular_separation})