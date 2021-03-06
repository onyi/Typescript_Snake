import { Grid } from "./grid";
import { Snake } from "./snake";
import { Food } from "./food";
import { GameStatus } from "./gameStatus";
import { State } from "./state";

import { Config } from "./config";

export class Game {
  public canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private requestedFrameId: number = -1;
  private grid: Grid;
  private offsetX: number = Config.CANVAS_OFFSET_X;
  private offsetY: number = Config.CANVAS_OFFSET_Y;
  private gridWidth: number = Config.CANVAS_WIDTH;
  private gridHeight: number = Config.CANVAS_HEIGHT;
  private width: number = Config.WIDTH;
  private offsetWidth: number = Math.floor( this.width * 0.9 ) ;
  private snake: Snake;
  private frame: number = 0;
  // private gameOver: boolean = false;
  private tickRate: number = Config.TICKRATE;
  private food: Food;
  private gameStatus: GameStatus;

  private loopCount = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    // canvas.setAttribute("width", this. )
    this.ctx = canvas.getContext("2d");
    this.grid = new Grid(this.ctx, this.gridWidth, this.gridHeight, this.offsetX, this.offsetY, this.width, this.offsetWidth);
    this.snake = new Snake(this.ctx, Config.INIT_SNAKE_SIZE, this.offsetX, this.offsetY, this.width, this.offsetWidth);
    canvas.setAttribute("width", this.grid.gridOffsetWidth.toString());
    canvas.setAttribute("height", this.grid.gridOffsetHeight.toString());
    this.food = new Food(this.ctx, this.offsetX, this.offsetY, this.width, this.offsetWidth);
    this.food.update(this.grid.gridWidth, this.grid.gridHeight);
    this.gameStatus = new GameStatus(this.ctx);
    console.log(`offsetWidth: ${this.offsetWidth}`);
  }

  reset(){
    this.clearCanvas();
    this.grid = new Grid(this.ctx, this.gridWidth, this.gridHeight, this.offsetX, this.offsetY, this.width, this.offsetWidth);
    this.snake = new Snake(this.ctx, Config.INIT_SNAKE_SIZE, this.offsetX, this.offsetY, this.width, this.offsetWidth);
    this.food = new Food(this.ctx, this.offsetX, this.offsetY, this.width, this.offsetWidth);
    this.updateFoodPosition();
    // this.gameOver = false;
    this.gameStatus.reset();
    this.gameStatus.ready();
    this.loopCount = 0;
    // this.endLoop();
    // this.startLoop();
  }

  private loop() {
    if(this.gameStatus.isPlaying()){
      if(this.loopCount % this.tickRate === 0){
        console.log(`Update game`);
        this.snake.update();
        let head = this.snake.getHead();
        if(!this.snake.isOutOfBound(this.grid.gridWidth, this.grid.gridHeight) && !this.snake.isCollidedWithSelf() ){
          console.log(`Draw snake`);

          //Check whether head collide with Food object

          if ( this.food.isCollided(head.getX(), head.getY()) ){
            this.snake.increaseLength(1);
            this.gameStatus.addPoint();
            this.updateFoodPosition();
          }
          this.grid.draw();
          this.snake.draw();
          this.food.draw();
          this.gameStatus.draw();
        }else{
          this.gameOver();
        }
      }
    }
    else{
      this.grid.draw();
      this.snake.draw();
    }
    ++this.loopCount;
    // console.log("looping");
    // console.log(this.loopCount);
    this.requestedFrameId = requestAnimationFrame(() => this.loop());
  }

  startLoop() {
    this.requestedFrameId = requestAnimationFrame(() => this.loop());
  }

  endLoop() {
    cancelAnimationFrame(this.requestedFrameId);
  }

  startGame(){
    if(!this.gameStatus.isPlaying()){
      this.reset();
    }
    this.gameStatus.start();
    this.endLoop();
    this.startLoop();
  }

  gameOver(){
    this.gameStatus.gameOver();
    // this.reset();
  }

  updateGameState(){
    this.startGame();
    this.gameStatus.nextState();
  }

  updateFoodPosition(){
    let foodPos = this.food.update(this.grid.gridWidth, this.grid.gridHeight);
    while( this.snake.isOverlapWithBody(foodPos[0], foodPos[1]) ){
      foodPos = this.food.update(this.grid.gridWidth, this.grid.gridHeight);
    }
  }

  clearCanvas(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.beginPath();
  }

  changeSnakeDirection(e: KeyboardEvent){
    if([38, 40, 37, 39].indexOf(e.keyCode) !== -1) { //only prevent default when necessary. In this case only arrow keys
      e.preventDefault();
      // console.log(`prevent default`);
    }
    this.snake.changeSnakeDirection(e);
  }
}
