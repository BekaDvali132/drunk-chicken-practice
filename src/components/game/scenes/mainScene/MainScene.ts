import Phaser from 'phaser';
import { BARRELS_START_X, BARRELS_AMOUNT, BARREL_WIDTH } from '@utils/constants.ts';
import createBoards, { BOARD_W } from '@scenes/mainScene/components/createBoards.ts';
import { setupWorldAndCamera } from '@scenes/mainScene/components/setupCamera.ts';
import createBackground from '@scenes/mainScene/components/createBackground.ts';
import createPlayer from '@scenes/mainScene/components/createPlayer.ts';
import createChicken from '@scenes/mainScene/components/createChicken.ts';
import setupInput from '@scenes/mainScene/components/setupInput.ts';
import createBarrels from '@scenes/mainScene/components/createBarrels.ts';

export class MainScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private chicken!: Phaser.GameObjects.Image;
  private blocks!: Phaser.Physics.Arcade.StaticGroup;
  private barrels!: Phaser.Physics.Arcade.StaticGroup;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private worldWidth!: number;

  constructor() {
    super({
      key: 'MainScene',
      physics: {
        arcade: {
          gravity: { y: 300, x: 0 },
          debug: false,
        },
      },
    });
  }

  create(): void {
    this.worldWidth = BARRELS_START_X + BARRELS_AMOUNT * BARREL_WIDTH + BOARD_W;

    setupWorldAndCamera(this, this.worldWidth);
    createBackground(this, this.worldWidth);
    this.blocks = createBoards(this, this.worldWidth);
    this.player = createPlayer(this, this.blocks);
    this.chicken = createChicken(this, this.worldWidth);
    this.cursors = setupInput(this);
    this.barrels = createBarrels(this);
  }

  update(): void {
    if (this.cursors.up?.isDown && this.player.body?.touching.down) {
      this.player.setVelocityY(-400);
    }
  }

  destroy(): void {}
}
