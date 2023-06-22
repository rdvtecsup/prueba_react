from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import viewsets

from .models import * 
from .serializers import * 


class ColegioDetailView(viewsets.ModelViewSet):
    queryset = TblColegio.objects.all()
    serializer_class = ColegioSerializer

class ZonaDetailView(viewsets.ModelViewSet):
    queryset = TblZona.objects.all()
    serializer_class = ZonaSerializer