import Phaser from 'phaser';
import { DESIGN_HEIGHT } from '@utils/constants.ts';

export const BOARD_W = 217;
export const BOARD_H = 77;

export default function createBoards(
  scene: Phaser.Scene,
  worldWidth: number
): Phaser.Physics.Arcade.StaticGroup {
  const midY = DESIGN_HEIGHT / 2;

  const startBoard = scene.add.image(0, midY, 'jumpingBoard');
  startBoard.setOrigin(0, 0.5);
  startBoard.setDisplaySize(BOARD_W, BOARD_H);

  const endBoard = scene.add.image(worldWidth, midY, 'jumpingBoard');
  endBoard.setOrigin(1, 0.5);
  endBoard.setFlipX(true);
  endBoard.setDisplaySize(BOARD_W, BOARD_H);

  const blocks = scene.physics.add.staticGroup();

  const startPlatform = scene.add.rectangle(BOARD_W / 2, midY, BOARD_W, 4, 0x000000, 0);
  scene.physics.add.existing(startPlatform, true);
  blocks.add(startPlatform);

  const endPlatform = scene.add.rectangle(worldWidth - BOARD_W / 2, midY, BOARD_W, 4, 0x000000, 0);
  scene.physics.add.existing(endPlatform, true);
  blocks.add(endPlatform);

  return blocks;
}
