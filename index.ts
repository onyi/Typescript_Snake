import { Game } from "./src/game";
import './index.scss';

document.addEventListener("DOMContentLoaded", () => {

  //Generating Frontend components
  const gameComponents = document.getElementById("gameComponents");

  const gameButton = document.createElement("button");
  const resetButton = document.createElement("button");
  resetButton.innerHTML = "Reset";
  resetButton.classList.add("gameButton");
  // gameButton.innerHTML = "Restart"
  gameButton.classList.add("gameButton");
  gameButton.setAttribute("id", "gameButton");

  const root: HTMLElement = document.getElementById("root");
  root.focus;

  gameComponents.appendChild(gameButton);
  gameComponents.appendChild(resetButton);
  gameComponents.classList.add("gameComponents");

  root.appendChild(gameComponents);


  // Init game class
  const canvas: HTMLCanvasElement = document.querySelector("canvas");
  const game = new Game(canvas);

  gameButton.addEventListener("click", () => {
    game.startGame();
  });

  resetButton.addEventListener("click", () => {
    game.reset();
  })

  document.addEventListener( "keydown", (e: KeyboardEvent) => { 
    // console.log(`Key Code: ${e.keyCode}`);
    game.changeSnakeDirection(e); 
  });
  game.startLoop();
  // setTimeout(() => {
  //   game.endLoop();
  // }, 2000);
});
