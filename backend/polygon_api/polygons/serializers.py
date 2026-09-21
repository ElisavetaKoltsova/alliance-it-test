from rest_framework import serializers

from .fields import CoordinatesField
from .models import Polygon
from .utils.coordinates import crosses_antimeridian


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

    def create(self, validated_data):
        geometry = validated_data['geometry']

        coordinates = list(geometry.coords[0][:-1])

        validated_data['crosses_antimeridian'] = (
            crosses_antimeridian(coordinates)
        )

        return super().create(validated_data)