import json


def geometry_to_geojson(geometry):
    return json.loads(geometry.geojson)