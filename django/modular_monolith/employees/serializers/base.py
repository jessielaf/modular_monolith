from rest_framework import serializers
from employees.models import Employee


class BaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'