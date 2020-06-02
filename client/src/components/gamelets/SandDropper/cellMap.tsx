import Cell from "./cell";
import CellType from "./cellType";

export default class CellMap {
    public map:(Cell|null)[][];
    public height: number;
    public width: number;

    constructor(width: number, height: number) {
        this.height = height;
        this.width = width;
        this.map = Array(width).fill(null).map(a => Array(height).fill(null));
    }

    
    moveCell(cel: Cell, x: number, y:number): boolean {
        if(!this.inBounds(x, y)) return false;

        if (this.map[x][y] === null) {
            this.map[cel.x][cel.y] = null;
            cel.y = y;
            cel.x = x;
            this.map[x][y] = cel;   
            return true;
        } else {
            let otherCell = this.map[x][y];
            if (otherCell === null) return false;
            if (otherCell.v.density < cel.v.density) {
                let chance = cel.v.density - otherCell.v.density;
                let roll = Math.random()*1000;
                if (roll < chance) {
                    this.swap(cel, this.map[x][y])
                }
                return true;
            }
        }
        return false;
    }

    swap (c1: Cell, c2: Cell|null) {
        if (c2 == null) return;
        let c1x = c1.x;
        let c1y = c1.y;
        c1.x = c2.x;
        c1.y = c2.y;
        this.map[c1.x][c1.y] = c1;
        c2.x = c1x;
        c2.y = c1y;
        this.map[c2.x][c2.y] = c2;

    }    

    spawnNewCellAtMouse(cells: Cell[], ct: CellType, mx: number, my:number): Cell | null {
        if (this.inBounds(mx, my)) {
            let cell: Cell = new Cell(mx, my, ct);
            this.map[mx][my] = cell;
            return cell;
        }
        return null;
    }
    
    inBounds(x: number, y:number) {
        return (x < this.width
            && x >= 0
            && y < this.height
            && y >= 0);
    }


}