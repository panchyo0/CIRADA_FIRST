from first.models import FIRST
from rest_framework import serializers
from rest_framework import fields, validators


"""
Sericlizer class
    return all fields of a FIRST object
"""

class FirstSerializer(serializers.ModelSerializer):
    class Meta:
        model = FIRST
        fields = '__all__'