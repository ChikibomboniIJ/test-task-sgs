from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Task(models.Model):
    STATUS_NEW = 'New'
    STATUS_IN_PROGRESS = 'Pending'
    STATUS_COMPLETED = 'Completed'

    STATUS_CHOICES = [
        (STATUS_NEW, 'New'),
        (STATUS_IN_PROGRESS, 'Pending'),
        (STATUS_COMPLETED, 'Completed'),
    ]
    
    PRIORITY_LOW = 'Low'
    PRIORITY_MEDIUM = 'Medium'
    PRIORITY_HIGH = 'High'
    
    PRIORITY_CHOICES  = [
        (PRIORITY_LOW, 'Low'),
        (PRIORITY_MEDIUM, 'Medium'),
        (PRIORITY_HIGH, 'High')
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    title = models.CharField(max_length=255, 
                             verbose_name="Заголовок")
    
    desc = models.TextField(verbose_name="Описание")
    
    status = models.CharField(choices=STATUS_CHOICES,
                              default=STATUS_NEW,
                              max_length=11)
    
    deadline = models.DateTimeField(default=timezone.now)
    
    priority = models.CharField(choices=PRIORITY_CHOICES, max_length=6)
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name = "Создано")
    
    updated_at = models.DateTimeField(auto_now=True)