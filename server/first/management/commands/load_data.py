from django.core.management.base import BaseCommand, CommandError
from first.models import FIRST
import os
from django.conf import settings
from datetime import datetime
from astropy.io import fits

"""
Load data from FIRST_data.fit, if data exsit then skip, else create new.
with data formate ('J110711.6+640737', 166.79847916666665, 64.12696666666666, 32.57, 's')

fileName
    fit data file
--limit 
    Indicates the number of FIRST objects to be created

--check
    If data exsit then skip, else create new. False by defaulte.
"""
class Command(BaseCommand):
    help = 'Populate data from .fit file'

    def add_arguments(self, parser):
        parser.add_argument('fileName', type=str, help='FIT file name --exp FIRST_data.fit')
        # Optional argument
        parser.add_argument('-c', '--check', action='store_true',help='Check data exist or not,default is false', )
        parser.add_argument(
            '-l',
            '--limit', 
            type=int,
            nargs=1,
            help='Indicates the number of FIRST objects to be created',
        )


    def handle(self, *args, **options):
        limit = None
        check=False
        fileName = options['fileName']
        if options['limit']:
            limit = (options['limit'][0])
        if options['check']:
            check=options['check']
        file_ext=fileName.split(".")
        try:
            if file_ext[1]=="fit" or file_ext[1]=="FIT":
                self.stdout.write(self.style.SUCCESS( 'Start: %s ' % (datetime.now())))
                # load data
                self.load_data(fileName,limit,check)

                self.stdout.write(self.style.SUCCESS('End: %s ' % (datetime.now())))
                self.stdout.write(self.style.SUCCESS('Successfully loaded'))
            else:
                self.stdout.write(self.style.WARNING('FAILURE! - Data file format must be .fit or .FIT'))
        except:
            self.stdout.write(self.style.SUCCESS('fileName is not valid --exp FIRST_data.fit'))
    
    def load_data(self,fileName,limit,check):
        print('Import FIT File')
        fit_file = os.path.join(settings.CIRADA_INITIAL_DATA_LOAD, fileName)
        with fits.open(fit_file) as hdul:
            hdul.info()
            count=0
            data_created=0
            data_skip=0
            try:
                data_total=len(hdul[1].data)
                for data in hdul[1].data:
                    if count%10000==0:
                        print("Total "+str(count)+"/"+str(data_total)+",skiped "+str(data_skip))
                    if check:
                        found=FIRST.objects.filter(FIRST=data[0]).exists()
                        if found:
                            data_skip+=1
                        else:
                            self.create_obj(data,count)
                    else:
                        self.create_obj(data,count)
                    count+=1
                print("Total " +str(count)+" ," +"skiped "+str(data_skip))
            except:
                print("HDU LIST [1] IS EMPTY")
    
    def create_obj(self, data,count):
        try:
            FIRST.objects.create(FIRST=data[0],RAJ2000=data[1],DEJ2000=data[2],Fint=data[3],c1=data[4])
        except Exception as e:
            print(str(count)+" "+str(data[0])+" "+str(data[1])+" "+str(data[2])+" "+str(data[3])+" "+str(data[4]))
            print(e)

                