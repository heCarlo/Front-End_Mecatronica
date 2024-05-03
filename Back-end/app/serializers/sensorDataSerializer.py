from rest_framework import serializers
from app.models.sensors.sensorDataEntity import SensorData

class SensorDataSerializer(serializers.ModelSerializer):
    # Serializer para o modelo SensorData usando ModelSerializer do Django Rest Framework
    class Meta:
        # Especifica o modelo a ser serializado
        model = SensorData
        # Inclui todos os campos do modelo SensorData na representação serializada
        fields = '__all__'
