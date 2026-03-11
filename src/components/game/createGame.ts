import { Game, type Types } from "phaser";
import { BootScene } from "./scenes/BootScene.ts";
import { MainScene } from "./scenes/MainScene.ts";

interface Props {
  parent: string;
}

function createGame({ parent }: Props): Phaser.Game {
  const dpr = window.devicePixelRatio || 1;
  const parentEl = document.getElementById(parent);
  const displayWidth = parentEl?.clientWidth || window.innerWidth;
  const displayHeight = parentEl?.clientHeight || window.innerHeight;

  // Create canvas with proper DPR scaling
  const canvas = document.createElement("canvas");
  canvas.id = "game";
  canvas.width = Math.floor(displayWidth * dpr);
  canvas.height = Math.floor(displayHeight * dpr);
  canvas.style.width = displayWidth + "px";
  canvas.style.height = displayHeight + "px";
  canvas.style.backgroundColor = "transparent";

  if (parentEl) {
    parentEl.appendChild(canvas);
  }

  const config: Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    canvas: canvas,
    transparent: true,
    width: canvas.width,
    height: canvas.height,
    render: {
      antialias: true,
      pixelArt: false,
      roundPixels: false,
    },
    scale: {
      mode: Phaser.Scale.NONE,
    },
    physics: {
      default: "matter",
    },
    scene: [BootScene, MainScene],
  };

  const game = new Game(config);

  // Store DPR on game instance for scenes to access
  (game as unknown as Record<string, unknown>).dpr = dpr;

  // Handle window resizing
  const handleResize = () => {
    const newDpr = window.devicePixelRatio || 1;
    const newWidth = parentEl?.clientWidth || window.innerWidth;
    const newHeight = parentEl?.clientHeight || window.innerHeight;

    canvas.width = Math.floor(newWidth * newDpr);
    canvas.height = Math.floor(newHeight * newDpr);
    canvas.style.width = newWidth + "px";
    canvas.style.height = newHeight + "px";

    game.scale.resize(canvas.width, canvas.height);
    (game as unknown as Record<string, unknown>).dpr = newDpr;
  };

  window.addEventListener("resize", handleResize);

  game.events.once("destroy", () => {
    window.removeEventListener("resize", handleResize);
  });

  return game;
}

export default createGame;
