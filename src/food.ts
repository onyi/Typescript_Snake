import { Config } from "./config";

export class Food {

    private ctx: CanvasRenderingContext2D;

    private x: number;
    private y: number;
    private offsetX: number = 0;
    private offsetY: number = 0;

    private width: number;
    private offsetWidth: number;
    private image: HTMLImageElement;

    constructor(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number, width: number, offsetWidth: number){
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.width = width;
        this.offsetWidth = offsetWidth;
        this.ctx = ctx;
        this.image = new Image();
        this.image.src = "src/images/apple.png";
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    private updateLocation(width: number, height: number){
        let maxX = (width - this.offsetX) / this.width;
        let maxY = (height - this.offsetY) / this.width;

        // console.log(`Max X: ${maxX}; Max Y: ${maxY}`);

        this.x = this.getRandomInt(maxX) * this.width + this.offsetX;
        this.y = this.getRandomInt(maxY) * this.width + this.offsetY;

        // console.log(`X & Y: ${this.x}, ${this.y}`);
        return [this.x, this.y];
    }

    update(width: number, height: number){
        return this.updateLocation(width, height);
    }

    draw(){
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.getX(), this.getY(), this.offsetWidth, this.offsetWidth);
        this.ctx.drawImage(this.image, this.getX(), this.getY(), this.offsetWidth, this.offsetWidth);

    }

    isCollided(x: number, y: number){
        // this.shapes.slice(1).some( snakebody => console.log(`X: ${snakebody.getX()}; Y: ${snakebody.getY()}`) );     
        return x === this.x && y === this.y;
    }


}


// let food = new Food(null, 100, 100);

// food.updateLocation(600, 600);