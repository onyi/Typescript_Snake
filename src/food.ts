export class Food {

    private ctx: CanvasRenderingContext2D;

    private x: number;
    private y: number;
    private offsetX: number = 0;
    private offsetY: number = 0;

    private width: number = 45;
    private offsetWidth: number = 50;
    private image: HTMLImageElement;

    constructor(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number){
        this.offsetX = offsetX;
        this.offsetY = offsetY;
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
        let maxX = (width - this.offsetX) / this.offsetWidth;
        let maxY = (height - this.offsetY) / this.offsetWidth;

        // console.log(`Max X: ${maxX}; Max Y: ${maxY}`);

        this.x = this.getRandomInt(maxX) * this.offsetWidth + this.offsetX;
        this.y = this.getRandomInt(maxY) * this.offsetWidth + this.offsetY;

        // console.log(`X & Y: ${this.x}, ${this.y}`);
        return [this.x, this.y];
    }

    update(width: number, height: number){

        return this.updateLocation(width, height);
        
    }

    draw(){
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.getX(), this.getY(), this.width, this.width);
        this.ctx.drawImage(this.image, this.getX(), this.getY(), this.width, this.width);

    }

    isCollided(x: number, y: number){
        // this.shapes.slice(1).some( snakebody => console.log(`X: ${snakebody.getX()}; Y: ${snakebody.getY()}`) );     
        return x === this.x && y === this.y;
    }


}


// let food = new Food(null, 100, 100);

// food.updateLocation(600, 600);