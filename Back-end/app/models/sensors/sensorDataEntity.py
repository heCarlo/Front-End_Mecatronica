from django.db import models
from django.utils import timezone

class SensorData(models.Model):
    # Campo para armazenar os dados do sensor como um número de ponto flutuante
    sensort = models.FloatField()
    # Campo para armazenar os dados do servo vertical como um número de ponto flutuante
    servo_vertical = models.FloatField()
    # Campo para capturar o carimbo de data e hora de criação, padrão para o momento atual
    created_at = models.DateTimeField(default=timezone.now, blank=True)

    def __str__(self):
        # Fornece uma representação em string para as instâncias deste modelo, incluindo o carimbo de data e hora de criação
        return f'SensorData - {self.created_at}'
