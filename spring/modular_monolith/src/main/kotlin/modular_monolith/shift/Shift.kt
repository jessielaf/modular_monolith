package modular_monolith.shift

import modular_monolith.employee.EmployeeApi
import java.util.*
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
data class Shift(@Id @GeneratedValue
                 val id: Long,
                 var start: Date,
                 var end: Date,
                 var employees: EmployeeApi().model[])
