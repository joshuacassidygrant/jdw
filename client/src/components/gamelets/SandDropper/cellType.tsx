import Cell from './cell';
import CellMap from './cellMap';

let defaultFall: (c: Cell, m: CellMap) => any =  (cel: Cell, m: CellMap) => {
    let y = cel.y + 1;
    let x = cel.x;
    if (m.moveCell(cel, x, y)) return; 
    x -= 1;
    if (m.moveCell(cel, x, y)) return; 
    x += 2;
    if (m.moveCell(cel, x, y)) return; 
}

let flowFall: (c: Cell, m: CellMap) => any =  (cel: Cell, m: CellMap) => {
    let y = cel.y + 1;
    let x = cel.x;
    if (m.moveCell(cel, x, y)) return; 
    x -= 1;
    if (m.moveCell(cel, x, y)) return; 
    x += 2;
    if (m.moveCell(cel, x, y)) return; 
    y = cel.y;
    x = cel.x - 1;
    if (m.moveCell(cel, x, y)) return; 
    x = cel.x + 1;
    if (m.moveCell(cel, x, y)) return; 
}

export default class CellType {
    public name: string;
    public color: string;
    public fall: (c: Cell, m: CellMap) => any;
    public density: number = 50;

    constructor(name: string, color: string, density: number = 50, fall: any = defaultFall) {
        this.name = name;
        this.color = color;
        this.fall = fall;
        this.density = density;
    }

    static types: CellType[] = [
        new CellType ("Yellow Sand", "#DDCC22", 500, defaultFall),
        new CellType ("Water", "#44BBDD", 200, flowFall),
        new CellType ("Red Sand", "#EE4444", 498, defaultFall),
        new CellType ("Iron", "#664466", 689, defaultFall),
        new CellType ("Oil", "#332233", 180, flowFall)
    ]
}


