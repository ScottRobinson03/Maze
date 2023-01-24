import { MazeNode } from "./classes";
import * as PImage from "pureimage";
import * as fs from "fs";

export function getRandomItem<T>(arr: Array<T>): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function saveMaze(mazeTiles: MazeNode[][], squareSize: number, filename: string) {
    const imgWidth = mazeTiles[0].length * squareSize;
    const imgHeight = mazeTiles.length * squareSize;
    console.log(imgWidth, imgHeight);

    const mazeImage = PImage.make(imgWidth, imgHeight, {});
    // get canvas context
    const ctx = mazeImage.getContext("2d");
    ctx.fillStyle = "blue";

    for (let y = 0; y < mazeTiles.length; y++) {
        for (let x = 0; x < mazeTiles[y].length; x++) {
            const point = mazeTiles[y][x];

            const topLeft = { x: point.x * squareSize, y: point.y * squareSize };
            const topRight = { x: topLeft.x + squareSize, y: topLeft.y };
            const bottomRight = { x: topRight.x, y: topRight.y + squareSize };
            const bottomLeft = { x: topLeft.x, y: bottomRight.y };

            if (point.y === 0) {
                // 9px thick
                ctx.fillRect(topLeft.x, topLeft.y, squareSize, 1);
            }

            if (!point.connections.right || x === mazeTiles[y].length - 1) {
                // 12px thick
                ctx.fillRect(topRight.x, topRight.y, 1, squareSize);
            }

            if (!point.connections.below || y === mazeTiles.length - 1) {
                // 12px thick
                ctx.fillRect(bottomLeft.x, bottomLeft.y, squareSize, 1);
            }

            if (point.x === 0) {
                // 9px thick
                ctx.fillRect(topLeft.x, topLeft.y, 1, squareSize);
            }
        }
    }

    PImage.encodePNGToStream(mazeImage, fs.createWriteStream(filename))
        .then(() => {
            console.log(`Saved maze in ${filename}`);
        })
        .catch(e => {
            console.log(`Failed to save maze due to an unexpected error:\n${e}`);
        });
}
