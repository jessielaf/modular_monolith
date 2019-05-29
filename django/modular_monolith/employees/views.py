from rest_framework import viewsets
from employees.models import Employee
from employees.serializers.list import ListSerializer


class MainViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = ListSerializer
