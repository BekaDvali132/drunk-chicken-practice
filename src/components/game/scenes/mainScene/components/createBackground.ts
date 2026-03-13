import Phaser from 'phaser';
import { DESIGN_HEIGHT } from '@utils/constants.ts';

export default function createBackground(scene: Phaser.Scene, worldWidth: number): void {
  const bgTex = scene.textures.get('worldBackground').getSourceImage() as HTMLImageElement;
  const bgScale = DESIGN_HEIGHT / bgTex.height;

  const bg = scene.add.tileSprite(0, 0, worldWidth, DESIGN_HEIGHT, 'worldBackground');
  bg.setOrigin(0, 0);
  bg.setTileScale(bgScale, bgScale);
}
