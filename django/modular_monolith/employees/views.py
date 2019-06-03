from rest_framework import viewsets
from employees.models import Employee
from employees.serializers.create import CreateSerializer
from employees.serializers.list import ListSerializer


class MainViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = ListSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateSerializer

        return super().get_serializer_class()
