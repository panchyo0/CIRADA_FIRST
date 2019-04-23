from django.contrib.auth.models import User
from rest_framework import viewsets, pagination
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination

"""
super class for viewset
    permission_classes
    pagination_class
"""
class CustomPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'size'

class ModelViewSetBase(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = CustomPageNumberPagination