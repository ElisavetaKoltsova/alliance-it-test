import type {Coordinate} from '../types';

export interface CreatePolygonRequest {
    name: string;
    coordinates: Coordinate[];
}

export interface PolygonDto {
    id: number;
    name: string;
    coordinates: Coordinate[];
    crosses_antimeridian: boolean;
}
