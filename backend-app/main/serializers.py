from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    STATUS_CHOICES = Task.STATUS_CHOICES
    PRIORITY_CHOICES = Task.PRIORITY_CHOICES

    class Meta:
        model = Task
        fields = ['id', 'title', 'desc', 'status', 'priority', 'deadline']

    def validate_status(self, value):
        if value not in dict(Task.STATUS_CHOICES):
            raise serializers.ValidationError({"message": "Invalid status value"})
        return value

    def validate_priority(self, value):
        if value not in dict(Task.PRIORITY_CHOICES):
            raise serializers.ValidationError({"message": "Invalid priority value"})
        return value