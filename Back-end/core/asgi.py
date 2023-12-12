import os

from django.core.asgi import get_asgi_application

# Sets the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

# Gets the ASGI application for Django
application = get_asgi_application()
