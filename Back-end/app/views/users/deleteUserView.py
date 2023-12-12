from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from app.models.users.userEntity import UserEntity
from app.serializers.userSerializer import UserEntitySerializer

class DeleteUserView(generics.DestroyAPIView):
    # Defines a view for deleting a UserEntity instance using generics.DestroyAPIView
    queryset = UserEntity.objects.all()
    serializer_class = UserEntitySerializer

    def destroy(self, request, *args, **kwargs):
        try:
            # Attempts to get the instance and delete it
            instance = self.get_object()
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            # Handles exceptions that might occur during deletion
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
