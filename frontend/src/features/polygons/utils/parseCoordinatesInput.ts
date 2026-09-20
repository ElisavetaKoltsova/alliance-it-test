import {MAX_LATITUDE, MIN_LATITUDE, MIN_POLYGON_COORDINATES} from '../constants';
import type {Coordinate} from '../types';

interface ParseCoordinatesResult {
    coordinates?: Coordinate[];
    error?: string;
}

export const parseCoordinatesInput = (value: string): ParseCoordinatesResult => {
    let parsedValue: unknown;

    try {
        parsedValue = JSON.parse(value);
    } catch {
        return {
            error: 'Координаты должны быть корректным JSON-массивом',
        };
    }

    if (!Array.isArray(parsedValue)) {
        return {
            error: 'Ожидается массив координат',
        };
    }

    if (parsedValue.length < MIN_POLYGON_COORDINATES) {
        return {
            error: `Для полигона нужно минимум ${MIN_POLYGON_COORDINATES} точки`,
        };
    }

    const coordinates: Coordinate[] = [];

    for (const point of parsedValue) {
        if (
            !Array.isArray(point) ||
            point.length !== 2 ||
            typeof point[0] !== 'number' ||
            typeof point[1] !== 'number'
        ) {
            return {
                error: 'Каждая координата должна иметь формат [широта, долгота]',
            };
        }

        const [latitude, longitude] = point;

        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            return {
                error: 'Широта и долгота должны быть конечными числами',
            };
        }

        if (latitude < MIN_LATITUDE || latitude > MAX_LATITUDE) {
            return {
                error: `Широта должна быть от ${MIN_LATITUDE} до ${MAX_LATITUDE}`,
            };
        }

        coordinates.push([longitude, latitude]);
    }

    return {
        coordinates,
    };
};
