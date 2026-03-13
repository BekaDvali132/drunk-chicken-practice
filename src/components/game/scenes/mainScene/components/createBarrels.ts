import Phaser from 'phaser';
import {
  BARREL_WIDTH,
  BARREL_Y_POS,
  BARRELS_AMOUNT,
  BARRELS_HEIGHT,
  BARRELS_START_X,
} from '@utils/constants.ts';

export default function createBarrels(scene: Phaser.Scene): Phaser.Physics.Arcade.StaticGroup {
  const barrels = scene.physics.add.staticGroup();

  for (let i = 0; i < BARRELS_AMOUNT; i++) {
    const x = BARRELS_START_X + BARREL_WIDTH / 2 + i * BARREL_WIDTH;
    const barrel = scene.add.image(x, BARREL_Y_POS, 'barrel');
    barrel.setDisplaySize(BARREL_WIDTH, BARRELS_HEIGHT);
    scene.physics.add.existing(barrel, true);
    barrels.add(barrel);
  }

  return barrels;
}
