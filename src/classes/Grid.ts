import { getRandomItem } from "../helpers";
import MazeNode from "./MazeNode";

export default class Grid {
    tiles: MazeNode[][];

    constructor(width: number, height: number) {
        this.tiles = this.generateTiles(width, height);
    }

    toString() {
        let string = "";
        for (let y = 0; y < this.tiles.length; y++) {
            for (let x = 0; x < this.tiles[y].length; x++) {
                const isFirstCol = x === 0;
                const isLastCol = x === this.tiles[y].length - 1;

                string += `${isFirstCol ? "[" : " "}${this.tiles[y][x]}${isLastCol ? "]" : ""}`;
            }
            string += "\n";
        }
        return string;
    }

    generateMaze() {
        const startRow = getRandomItem(this.tiles);
        const startNode = getRandomItem(startRow);
        this.randomisedDFS(startNode);
    }

    generateTiles(width: number, height: number) {
        const tiles: MazeNode[][] = [];
        for (let y = 0; y < width; y++) {
            const paddedY = y.toString().padStart(width.toString().length, "0");

            const row: MazeNode[] = [];
            const isFirstRow = y === 0;

            for (let x = 0; x < height; x++) {
                const paddedX = x.toString().padStart(height.toString().length, "0");

                const isFirstCol = x === 0;
                const currentNode = new MazeNode(paddedX, paddedY);

                // Handle neighbours
                if (!isFirstRow) {
                    // Add above tile to this tile's neighbours,
                    // and this tile to above tile's neighbours
                    currentNode.neighbours.push(tiles[y - 1][x]);
                    tiles[y - 1][x].neighbours.push(currentNode);
                }

                if (!isFirstCol) {
                    // Add left tile to this tile's neighbours,
                    // and this tile to left tile's neighbours
                    currentNode.neighbours.push(row[x - 1]);
                    row[x - 1].neighbours.push(currentNode);
                }
                // Add node to row
                row.push(currentNode);
            }
            // Add row to tiles
            tiles.push(row);
        }
        return tiles;
    }

    randomisedDFS(node: MazeNode) {
        node.visited = true;

        let nextNode = node.getRandomUnvisitedNeighbour();
        while (nextNode !== undefined) {
            node.connect(nextNode);
            this.randomisedDFS(nextNode);
            nextNode = node.getRandomUnvisitedNeighbour();
        }
    }
}
