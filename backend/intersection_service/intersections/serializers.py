from django.contrib.gis.geos import Polygon as GEOSPolygon
from rest_framework import serializers


MIN_POLYGON_COORDINATES = 3
POLYGON_SRID = 4326


class IntersectionCheckSerializer(serializers.Serializer):
    coordinates = serializers.ListField(
        child=serializers.ListField(
            child=serializers.FloatField(),
        ),
    )

    def validate_coordinates(self, coordinates):
        if len(coordinates) < MIN_POLYGON_COORDINATES:
            raise serializers.ValidationError(
                f'Для полигона требуется минимум {MIN_POLYGON_COORDINATES} точки.',
            )

        for coordinate in coordinates:
            if len(coordinate) != 2:
                raise serializers.ValidationError(
                    'Каждая точка должна иметь формат [долгота, широта].',
                )

        return coordinates

    def create_polygon(self):
        coordinates = self.validated_data['coordinates']

        closed_coordinates = [
            *coordinates,
            coordinates[0],
        ]

        return GEOSPolygon(
            tuple(
                tuple(coordinate)
                for coordinate in closed_coordinates
            ),
            srid=POLYGON_SRID,
        )