import { Game, type Types } from "phaser";
import { BootScene } from "./scenes/bootScene/BootScene.ts";
import { MainScene } from "./scenes/mainScene/MainScene.ts";
import { DESIGN_WIDTH, DESIGN_HEIGHT } from "../../utils/constants.ts";

interface Props {
  parent: string;
}

function createGame({ parent }: Props): Phaser.Game {
  const parentEl = document.getElementById(parent);
  const containerW = parentEl?.clientWidth || window.innerWidth;
  const containerH = parentEl?.clientHeight || window.innerHeight;

  const canvas = document.createElement("canvas");
  canvas.width = containerW;
  canvas.height = containerH;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";

  if (parentEl) parentEl.appendChild(canvas);

  const config: Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    canvas,
    transparent: true,
    width: containerW,
    height: containerH,
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

  const handleResize = () => {
    const newW = parentEl?.clientWidth || window.innerWidth;
    const newH = parentEl?.clientHeight || window.innerHeight;
    canvas.width = newW;
    canvas.height = newH;
    game.scale.resize(newW, newH);
  };

  window.addEventListener("resize", handleResize);
  game.events.once("destroy", () => window.removeEventListener("resize", handleResize));

  return game;
}

export { DESIGN_WIDTH, DESIGN_HEIGHT };
export default createGame;