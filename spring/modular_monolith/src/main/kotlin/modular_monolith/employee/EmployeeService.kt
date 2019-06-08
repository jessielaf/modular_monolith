package modular_monolith.employee

import org.springframework.stereotype.Service
import java.util.*

@Service
class EmployeeService(val employeeRepository: EmployeeApi().repository) {
    fun getAll() = employeeRepository.findAll()
}
