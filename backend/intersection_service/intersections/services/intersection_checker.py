from intersections.models import ExistingPolygon


def find_intersections(geometry):
    polygons = ExistingPolygon.objects.filter(
        geometry__intersects=geometry,
    )

    intersections = []

    for polygon in polygons:
        intersection_geometry = polygon.geometry.intersection(
            geometry,
        )

        intersections.append(
            {
                'polygon_id': polygon.id,
                'polygon_name': polygon.name,
                'geometry': intersection_geometry,
            },
        )

    return intersections