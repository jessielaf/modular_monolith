package modular_monolith

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ModularMonolithApplication

fun main(args: Array<String>) {
	runApplication<ModularMonolithApplication>(*args)
}
