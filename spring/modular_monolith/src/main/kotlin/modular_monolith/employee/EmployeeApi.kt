package modular_monolith.employee

import modular_monolith.Api
import modular_monolith.employee.serializers.BaseSerializer

class EmployeeApi: Api(Employee::class, BaseSerializer::class, EmployeeRepository::class)