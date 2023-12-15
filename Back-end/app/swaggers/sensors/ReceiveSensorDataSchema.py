from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from datetime import datetime

# Defines the request body schema for sensor data
sensor_data_request_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'sensort': openapi.Schema(type=openapi.TYPE_NUMBER),
        'servo_vertical': openapi.Schema(type=openapi.TYPE_NUMBER),
        'secury_mode': openapi.Schema(type=openapi.TYPE_BOOLEAN),
    },
    required=['sensort', 'servo_vertical', 'secury_mode']
)

# Defines the response properties for sensor data
sensor_data_response_properties = {
    'id': openapi.Schema(type=openapi.TYPE_INTEGER),
    'sensort': openapi.Schema(type=openapi.TYPE_NUMBER),
    'servo_vertical': openapi.Schema(type=openapi.TYPE_NUMBER),
    'secury_mode': openapi.Schema(type=openapi.TYPE_BOOLEAN),
    'created_at': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME),
}

# Defines various response statuses and their schemas for sensor data
sensor_data_responses = {
    201: 'Data received successfully!',
    200: openapi.Schema(
        type=openapi.TYPE_ARRAY,
        items=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=sensor_data_response_properties,
        )
    ),
    204: 'Data deleted successfully!',
    400: 'Invalid data',
    404: 'Data not found',
    500: 'Error processing data',
}

# Defines Swagger schemas for different HTTP methods for sensor data
receive_sensor_data_post_schema = swagger_auto_schema(
    request_body=sensor_data_request_body,
    responses=sensor_data_responses,
)

receive_sensor_data_get_schema = swagger_auto_schema(
    responses=sensor_data_responses,
)

receive_sensor_data_put_schema = swagger_auto_schema(
    request_body=sensor_data_request_body,
    responses=sensor_data_responses,
)

receive_sensor_data_delete_schema = swagger_auto_schema(
    responses=sensor_data_responses,
)

receive_sensor_data_get_by_id_schema = swagger_auto_schema(
    responses=sensor_data_responses,
)

# Defines the request body schema for secury mode data
secury_mode_request_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'secury_mode': openapi.Schema(type=openapi.TYPE_BOOLEAN),
    },
    required=['secury_mode']
)

# Defines the response properties for secury mode data
secury_mode_response_properties = {
    'id': openapi.Schema(type=openapi.TYPE_INTEGER),
    'secury_mode': openapi.Schema(type=openapi.TYPE_BOOLEAN),
    'created_at': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME),
}

# Defines various response statuses and their schemas for secury mode data
secury_mode_responses = {
    201: 'Secury mode data received successfully!',
    200: openapi.Schema(
        type=openapi.TYPE_ARRAY,
        items=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=secury_mode_response_properties,
        )
    ),
    204: 'Secury mode data deleted successfully!',
    400: 'Invalid data',
    404: 'Secury mode data not found',
    500: 'Error processing secury mode data',
}

# Defines Swagger schemas for different HTTP methods for secury mode data
secury_mode_retrieve_update_destroy_schema = swagger_auto_schema(
    responses=secury_mode_responses,
)

secury_mode_create_schema = swagger_auto_schema(
    request_body=secury_mode_request_body,
    responses=secury_mode_responses,
)
