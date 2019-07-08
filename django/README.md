The versions used are:

-   pip 19.1.1

-   python 3.6.8

-   Django 2.1.1

First thing to do is install django by running:

        pip install Django

Now you can start the django project with the name modular\_monolith:

        django-admin startproject modular_monolith

There is now a folder is created called modular\_monolith. But before we
start coding we have to add mysql as the database. First install the
python mysql connector:

        pip install mysqlclient

Now replace `DATABASES` variable in `modular_monolith/settings.py` with

        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.mysql',
                'NAME': 'django',
                'USER': 'root',
                'PASSWORD': 'root'
            }
        }

Now we can create the standard tables by running:

        python manage.py migrate

Django already works with encapsulated modules but they call them apps.
The next thing to do is writing the api. This can be done in the
modular\_monolith section which serves as the general folder. Because
Django is object oriented the api can also reflect that. In the specific
attributes are defined thus our api would look like this:

        class ModuleAPI:
            def __init__(self, model, base_serializer, serializer_per_role=None):
                self.model = model
                self.base_serializer = base_serializer
                self.serializer_per_role = serializer_per_role

Because Django already supports the idea of modules we can run two
simple commands to create the shift and employee modules:

        python manage.py startapp shifts
        python manage.py startapp employees

The first thing to do is creating the employee model in
`employees/model.py`

        from django.db import models


        class Employee(models.Model):
            name = models.CharField(max_length=255)
            birth_date = models.DateField()
            email = models.EmailField()

Before the creation of the api for employees we create the
base\_serializer. For this we need a rest\_framework:

        pip install djangorestframework

Now add rest\_framework to settings.py in `modular_monolith/settings.py`

        INSTALLED_APPS = [
            'rest_framework',
            ...
        ]

Create the serializer in `employees/serializers/base.py` like so:

        from rest_framework import serializers
        from employees.models import Employee


        class BaseSerializer(serializers.ModelSerializer):
            class Meta:
                model = Employee
                fields = '__all__'

Next the creation of the module api for employees. We do this by
creating `api.py` in `employees/api.py` with the contents:

        from employees.models import Employee
        from employees.serializers.base import BaseSerializer
        from modular_monolith.api import ModuleAPI

        api = ModuleAPI(Employee, BaseSerializer)

Now the model of shift can be created:

        from django.db import models
        from employees.api import api


        class Shift(models.Model):
            title = models.CharField(max_length=255)
            start = models.DateField()
            end = models.DateField()
            employees = models.ManyToManyField(api.model)

As you can see this is the first time the module api is used. The api is
included and used to create a many to many relationship.

The shifts serializer is the same as the one from employees except for
the model:

        from rest_framework import serializers
        from shifts.models import Shift


        class BaseSerializer(serializers.ModelSerializer):
            class Meta:
                model = Shift
                fields = '__all__'

The api of shifts looks like this:

        from shifts.models import Shift
        from shifts.serializers.base import BaseSerializer
        from modular_monolith.api import ModuleAPI

        api = ModuleAPI(Shift, BaseSerializer)

The django application expects that in `modular_monolith/settings.py`
the apps are added to `INSTALLED_APPS` like such:

        INSTALLED_APPS = [
            ...
            'employees',
            'modular_monolith'
        ]


        REST_FRAMEWORK = {
            "DATE_INPUT_FORMATS": ["%d-%m-%Y"],
        }

Now run the command makemigrations and migrate in order to create the
tables for the new modules:

        python manage.py makemigrations
        python manage.py migrate

Add the list serializer to the `serializers/list.py` from both modules
as such:

employees/serializers/list.py

        from rest_framework import serializers
        from employees.models import Employee
        from shifts.api import api


        class ListSerializer(serializers.ModelSerializer):
            shifts = api.base_serializer(source='shift_set', many=True)

            class Meta:
                model = Employee
                fields = '__all__'

shifts/serializers/list.py

        from rest_framework import serializers
        from shifts.models import Shift
        from employees.api import api


        class ListSerializer(serializers.ModelSerializer):
            employees = api.base_serializer(many=True)

            class Meta:
                model = Shift
                fields = '__all__'

And the create serializer for both:

employees/serializers/create.py

        from rest_framework import serializers
        from employees.models import Employee


        class CreateSerializer(serializers.ModelSerializer):
            class Meta:
                model = Employee
                fields = '__all__'

shifts/serializers/create.py

        from rest_framework import serializers
        from shifts.models import Shift


        class CreateSerializer(serializers.ModelSerializer):
            class Meta:
                model = Shift
                fields = '__all__'

Now add the views to `employees/views.py` and `shifts.views.py`
respectively as such:

employees/views.py

        from rest_framework import viewsets
        from employees.models import Employee
        from employees.serializers.create import CreateSerializer
        from employees.serializers.list import ListSerializer


        class MainViewSet(viewsets.ModelViewSet):
            queryset = Employee.objects.all()
            serializer_class = ListSerializer

            def get_serializer_class(self):
                if self.action == 'create':
                    return CreateSerializer

                return super().get_serializer_class()

shifts/views.py

        from rest_framework import viewsets
        from shifts.models import Shift
        from shifts.serializers.create import CreateSerializer
        from shifts.serializers.list import ListSerializer


        class MainViewSet(viewsets.ModelViewSet):
            queryset = Shift.objects.all()
            serializer_class = ListSerializer

            def get_serializer_class(self):
                if self.action == 'create':
                    return CreateSerializer

                return super().get_serializer_class()

Next is the addition of the views to the main application. Thus
`modular_monolith/urls.py` looks like:

        from rest_framework.routers import DefaultRouter
        from shifts.views import MainViewSet as Shift
        from employees.views import MainViewSet as Employee

        router = DefaultRouter()
        router.register('employees', Employee)
        router.register('shifts', Shift)

        urlpatterns = router.urls

Now run `python manage.py runserver` and these urls are available to see
the created api

-   localhost:8000/employees/

-   localhost:8000/shifts/
