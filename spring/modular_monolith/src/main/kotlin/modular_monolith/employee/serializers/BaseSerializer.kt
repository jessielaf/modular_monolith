package modular_monolith.employee.serializers

import java.util.*

data class BaseSerializer(val id: Long, val name: String, val email: String, val birth_date: Date) {
}