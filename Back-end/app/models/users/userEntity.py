from django.db import models
from django.contrib.auth.models import User
from django.core.validators import EmailValidator
from django.utils import timezone

class UserEntity(models.Model):
    # One-to-One relationship with the built-in User model, linked by primary key
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=1, primary_key=True)
    # Timestamp capturing the creation time, auto-set to the current time when the object is created
    created_at = models.DateTimeField(auto_now_add=True)
    # Timestamp capturing the last update time, auto-set to the current time when the object is updated
    updated_at = models.DateTimeField(auto_now=True)
    # Field to store email addresses, limited to a maximum length of 128 characters, unique, and validated using EmailValidator
    email = models.EmailField(max_length=128, unique=True, validators=[EmailValidator()])

    def save(self, *args, **kwargs):
        # Updates the 'updated_at' field with the current timestamp before saving the object
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        # Returns the username of the associated User instance as the string representation of UserEntity
        return self.user.username
