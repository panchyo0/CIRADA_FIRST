from django.contrib import admin
from .models import FIRST

# Register your models here.
class FIRSTAdmin(admin.ModelAdmin):
    # actions = ['Deactive','Active'] 

    list_display = ('ID','FIRST', 'RAJ2000','DEJ2000','Fint','c1',)
    list_filter = (
                   ('c1'),
                   )
    search_fields = ('FIRST','ID')

admin.site.register(FIRST,FIRSTAdmin)