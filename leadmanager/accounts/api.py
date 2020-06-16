from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # print(UserSerializer(user, context=self.get_serializer_context()).data)
        # {'id': 7, 'username': 'hanahana', 'email': 'hanahana8@gmail.com'}
        return Response({
        # .data give us the serialized user
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        # Create token specific for the user
        "token": AuthToken.objects.create(user)[1]
        })


# Login API

# Get User API
