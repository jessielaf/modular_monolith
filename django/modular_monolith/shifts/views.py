from rest_framework import viewsets
from shifts.models import Shift
from shifts.serializers.list import ListSerializer


class MainViewSet(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    serializer_class = ListSerializer
