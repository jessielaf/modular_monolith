from rest_framework import serializers
from shifts.models import Shift
from employees.api import api


class ListSerializer(serializers.ModelSerializer):
    employees = api.base_serializer(many=True)

    class Meta:
        model = Shift
        fields = '__all__'
