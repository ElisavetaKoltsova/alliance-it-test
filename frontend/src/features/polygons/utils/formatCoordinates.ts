import type {Coordinate} from '../types';

export const formatCoordinates = (coordinates: Coordinate[]) =>
    coordinates
        .map(([longitude, latitude], index) => `${index + 1}. ${longitude}, ${latitude}`)
        .join('\n');
