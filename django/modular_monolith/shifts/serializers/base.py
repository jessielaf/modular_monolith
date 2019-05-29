from rest_framework import serializers
from shifts.models import Shift


class BaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = '__all__'