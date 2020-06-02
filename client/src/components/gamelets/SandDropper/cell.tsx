import CellType from "./cellType";

export default class Cell {
    x: number;
    y: number;
    v: CellType;

    constructor(x: number, y: number, v: CellType) {
        this.x = x;
        this.y = y;
        this.v = v;
    }
}