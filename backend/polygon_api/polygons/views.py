from rest_framework import serializers
from rest_framework.viewsets import ModelViewSet

from .models import Polygon
from .serializers import PolygonSerializer
from .services.intersection_client import (
    IntersectionServiceError,
    check_polygon_intersections,
)
from .utils.coordinates import get_polygon_coordinates


class PolygonViewSet(ModelViewSet):
    queryset = Polygon.objects.all()
    serializer_class = PolygonSerializer

    def perform_create(self, serializer):
        geometry = serializer.validated_data['geometry']
        coordinates = get_polygon_coordinates(geometry)

        try:
            result = check_polygon_intersections(coordinates)
        except IntersectionServiceError as error:
            raise serializers.ValidationError(
                {
                    'detail': (
                        'Не удалось проверить полигон '
                        'на пересечения.'
                    ),
                },
            ) from error

        if result['intersects']:
            raise serializers.ValidationError(
                {
                    'detail': (
                        'Полигон пересекается '
                        'с существующими полигонами.'
                    ),
                    'intersections': result['intersections'],
                },
            )

        serializer.save()