import type { Coord, Orientation } from './typings';

export const DEFAULT_GRID_SIZE = 5;
export const DEFAULT_ARRAY_GRID = new Array(DEFAULT_GRID_SIZE * DEFAULT_GRID_SIZE).fill(1);
export const DEFAULT_COORD: Coord = { x: 2, y: 0 };
export const DEFAULT_ORIENTATION: Orientation = 'E';
export const DEFAULT_OBSTACLES: Array<Coord> = [{ x: 2, y: 3 }, { x: 4, y: 2 }, { x: 1, y: 1 }];
