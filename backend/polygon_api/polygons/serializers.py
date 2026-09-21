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
        self._set_antimeridian_flag(validated_data)

        return super().create(validated_data)

    def update(self, instance, validated_data):
        self._set_antimeridian_flag(validated_data)

        return super().update(instance, validated_data)

    def _set_antimeridian_flag(self, validated_data):
        geometry = validated_data.get('geometry')

        if geometry is None:
            return

        coordinates = list(geometry.coords[0][:-1])

        validated_data['crosses_antimeridian'] = crosses_antimeridian(
            coordinates,
        )