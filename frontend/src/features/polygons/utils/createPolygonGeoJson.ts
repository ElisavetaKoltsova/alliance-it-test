import type {
    Feature,
    FeatureCollection,
    Geometry,
    LineString,
    Point,
    Polygon,
} from 'geojson';

import type {Coordinate} from '../types';

const MIN_LINE_COORDINATES = 2;
const MIN_POLYGON_COORDINATES = 3;

export const createPolygonGeoJson = (
    coordinates: Coordinate[],
): FeatureCollection<Geometry> => {
    const features: Feature<Geometry>[] = coordinates.map(
        (coordinate, index): Feature<Point> => ({
            type: 'Feature',
            id: `point-${index}`,
            properties: {
                index,
            },
            geometry: {
                type: 'Point',
                coordinates: coordinate,
            },
        }),
    );

    if (coordinates.length >= MIN_LINE_COORDINATES) {
        const lineCoordinates =
            coordinates.length >= MIN_POLYGON_COORDINATES
                ? [...coordinates, coordinates[0]]
                : coordinates;

        const line: Feature<LineString> = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: lineCoordinates,
            },
        };

        features.push(line);
    }

    if (coordinates.length >= MIN_POLYGON_COORDINATES) {
        const polygon: Feature<Polygon> = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Polygon',
                coordinates: [[...coordinates, coordinates[0]]],
            },
        };

        features.push(polygon);
    }

    return {
        type: 'FeatureCollection',
        features,
    };
};