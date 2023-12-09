from django.db import models
from django.utils import timezone

class SensorData(models.Model):
    sensort = models.FloatField()
    servo_vertical = models.FloatField()
    created_at = models.DateTimeField(default=timezone.now, blank=True)

    def __str__(self):
        return f'SensorData - {self.created_at}'
