from rest_framework.viewsets import ModelViewSet

from .models import Polygon
from .serializers import PolygonSerializer


class PolygonViewSet(ModelViewSet):
    queryset = Polygon.objects.all()
    serializer_class = PolygonSerializer