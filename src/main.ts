import { Grid } from "./classes";
import { saveMaze } from "./helpers";

const MAZE_WIDTH = 32;
const MAZE_HEIGHT = 32;
const SQUARE_SIZE = 10;

const grid = new Grid(MAZE_WIDTH, MAZE_HEIGHT);
// console.log(grid.tiles[1][2].getNeighboursCoords());

grid.generateMaze();
// console.log(grid.tiles[1][2]);

saveMaze(grid.tiles, SQUARE_SIZE, "maze.png");