package modular_monolith.employee

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface EmployeeRepository: CrudRepository<Employee, Long> {
}