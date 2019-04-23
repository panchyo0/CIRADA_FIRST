from django.db import models

# FIRST model
class FIRST(models.Model):
    ID=models.AutoField(primary_key=True)
    FIRST=models.CharField(max_length=1024,blank=True, null=True)
    RAJ2000=models.DecimalField(max_digits=27,decimal_places=20,null=True, blank=True,help_text="Right Ascension in decimal degree units")
    DEJ2000=models.DecimalField(max_digits=27,decimal_places=20,null=True, blank=True,help_text="Declination in decimal degree units")
    Fint=models.DecimalField(max_digits=27,decimal_places=20,null=True, blank=True,help_text="mJy, Integrated flux density (akin to intensity) in radio astronomer units")
    c1=models.CharField(max_length=10,blank=True, null=True,help_text="s=star; g=galaxy; or blank")
    class Meta:
        ordering = ["-ID", ]
    def __str__(self):
        return '%s (%s,%s)' % (self.FIRST,self.RAJ2000,self.DEJ2000)