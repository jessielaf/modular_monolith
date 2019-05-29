from django.db import models


class Employee(models.Model):
    name = models.CharField(max_length=255)
    birth_date = models.DateField()
    email = models.EmailField()
