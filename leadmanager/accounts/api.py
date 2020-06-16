from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer

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
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        # pass1,pass4,pass5,pass2,pass3
        serializer.is_valid(raise_exception=True)
        print(serializer, 'serializer')
        print(print(serializer.validated_data, 'serializer.validated_data'))
        user = serializer.validated_data
        return Response({
        # .data give us the serialized user
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        # Create token specific for the user
        "token": AuthToken.objects.create(user)[1]
        })


# Get User API
class UserAPI(generics.RetrieveAPIView):
    # check Token user send with request and send back the user associated with the token
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
