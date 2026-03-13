import Phaser from 'phaser';
import { BOARD_W } from '@scenes/mainScene/components/createBoards.ts';
import { DESIGN_HEIGHT } from '@utils/constants.ts';

export default function createPlayer(
  scene: Phaser.Scene,
  blocks: Phaser.Physics.Arcade.StaticGroup
): Phaser.Physics.Arcade.Sprite {
  const player = scene.physics.add.sprite(
    BOARD_W / 2,
    DESIGN_HEIGHT / 2 - 200 / 2,
    'rooster'
  );
  player.setDisplaySize(140, 200);
  player.setOrigin(0.5, 0.5);
  player.setCollideWorldBounds(true);

  scene.physics.add.collider(player, blocks);

  return player;
}
