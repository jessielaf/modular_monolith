package modular_monolith.employee

import org.springframework.stereotype.Service

@Service
class EmployeeService(val employeeRepository: EmployeeRepository) {
    fun getAll() = employeeRepository.findAll()
}
