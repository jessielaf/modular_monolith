from rest_framework import viewsets
from shifts.models import Shift
from shifts.serializers.create import CreateSerializer
from shifts.serializers.list import ListSerializer


class MainViewSet(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    serializer_class = ListSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return CreateSerializer

        return super().get_serializer_class()
