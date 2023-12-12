from django.db import models
from django.utils import timezone

class SensorData(models.Model):
    # Field to store sensor data as a floating-point number
    sensort = models.FloatField()
    # Field to store vertical servo data as a floating-point number
    servo_vertical = models.FloatField()
    # Field capturing the timestamp of creation, defaults to the current time
    created_at = models.DateTimeField(default=timezone.now, blank=True)

    def __str__(self):
        # Provides a string representation for instances of this model, including the creation timestamp
        return f'SensorData - {self.created_at}'
