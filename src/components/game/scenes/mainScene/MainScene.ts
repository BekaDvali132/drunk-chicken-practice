import Phaser from 'phaser';
import { DESIGN_WIDTH } from '@utils/constants.ts';
import createBoards from '@scenes/mainScene/components/createBoards.ts';
import { setupWorldAndCamera } from '@scenes/mainScene/components/setupCamera.ts';
import createBackground from '@scenes/mainScene/components/createBackground.ts';
import createPlayer from '@scenes/mainScene/components/createPlayer.ts';
import createChicken from '@scenes/mainScene/components/createChicken.ts';
import setupInput from '@scenes/mainScene/components/setupInput.ts';

export class MainScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private chicken!: Phaser.GameObjects.Image;
  private blocks!: Phaser.Physics.Arcade.StaticGroup;
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
    const blockWidth = 120;
    const blockCount = Math.max(50, Math.ceil(DESIGN_WIDTH / blockWidth));
    this.worldWidth = blockWidth * blockCount;

    setupWorldAndCamera(this, this.worldWidth);
    createBackground(this, this.worldWidth);
    this.blocks = createBoards(this, this.worldWidth);
    this.player = createPlayer(this, this.blocks);
    this.chicken = createChicken(this, this.worldWidth);
    this.cursors = setupInput(this);
  }

  update(): void {
    if (this.cursors.up?.isDown && this.player.body?.touching.down) {
      this.player.setVelocityY(-400);
    }
  }

  destroy(): void {}
}
