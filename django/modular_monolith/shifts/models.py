from django.db import models
from employees.api import api


class Shift(models.Model):
    title = models.CharField(max_length=255)
    start = models.DateField()
    end = models.DateField()
    employees = models.ManyToManyField(api.model)
