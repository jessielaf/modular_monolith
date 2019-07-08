The versions used are:

-   Kotlin 1.2.71

-   Java 1.8

-   SpringBoot 2.1.5

Spring has something called initliazr which can be found at . On this
site select Kotlin as the language, leave group empty, fill artifact
with modular\_monilith and last of all add JPA and MySQL as a
dependency.

First the interface for the API in
`src/main/kotlin/modular_monolith/Api.kt`:

      package modular_monolith

      import kotlin.reflect.KClass

      interface Api {
          fun getSerializer(): KClass<*>;
          fun getRepository(): KClass<*>;
      }

Spring is originally a layered architectures. Right now all the layers
will be implemented in one package.

First the model is created
`src/main/kotlin/modular_monolith/employee/Employee.kt`

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

Next the repository which handles the database actions for the employee
model.

`src/main/kotlin/modular_monolith/employee/EmployeeRepository.kt`

      package modular_monolith.employee

      import org.springframework.data.repository.CrudRepository
      import org.springframework.stereotype.Repository

      @Repository
      interface EmployeeRepository: CrudRepository<Employee, Long> {
      }

Next up is the controller which handles the requests.
`src/main/kotlin/modular_monolith/employee/EmployeeController.kt`

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

Next up the serializer which serializes the employee object
`src/main/kotlin/modular_monolith/employee/serializers/BaseSerializer.kt`

      package modular_monolith.employee.serializers

      import java.util.*

      data class BaseSerializer(val id: Long, val name: String, val email: String, val birth_date: Date) {}

Last of all is the api in
`src/main/kotlin/modular_monolith/employee/EmployeeApi.kt`

      package modular_monolith.employee

      import modular_monolith.Api
      import modular_monolith.employee.serializers.BaseSerializer

      class EmployeeApi: Api(BaseSerializer::class, EmployeeRepository::class)

Next up is the shift module. As with the employee module we begin with
the model:

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

Unfortunately this is not valid kotlin. There is no easy way for us to
define a many to many relationship via this method. It is also not clear
how to do this in any other way. This specific use case is not easy for
spring. It takes a lot of custom code per module. Therefor spring is not
the right framework for a modular monolith.
