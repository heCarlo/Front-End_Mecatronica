from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from app.models.users.userEntity import UserEntity
from app.serializers.userSerializer import UserEntitySerializer

class CreateUserView (generics.CreateAPIView):
    queryset = UserEntity.objects.all()
    serializer_class = UserEntitySerializer

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
