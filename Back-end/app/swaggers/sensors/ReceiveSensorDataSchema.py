from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from datetime import datetime

sensor_data_request_body = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        'sensort': openapi.Schema(type=openapi.TYPE_NUMBER),
        'servo_vertical': openapi.Schema(type=openapi.TYPE_NUMBER),
        'secury_mode': openapi.Schema(type=openapi.TYPE_BOOLEAN),
    },
    required=['sensort', 'servo_vertical', 'secury_mode']
)

sensor_data_response_properties = {
    'id': openapi.Schema(type=openapi.TYPE_INTEGER),
    'sensort': openapi.Schema(type=openapi.TYPE_NUMBER),
    'servo_vertical': openapi.Schema(type=openapi.TYPE_NUMBER),
    'secury_mode': openapi.Schema(type=openapi.TYPE_BOOLEAN),
    'created_at': openapi.Schema(type=openapi.TYPE_STRING, format=openapi.FORMAT_DATETIME),
}

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
