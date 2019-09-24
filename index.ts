import { Game } from "./src/game";
import './index.scss';

document.addEventListener("DOMContentLoaded", () => {
  const canvas: HTMLCanvasElement = document.querySelector("canvas");
  const game = new Game(canvas);

  const restartButton = document.createElement("button");
  restartButton.innerHTML = "Restart"

  restartButton.addEventListener("click", () => {
    game.reset();
  });

  const root: HTMLElement = document.getElementById("root");
  root.focus;

  root.appendChild(restartButton);

  document.addEventListener( "keydown", (e: KeyboardEvent) => { 
    console.log(`Keyboard event`);
    game.changeSnakeDirection(e); 
  });
  game.startLoop();
  // setTimeout(() => {
  //   game.endLoop();
  // }, 2000);
});
