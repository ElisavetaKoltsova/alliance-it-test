from django.contrib.gis.geos import Polygon as GEOSPolygon
from rest_framework import serializers
from .utils.coordinates import normalize_coordinates


MIN_POLYGON_COORDINATES = 3
MIN_LATITUDE = -90
MAX_LATITUDE = 90
POLYGON_SRID = 4326
COORDINATE_PRECISION = 12


class CoordinatesField(serializers.Field):
    def to_representation(self, geometry):
        if geometry is None:
            return []

        coordinates = geometry.coords[0]

        return [
            [
                round(longitude, COORDINATE_PRECISION),
                round(latitude, COORDINATE_PRECISION),
            ]
            for longitude, latitude in coordinates[:-1]
        ]

    def to_internal_value(self, coordinates):
        if not isinstance(coordinates, list):
            raise serializers.ValidationError(
                'Координаты должны быть массивом.',
            )

        if len(coordinates) < MIN_POLYGON_COORDINATES:
            raise serializers.ValidationError(
                f'Для полигона требуется минимум {MIN_POLYGON_COORDINATES} точки.',
            )

        validated_coordinates = []

        for coordinate in coordinates:
            if (
                not isinstance(coordinate, list)
                or len(coordinate) != 2
            ):
                raise serializers.ValidationError(
                    'Каждая точка должна иметь формат [долгота, широта].',
                )

            longitude, latitude = coordinate

            if not isinstance(longitude, (int, float)) or not isinstance(
                latitude,
                (int, float),
            ):
                raise serializers.ValidationError(
                    'Координаты должны быть числами.',
                )

            if not MIN_LATITUDE <= latitude <= MAX_LATITUDE:
                raise serializers.ValidationError(
                    f'Широта должна быть от {MIN_LATITUDE} до {MAX_LATITUDE}.',
                )

            validated_coordinates.append(
                (longitude, latitude),
            )

        closed_coordinates = [
            *validated_coordinates,
            validated_coordinates[0],
        ]

        normalized_coordinates = normalize_coordinates(
            validated_coordinates,
        )

        closed_coordinates = [
            *normalized_coordinates,
            normalized_coordinates[0],
        ]

        return GEOSPolygon(
            tuple(closed_coordinates),
            srid=POLYGON_SRID,
        )