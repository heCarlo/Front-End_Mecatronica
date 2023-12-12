from django.db import models
from django.utils import timezone

class SecuryMode(models.Model):
    # Boolean field to store security mode status
    secury_mode = models.BooleanField()
    # Field to capture creation timestamp, defaults to current time
    created_at = models.DateTimeField(default=timezone.now, blank=True)

    def __str__(self):
        return f'SecuryMode - {self.created_at}'
