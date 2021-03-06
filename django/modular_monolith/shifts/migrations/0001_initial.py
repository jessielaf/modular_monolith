# Generated by Django 2.2.1 on 2019-05-29 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('employees', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Shift',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('start', models.DateField()),
                ('end', models.DateField()),
                ('employees', models.ManyToManyField(to='employees.Employee')),
            ],
        ),
    ]
