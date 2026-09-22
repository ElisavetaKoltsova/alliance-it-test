import requests
from django.conf import settings


INTERSECTION_CHECK_PATH = '/api/intersections/check/'
REQUEST_TIMEOUT_SECONDS = 5


class IntersectionServiceError(Exception):
    pass


def check_polygon_intersections(coordinates):
    url = (
        f'{settings.INTERSECTION_SERVICE_URL.rstrip("/")}'
        f'{INTERSECTION_CHECK_PATH}'
    )

    try:
        response = requests.post(
            url,
            json={
                'coordinates': coordinates,
            },
            timeout=REQUEST_TIMEOUT_SECONDS,
        )

        response.raise_for_status()

        return response.json()

    except (requests.RequestException, ValueError) as error:
        raise IntersectionServiceError from error