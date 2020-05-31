import React, {Component} from 'react';

interface LineDrawerProps {
    frequency: number,
    height: number
}

interface LineDrawerState {
    ms: number,
    mx: number,
    my: number,
    height: number,
    width: number,
}

export default class LineDrawer extends Component<LineDrawerProps, LineDrawerState> {

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
            width: 0
        }
        this.canvas = null;
        this.c2d = null;
        this.rect = null;
        this.container = null;

    }

    componentDidMount() {
        this.updateInterval = setInterval(() => this.update(), this.props.frequency);
        this.setState({height: this.props.height});
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    updateDimensions() {
        if (this.container !== null) {
            this.setState({
                width: this.container.offsetWidth,
            });
        }
    }

    update() {
        this.setState((state) => {
            return {ms: state.ms + this.props.frequency}
        });

        if (this.container != null && this.canvas == null) {
            this.setState({
                width: this.container.offsetWidth,
            });
        }

        if (this.canvas != null) {
            this.clear();
            this.draw();
        }   
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
            <canvas onMouseMove={this.updateMouse} width = {this.state.width} height={this.props.height} ref = {x => {
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
                mx: cX,
                my: cY
            }
        }); 
    }

    draw() {
        if (this.c2d === null) return;
        let c2d = this.c2d as CanvasRenderingContext2D;
        
        // TODO: improve this

        for (let i = 0; i < this.state.width; i = i + 1) {
            c2d.beginPath();
            
            let distX = Math.abs(this.state.mx - i);

            let x:number = i;
            let y:number = Math.cos(i / 15 + this.state.ms / 100) * distX / 20 + (this.state.height / 2);

            let distY = Math.abs(this.state.my - y);
            y += distY / 10 + distX / 20;
            y -= Math.sin(Math.pow(i, 2)) / 10;


            c2d.rect(x, y, 1, 1);
            c2d.fillStyle = "#2266FF";
            c2d.fill();
        }

        for (let i = 0; i < this.state.width; i = i + 1) {
            c2d.beginPath();
            
            let distX = Math.abs(this.state.mx - i);

            let x:number = i;
            let y:number = Math.cos(i / 11 + this.state.ms / 100) * distX / 15 + (this.state.height / 2);

            let distY = Math.abs(this.state.my - y);
            y += distY / 20 + distX / 50;
            y -= Math.tan(Math.pow(i, 2)) / 10;


            c2d.rect(x, y, 1, 1);
            c2d.fillStyle = "#FF6622";
            c2d.fill();
        }


        
        for (let i = 0; i < this.state.width; i = i + 1) {
            c2d.beginPath();

            let distX = Math.abs(this.state.mx - i);

            let x:number = i;
            let y:number = Math.pow(Math.cos(i / 32 + this.state.ms / 100)/2, 2) * distX / 5 + (this.state.height / 2);
            y -= Math.tan(Math.pow(i, 2)) / 10;


            c2d.rect(x, y, 1, 1);
            c2d.fillStyle = "#00FF22";
            c2d.fill();
        }

    }

    clear() {
        this.c2d?.clearRect(0, 0, this.state.width, this.state.height);
    }

}