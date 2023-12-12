from rest_framework import serializers
from app.models.sensors.sensorDataEntity import SensorData

class SensorDataSerializer(serializers.ModelSerializer):
    # Serializer for the SensorData model using ModelSerializer from Django Rest Framework
    class Meta:
        # Specifies the model to be serialized
        model = SensorData
        # Includes all fields from the SensorData model in the serialized representation
        fields = '__all__'
