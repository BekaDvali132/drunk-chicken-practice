import Phaser from 'phaser';
import { DESIGN_HEIGHT } from '@game/createGame.ts';

export default function createChicken(
  scene: Phaser.Scene,
  worldWidth: number
): Phaser.GameObjects.Image {
  const chicken = scene.add.image(worldWidth, DESIGN_HEIGHT / 2 - 163 / 2, 'chicken');
  chicken.setOrigin(1, 0.5);
  chicken.setDisplaySize(160, 163);

  return chicken;
}
