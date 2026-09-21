from rest_framework import serializers

from .fields import CoordinatesField
from .models import Polygon


class PolygonSerializer(serializers.ModelSerializer):
    coordinates = CoordinatesField(source='geometry')

    class Meta:
        model = Polygon
        fields = (
            'id',
            'name',
            'coordinates',
            'crosses_antimeridian',
        )
        read_only_fields = (
            'id',
            'crosses_antimeridian',
        )