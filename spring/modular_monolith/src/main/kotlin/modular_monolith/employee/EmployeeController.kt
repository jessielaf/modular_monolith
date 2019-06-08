package modular_monolith.employee

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/employees")
class EmployeeController(val employeeService: EmployeeService) {
    @GetMapping()
    fun list() = employeeService.getAll()
}
