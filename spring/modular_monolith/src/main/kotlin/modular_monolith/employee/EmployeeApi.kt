package modular_monolith.employee

import modular_monolith.Api
import modular_monolith.employee.serializers.BasisSerializer

class EmployeeApi: Api(BasisSerializer::class, EmployeeRepository::class)