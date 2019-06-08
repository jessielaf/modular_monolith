package modular_monolith.employee

import java.util.*
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
data class Employee(@Id @GeneratedValue
                    val id: Long,
                    var name: String,
                    var birth_date: Date)
