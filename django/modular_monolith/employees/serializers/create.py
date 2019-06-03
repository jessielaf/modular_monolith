from rest_framework import serializers
from employees.models import Employee


class CreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
