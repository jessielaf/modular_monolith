from rest_framework import serializers
from employees.models import Employee
from shifts.api import api


class ListSerializer(serializers.ModelSerializer):
    shifts = api.base_serializer(source='shift_set', many=True)

    class Meta:
        model = Employee
        fields = '__all__'
