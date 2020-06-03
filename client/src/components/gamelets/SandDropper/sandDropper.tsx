import React, {Component} from 'react';
import CellType from './cellType';
import Cell from './cell';
import CellMap from './cellMap';

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
    cellMap: CellMap,
    currentCellTypeIndex: number
}

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
            cellMap: new CellMap(0, 0),
            currentCellTypeIndex: 0
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
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {

        if (this.container !== null) {
            this.setState({
                width: Math.ceil(this.container.offsetWidth/this.props.grain),
                renderWidth: this.container.offsetWidth,
                renderHeight: this.props.height,
                height: Math.ceil(this.props.height / this.props.grain)
            });

            this.reset();   
        }

    }

    reset() {

        this.setState({
            ms: 0,
            mx: -1,
            my: -1,
            cells: [],
            cellMap: new CellMap(this.state.width, this.state.height)
        });
    }

    update() {

        this.setState((state) => {
            return {ms: state.ms + this.props.frequency}
        });


        if (this.canvas === null || this.state.cells === [] || this.state.cells === undefined) {
            this.updateDimensions();
        }
        
        let cells = this.state.cells;
        let cellMap = this.state.cellMap;

        let newCell = cellMap.spawnNewCellAtMouse(cells, CellType.types[this.state.currentCellTypeIndex], this.state.mx, this.state.my);
        if (newCell != null) {
            cells.push(newCell);
        }

        this.updateAllCells(cells, cellMap);

        this.setState({
            cells,
            cellMap
        })

        if (this.canvas != null) {
            this.clear();
            this.draw();
        } 
    }


    updateAllCells(cells: Cell[], cellMap:CellMap) {
        cells.forEach(cel => {
            cel.v.fall(cel, cellMap);
        })
    }


    fall(cel: Cell, cellMap: CellMap) {
        //if (cel.y === cellMap[0].length - 1) return;
        let y = cel.y + 1;
        let x = cel.x;
        if (cellMap.moveCell(cel, x, y)) return; 
        x -= 1;
        if (cellMap.moveCell(cel, x, y)) return; 
        x += 2;
        if (cellMap.moveCell(cel, x, y)) return; 
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
            <canvas className="sanddropper" onMouseMove={this.updateMouse} onMouseLeave={this.mouseLeave} onClick={this.nextCellType} width = {this.state.renderWidth} height={this.props.height} ref = {x => {
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

    mouseLeave = (event: any) => {

        this.setState((state) => {
            return {            
                mx:-1,
                my:-1
            }
        }); 
    }

    nextCellType = (event: any) => {

        this.setState({
            currentCellTypeIndex: (this.state.currentCellTypeIndex + 1) % CellType.types.length});
    }

    draw() {
        if (this.c2d === null) return;
        let c2d = this.c2d as CanvasRenderingContext2D;
        
        let cells = this.state.cells;
        cells.forEach((cel) => {
            if (cel != null) {
                c2d.beginPath();
                c2d.fillStyle = cel.v.color;
                //c2d.rect(cel.x * this.props.grain, cel.y * this.props.grain, this.props.grain, this.props.grain);
                c2d.ellipse(cel.x * this.props.grain, cel.y * this.props.grain, this.props.grain - 2, this.props.grain - 2, Math.PI / 4, 0, 2 * Math.PI);
                c2d.fill();
            }
        });

    }

    clear() {
        this.c2d?.clearRect(0, 0, this.state.renderWidth, this.state.renderHeight);
    }

}