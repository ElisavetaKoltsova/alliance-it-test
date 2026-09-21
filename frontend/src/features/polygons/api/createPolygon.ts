import {POLYGONS_API_PATH} from './constants';
import type {CreatePolygonRequest, PolygonDto} from './types';

export const createPolygon = async (polygon: CreatePolygonRequest): Promise<PolygonDto> => {
    const response = await fetch(POLYGONS_API_PATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(polygon),
    });

    if (!response.ok) {
        throw new Error('Failed to create polygon');
    }

    return response.json();
};
