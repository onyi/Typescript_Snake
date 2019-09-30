import { SnakeBody } from "./snakebody";
import { Config } from "./config";

export class Grid {
    private ctx: CanvasRenderingContext2D;

    private offsetX: number = 0;
    private offsetY: number = 0;
    private width: number;
    private offsetWidth: number;
    public gridWidth: number;
    public gridHeight: number;
    public gridOffsetWidth: number;
    public gridOffsetHeight: number;
    private matrix: Array<SnakeBody> = [];
    
    constructor(ctx: CanvasRenderingContext2D, gridWidth: number, gridHeight: number, offsetX: number, offsetY: number, width: number, offsetWidth: number){
        this.ctx = ctx;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.width = width;
        this.offsetWidth = offsetWidth;
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
                this.ctx.fillRect(
                    this.offsetX + this.width * i, 
                    this.offsetY + this.width * j, 
                    this.offsetWidth, 
                    this.offsetWidth);
            }
        }
    }



}