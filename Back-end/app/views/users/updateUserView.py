from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from app.models.users.userEntity import UserEntity
from app.serializers.userSerializer import UserEntitySerializer

class UpdateUserView(generics.UpdateAPIView):
    # Defines a view for updating a UserEntity instance using generics.UpdateAPIView
    queryset = UserEntity.objects.all()
    serializer_class = UserEntitySerializer

    def update(self, request, *args, **kwargs):
        try:
            # Retrieves 'partial' from kwargs, defaults to False if not present
            partial = kwargs.pop('partial', False)
            # Gets the instance and serializes the incoming data for update
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except Exception as e:
            # Handles exceptions that might occur during update
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
