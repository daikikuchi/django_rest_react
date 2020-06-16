from rest_framework import viewsets, permissions

from leads.models import Lead
from leads.serializers import LeadSerializer

# Lead ViewSet
class LeadViewSet(viewsets.ModelViewSet):
    # queryset = Lead.objects.all()
    permission_classes = [
     permissions.IsAuthenticated
    ]

    serializer_class = LeadSerializer

    # Override get_queryset to return only leads created by authenticated user
    def get_queryset(self):
        return self.request.user.leads.all()

    # Override perform_create to assign authenticated user to a created lead
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
