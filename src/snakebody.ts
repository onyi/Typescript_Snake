import { Direction } from "./direction";

export class SnakeBody {

    private x: number = 0;
    private y: number = 0;
    private width: number = 0;
    private direction: Direction;
    private isEnded: boolean = false;
    private isHead: boolean = false;

    constructor(x: number, y: number, width: number, direction: Direction){
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.width = width;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
    
    getDirection(){
        return this.direction;
    }

    setIsHead(){
        this.isHead = true;
    }

    checkIsHead(){
        return this.isHead;
    }

    update(){
        // if(this.direction === Direction.Down)
        //     this.startY += 50;
        // else if(this.direction === Direction.Up)
        //     this.endY -= 50;
        // else if(this.direction === Direction.Left)
        //     this.endX -= 50;
        // else if(this.direction === Direction.Right)
        //     this.startX += 50;

        // if( this.endY < this.startY || this.endX < this.startX)
        //     this.isEnded = true;
    }


}