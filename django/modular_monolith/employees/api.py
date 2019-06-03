from employees.models import Employee
from employees.serializers.base import BaseSerializer
from modular_monolith.api import ModuleAPI

api = ModuleAPI(Employee, BaseSerializer)
