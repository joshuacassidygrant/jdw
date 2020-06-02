import React, {Component} from 'react';

interface SandDropperProps {
    frequency: number,
    height: number,
    grain: number
}

interface SandDropperState {
    ms: number,
    mx: number,
    my: number,
    height: number,
    width: number,
    renderHeight: number,
    renderWidth: number,
    cells: Cell[],
    cellMap: (Cell|null)[][],
    currentCellType: CellType
}

class Cell {
    x: number;
    y: number;
    v: CellType;

    constructor(x: number, y: number, v: CellType) {
        this.x = x;
        this.y = y;
        this.v = v;
    }
}

class CellType {
    name: string;
    color: string;    

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }
}

let BlueSand = new CellType ("Blue Sand", "#4444EE");
let RedSand =  new CellType ("Red Sand", "#EE4444");



export default class SandDropper extends Component<SandDropperProps, SandDropperState> {

    container: any;
    updateInterval: any;
    canvas: HTMLCanvasElement | null;
    c2d: CanvasRenderingContext2D | null;
    rect: DOMRect | null;

    constructor(props: any) {
        super(props);
        this.state = {
            ms: 0,
            mx: 0,
            my: 0,
            height: 0,
            width: 0,
            renderHeight: 0,
            renderWidth: 0,
            cells: [],
            cellMap: [],
            currentCellType: BlueSand
        }
        this.canvas = null;
        this.c2d = null;
        this.rect = null;
        this.container = null;

    }

    componentDidMount() {
        this.updateInterval = setInterval(() => this.update(), this.props.frequency);
        this.setState({renderHeight: this.props.height});
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    updateDimensions() {

        if (this.container !== null) {
            this.setState({
                width: Math.ceil(this.container.offsetWidth/this.props.grain),
                renderWidth: this.container.offsetWidth,
                renderHeight: this.props.height,
                height: Math.ceil(this.props.height / this.props.grain)
            });
        }

        this.reset();   
    }

    reset() {
        this.setState({
            ms: 0,
            mx: 0,
            my: 0,
            cells: [],
            cellMap: Array(this.state.width).fill(null).map(a => Array(this.props.grain).fill(null))
        });
    }

    update() {

        this.setState((state) => {
            return {ms: state.ms + this.props.frequency}
        });


        if (this.canvas === null || this.state.cells === [] || this.state.cells === undefined) {
            this.updateDimensions();
        }
                
        let mx = this.state.mx;
        let my = this.state.my;
        let cells = this.state.cells;
        let cellMap = this.state.cellMap;

        
        if (this.inBounds(mx, my)) {
            let cell: Cell = new Cell(mx, my, this.state.currentCellType);
            cellMap[mx][my] = cell;
            cells.push(cell);
        }

        cells.forEach(cel => {
            this.fall(cel, cellMap);
        })


        this.setState({
            cells,
            cellMap
        })

        if (this.canvas != null) {
            this.clear();
            this.draw();
        } 
    }

    fall(cel: Cell, cellMap: (Cell|null)[][]) {
        if (cel.y === cellMap[0].length - 1) return;
        let y = cel.y + 1;
        let x = cel.x;
        if (this.moveCell(cel, x, y, cellMap)) return; 
        x -= 1;
        if (this.moveCell(cel, x, y, cellMap)) return; 
        x += 2;
        if (this.moveCell(cel, x, y, cellMap)) return; 
    }

    moveCell(cel: Cell, x: number, y:number, cellMap: (Cell|null)[][]): boolean {
        if(!this.inBounds(x, y)) return false;

        if (cellMap[x][y] == null) {
            cellMap[cel.x][cel.y] = null;
            cel.y = y;
            cel.x = x;
            cellMap[x][y] = cel;   
            return true;
        }
        return false;
    }
    
    inBounds(x: number, y:number) {
        return (x < this.state.width
            && x >= 0
            && y < this.state.height
            && y >= 0);
    }

    render() {
        return (
            <div className="container" ref={x => {this.container = x;}}>
                {this.state.width > 0 && this.renderCanvas()}
            </div>
        )
    }
    
    renderCanvas() {
        return (
            <canvas onMouseMove={this.updateMouse} onClick={this.nextCellType} width = {this.state.renderWidth} height={this.props.height} ref = {x => {
                this.canvas = x;
                if (x == null) return;
                this.c2d = x.getContext("2d");
                this.rect = x.getBoundingClientRect();
            }} id="line_canvas" />
        )
    }

    updateMouse = (event: any) => {
        let rect = this.rect as DOMRect;

        if (rect == null) return;

        let cX = event.clientX - rect.left;
        let cY = event.clientY - rect.top;
        this.setState((state) => {
            return {            
                mx: Math.ceil(cX / this.props.grain),
                my: Math.ceil(cY / this.props.grain)
            }
        }); 


    }

    nextCellType = (event: any) => {
        let nextType: CellType = BlueSand;
        if (this.state.currentCellType === RedSand) {
            nextType = BlueSand;
        } else {
            nextType = RedSand;
        }
        console.log(nextType);
        this.setState({
            currentCellType: nextType
        })
    }

    draw() {
        if (this.c2d === null) return;
        let c2d = this.c2d as CanvasRenderingContext2D;
        
        let cells = this.state.cells;
        cells.forEach((cel) => {
            if (cel != null) {
                c2d.beginPath();
                c2d.fillStyle = cel.v.color;
                c2d.rect(cel.x * this.props.grain, cel.y * this.props.grain, this.props.grain, this.props.grain);
                c2d.fill();
            }
        });

    }

    clear() {
        this.c2d?.clearRect(0, 0, this.state.renderWidth, this.state.renderHeight);
    }

}