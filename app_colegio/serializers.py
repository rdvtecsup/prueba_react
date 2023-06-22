from rest_framework import serializers
from .models import *

class ColegioSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblColegio
        fields = '__all__'

class ZonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TblZona
        fields = '__all__'