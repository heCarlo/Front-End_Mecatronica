from django.db import models
from django.utils import timezone

class SecuryMode(models.Model):
    # Campo booleano para armazenar o status do modo de segurança
    secury_mode = models.BooleanField()
    # Campo para capturar o carimbo de data e hora de criação, padrão para o momento atual
    created_at = models.DateTimeField(default=timezone.now, blank=True)

    def __str__(self):
        # Retorna uma representação em string do objeto, mostrando o carimbo de data e hora de criação
        return f'SecuryMode - {self.created_at}'
