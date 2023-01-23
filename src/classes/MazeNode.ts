export default class MazeNode {
    paddedX: string;
    paddedY: string;

    x: number;
    y: number;

    neighbours: MazeNode[];
    visited: boolean;

    constructor(paddedX: string, paddedY: string) {
        this.paddedX = paddedX;
        this.paddedY = paddedY;

        this.x = +paddedX;
        this.y = +paddedY;

        this.neighbours = [];
        this.visited = false;
    }

    toString() {
        return `[${this.paddedX}, ${this.paddedY}]`;
    }

    getNeighboursCoords() {
        return this.neighbours.map(neighbour => [neighbour.x, neighbour.y]);
    }
}
