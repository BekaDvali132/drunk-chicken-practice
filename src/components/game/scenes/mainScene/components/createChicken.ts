import Phaser from 'phaser';
import { BOARD_W } from '@scenes/mainScene/components/createBoards.ts';
import { DESIGN_HEIGHT } from '@game/createGame.ts';

export default function createChicken(
  scene: Phaser.Scene,
  worldWidth: number
): Phaser.GameObjects.Image {
  const chickenTex = scene.textures.get('chicken').getSourceImage() as HTMLImageElement;
  const displayWidth = BOARD_W;
  const displayHeight = chickenTex.height * (displayWidth / chickenTex.width);

  const chicken = scene.add.image(worldWidth, DESIGN_HEIGHT * 0.45, 'chicken');
  chicken.setOrigin(1, 0.5);
  chicken.setDisplaySize(displayWidth, displayHeight);

  return chicken;
}
