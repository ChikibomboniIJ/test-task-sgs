# Generated by Django 5.1.4 on 2024-12-19 17:18

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_task_user_alter_task_priority'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='deadline',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='task',
            name='priority',
            field=models.CharField(choices=[('Low', 'Low'), ('Medium', 'Medium'), ('High', 'High')], max_length=6),
        ),
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('New', 'New'), ('Pending', 'Pending'), ('Completed', 'Completed')], default='New', max_length=11),
        ),
    ]
