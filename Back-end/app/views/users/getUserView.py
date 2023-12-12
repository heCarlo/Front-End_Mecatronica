from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from app.models.users.userEntity import UserEntity
from app.serializers.userSerializer import UserEntitySerializer

class GetUserView(generics.RetrieveAPIView):
    # Defines a view for retrieving a UserEntity instance using generics.RetrieveAPIView
    queryset = UserEntity.objects.all()
    serializer_class = UserEntitySerializer

    def retrieve(self, request, *args, **kwargs):
        try:
            # Attempts to retrieve the instance and serialize it
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except UserEntity.DoesNotExist:
            # Handles the case where the object is not found
            return Response({"error": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # Handles other exceptions that might occur during retrieval or serialization
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
