import {State} from './state';
import { StatusText } from './statusText';

export class GameStatus {

    private points: number = 0;

    private ctx: CanvasRenderingContext2D;

    private gameState: State;

    private offsetX: number = 0; 
    private offsetY: number = 0;

    private gameButton: HTMLElement;
    private scoreboard: HTMLElement;

    constructor(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number){
        this.ctx = ctx;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.gameState = State.READY;
        this.gameButton = document.getElementById("gameButton");
        this.updateGameButton(this.gameState);
        let scoreboard = document.createElement("div");
        scoreboard.setAttribute("id", "scoreboard");
        let gameComponents = document.getElementById("gameComponents");
        gameComponents.appendChild(scoreboard);
        // gameComponents.insertBefore(scoreboard, gameComponents.childNodes[0]);
        this.scoreboard = scoreboard;

    }

    reset(){
        this.points = 0;
        this.scoreboard.innerHTML = ``;
    }

    update(){

        this.scoreboard.innerHTML = `Points: ${this.points}`;
        this.scoreboard.appendChild(document.createElement("p"));

    }

    addPoint(){
        this.points ++;
        this.update();
    }

    gameOver(){
        this.gameState = State.GAMEOVER;
        this.updateGameButton(State.START);
        this.gameButton.removeAttribute("disabled");
    }

    start(){
        this.gameState = State.PLAYING;
        this.gameButton.setAttribute("disabled", "");
    }

    pause(){
        this.gameState = State.PAUSE;
        this.updateGameButton(State.READY);
    }

    updateGameButton(buttonText: string){
        this.gameButton.innerHTML = buttonText;
    }

    ready(){
        this.gameState = State.READY;
        this.updateGameButton(State.START);
    }

    nextState(){
        if(this.gameState === State.READY){
            this.gameState = State.PLAYING;
            this.updateGameButton(State.PLAYING);
        }
        else if( this.gameState  === State.PLAYING ){
            this.gameState = State.GAMEOVER;
            this.updateGameButton(StatusText.RESTART);

        }
        else if( this.gameState === State.GAMEOVER){
            this.gameState = State.READY;
            this.updateGameButton(State.START);

        }
    }

    draw(){
        // this.ctx.font = "12px Arial";
        // this.ctx.fillText(this.gameState, this.offsetX, this.offsetY);
        // this.ctx.fillText(`Points: ${this.points}`, this.offsetX, this.offsetY + 50);
    }   

    isPlaying(){
        return this.gameState === State.PLAYING;
    }



}