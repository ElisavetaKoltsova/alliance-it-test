MIN_LONGITUDE = -180
MAX_LONGITUDE = 180
LONGITUDE_RANGE = 360


def normalize_longitude(longitude):
    normalized = (
        (longitude - MIN_LONGITUDE) % LONGITUDE_RANGE
    ) + MIN_LONGITUDE

    return normalized


def normalize_coordinates(coordinates):
    return [
        (normalize_longitude(longitude), latitude)
        for longitude, latitude in coordinates
    ]


def crosses_antimeridian(coordinates):
    if len(coordinates) < 2:
        return False

    closed_coordinates = [
        *coordinates,
        coordinates[0],
    ]

    return any(
        abs(current[0] - next_coordinate[0]) > MAX_LONGITUDE
        for current, next_coordinate in zip(
            closed_coordinates,
            closed_coordinates[1:],
        )
    )

def get_polygon_coordinates(geometry):
    return [
        list(coordinate)
        for coordinate in geometry.coords[0][:-1]
    ]