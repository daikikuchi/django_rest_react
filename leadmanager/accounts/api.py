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
        # Calling .save() will either create a new instance, or update an existing instance,
        # depending on  if an existing instance was passed when instantiating the serializer class:
        user = serializer.save()
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
        # Return the authorized
        user = serializer.validated_data
        print(user.username)
        print(user.email)
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
