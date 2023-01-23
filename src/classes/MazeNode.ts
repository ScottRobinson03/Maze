import { getRandomItem } from "../helpers";
import { Connection } from "../types";

export default class MazeNode {
    paddedX: string;
    paddedY: string;

    x: number;
    y: number;

    neighbours: MazeNode[];
    visited: boolean;
    connections: Connection;

    constructor(paddedX: string, paddedY: string) {
        this.paddedX = paddedX;
        this.paddedY = paddedY;

        this.x = +paddedX;
        this.y = +paddedY;

        this.neighbours = [];
        this.visited = false;

        this.connections = { left: false, right: false, above: false, below: false };
    }

    toString() {
        return `[${this.paddedX}, ${this.paddedY}]`;
    }

    connect(next: MazeNode) {
        if (this.x > next.x) {
            // Next is to the left of this node
            this.connections.left = true;
            next.connections.right = true;
        } else if (this.x < next.x) {
            // Next is to the right of this node
            this.connections.right = true;
            next.connections.left = true;
        } else if (this.y > next.y) {
            // Next is above this node
            this.connections.above = true;
            next.connections.below = true;
        } else {
            // Next is below this node
            this.connections.below = true;
            next.connections.above = true;
        }
    }

    getNeighboursCoords() {
        return this.neighbours.map(neighbour => [neighbour.x, neighbour.y]);
    }

    getRandomUnvisitedNeighbour() {
        const unvisitedNeighbours = this.neighbours.filter(neighbour => !neighbour.visited);
        return getRandomItem(unvisitedNeighbours);
    }
}
