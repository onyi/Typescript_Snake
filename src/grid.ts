import { SnakeBody } from "./snakebody";

export class Grid {
    private ctx: CanvasRenderingContext2D;

    private offsetX: number = 0;
    private offsetY: number = 0;
    private width: number = 50;
    private offsetWidth: number = 45;
    public gridWidth = 600;
    public gridHeight = 600;
    public gridOffsetWidth = 600;
    public gridOffsetHeight = 600;
    private matrix: Array<SnakeBody> = [];
    
    constructor(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number){
        this.ctx = ctx;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.gridOffsetWidth = offsetX + this.gridWidth;
        this.gridOffsetHeight = offsetY + this.gridHeight;
        console.log(`offset width: ${this.gridOffsetWidth}`);
        console.log(`offset height: ${this.gridOffsetHeight}`);

        this.matrix = [];
    }

    draw(){
        for(let i = 0; i < this.gridWidth / this.width ; i++){
            for(let j = 0; j < this.gridHeight / this.width; j++){
                this.ctx.fillStyle = 'orange';
                this.ctx.fillRect(this.offsetX + this.width * i, this.offsetY + this.width * j, this.offsetWidth, this.offsetWidth);
            }
        }
    }



}