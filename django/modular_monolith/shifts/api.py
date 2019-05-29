from shifts.models import Shift
from shifts.serializers.base import BaseSerializer
from modular_monolith.api import ModuleAPI

api = ModuleAPI(Shift, BaseSerializer)