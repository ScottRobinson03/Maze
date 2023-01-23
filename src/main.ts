import { Grid } from "./classes";

const MAZE_WIDTH = 16;
const MAZE_HEIGHT = 16;

const grid = new Grid(MAZE_WIDTH, MAZE_HEIGHT);
console.log(grid.tiles[1][2].getNeighboursCoords());

grid.generateMaze();
console.log(grid.tiles[1][2]);