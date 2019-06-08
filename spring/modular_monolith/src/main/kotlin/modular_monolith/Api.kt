package modular_monolith

import kotlin.reflect.KClass

open class Api(val serializer: KClass<*>, val repository: KClass<*>)