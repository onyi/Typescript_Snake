import {Direction} from './direction';
import { SnakeBody } from './snakebody';
import { Keycode } from './keycode';

export class Snake {

    private ctx: CanvasRenderingContext2D;
    private x: number = 0;
    private y: number = 0;
    private offsetX: number = 0;
    private offsetY: number = 0;
    private width: number;
    private offsetWidth: number;
    private increased: number = 0;
    private direction: Direction;
    private shapes: Array<SnakeBody> = [];
    private head: SnakeBody;
    private headImage: HTMLImageElement;
    private initSnakeSize: number;


    constructor(ctx: CanvasRenderingContext2D, initSnakeSize: number, offsetX: number, offsetY: number, width: number, offsetWidth: number){
        this.ctx = ctx;
        this.headImage = new Image();
        this.headImage.src = "src/images/snakeHead.png";
        this.initSnakeSize = initSnakeSize;
        this.width = width;
        this.offsetWidth = offsetWidth;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.direction = Direction.Up;
        for(let i = 0; i < this.initSnakeSize; i++){
            // start from 6 dots to the right, and 4 dots under from top left of the grid
            this.shapes.push(
                new SnakeBody(offsetX + this.width * 6, 
                    (offsetY + this.width * 4) + this.width * i, 
                    this.offsetWidth, 
                    Direction.Up));
        }
        this.head = this.shapes[0];
        this.head.setIsHead();
    }

    draw(){
        for( const sb of this.shapes){
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(sb.getX(), sb.getY(), this.offsetWidth, this.offsetWidth);
            if(sb.getX() === this.head.getX() && sb.getY() === this.head.getY()){
                this.ctx.drawImage(this.headImage, sb.getX(), sb.getY(), this.offsetWidth, this.offsetWidth);
            }
        }
    }

    isOutOfBound(width: number, height: number){
        // console.log(`Head X: ${this.head.getX()}; Head Y: ${this.head.getY()}`);
        // console.log(`Offset X: ${this.offsetX}; Offset Y: ${this.offsetY}`);
        // console.log(`Width: ${width}; Height: ${height}`);
        return this.head.getX() < this.offsetX || this.head.getX() >= width + this.offsetX || this.head.getY() < this.offsetY || this.head.getY() >= this.offsetY + height
    }

    isCollidedWithSelf(){
        // console.log(`head X ${this.head.getX()} and head Y ${this.head.getY()}`);
        // this.shapes.slice(1).some( snakebody => console.log(`X: ${snakebody.getX()}; Y: ${snakebody.getY()}`) );     
        for(let i = 1; i < this.shapes.length; i++){
            if(this.head.getX() === this.shapes[i].getX() && this.head.getY() === this.shapes[i].getY())
                return true;
        }
        return false;
    }

    isOverlapWithBody(x: number, y: number){
        for(let i = 0; i < this.shapes.length; i++){
            if( x === this.shapes[i].getX() && y === this.shapes[i].getY())
                return true;
        }
        return false;
    }

    getHead(){
        return this.head;
    }

    update(){
        if(this.increased === 0){
            this.shapes.pop();
        }else{
            this.increased--;
        }
        let newX, newY;
        if(this.direction === Direction.Up){
            newX = this.head.getX();
            newY = this.head.getY() - this.width;
        }else if(this.direction === Direction.Down){
            newX = this.head.getX();
            newY = this.head.getY() + this.width;
        }else if(this.direction === Direction.Left){
            newX = this.head.getX() - this.width;
            newY = this.head.getY();
        }else if(this.direction === Direction.Right){
            newX = this.head.getX() + this.width;
            newY = this.head.getY();
        }
        let head = new SnakeBody(newX, newY, this.width, this.direction);
        this.head = head;
        this.shapes.unshift(head);

    }

    changeSnakeDirection(e: KeyboardEvent){
        console.log(`Key pressed, should change direction`);
        if(e.keyCode === Keycode.Up) {//Arrow Up
            if(this.direction !== Direction.Down)
                this.direction = Direction.Up;
        }
        else if(e.keyCode === Keycode.Down) {//Arrow Down
            if(this.direction !== Direction.Up)
                this.direction = Direction.Down;
        }
        else if(e.keyCode === Keycode.Left) {//Arrow Left
            if(this.direction !== Direction.Right)
                this.direction = Direction.Left;
        }
        else if(e.keyCode === Keycode.Right) {//Arrow Right
            if(this.direction !== Direction.Left)
                this.direction = Direction.Right;
        }
        console.log(`Current Direction: ${this.direction}`);

        
      }

      increaseLength(length: number){
          this.increased += length;
      }



}