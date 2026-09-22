from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import IntersectionCheckSerializer
from .services.intersection_checker import find_intersections
from .utils.geometry import geometry_to_geojson


class IntersectionCheckView(APIView):
    def post(self, request):
        serializer = IntersectionCheckSerializer(
            data=request.data,
        )
        serializer.is_valid(raise_exception=True)

        geometry = serializer.create_polygon()

        intersections = find_intersections(geometry)

        response_intersections = [
            {
                'polygon_id': intersection['polygon_id'],
                'polygon_name': intersection['polygon_name'],
                'geometry': geometry_to_geojson(
                    intersection['geometry'],
                ),
            }
            for intersection in intersections
        ]

        return Response(
            {
                'intersects': bool(response_intersections),
                'intersections': response_intersections,
            },
            status=status.HTTP_200_OK,
        )