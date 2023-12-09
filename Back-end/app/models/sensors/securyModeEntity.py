from django.db import models
from django.utils import timezone

class SecuryMode(models.Model):
    secury_mode = models.BooleanField()
    created_at = models.DateTimeField(default=timezone.now, blank=True)

    def __str__(self):
        return f'SecuryMode - {self.created_at}'
