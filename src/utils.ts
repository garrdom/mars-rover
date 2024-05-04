import type { Coord } from './typings';

export function checkObstacle(obstacles: Array<Coord>, coord: Coord) {
    return obstacles.some((obstacle) => obstacle.x === coord.x && obstacle.y === coord.y);
}
