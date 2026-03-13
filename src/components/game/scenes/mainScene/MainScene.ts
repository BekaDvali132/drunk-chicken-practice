import Phaser from 'phaser';
import { BARRELS_START_X, BARRELS_AMOUNT, BARREL_WIDTH, DESIGN_HEIGHT } from '@utils/constants.ts';
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
  private snapped = false;

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
    this.barrels = createBarrels(this);
    this.blocks = createBoards(this, this.worldWidth);
    this.player = createPlayer(this, this.blocks, this.barrels);
    this.chicken = createChicken(this, this.worldWidth);
    this.cursors = setupInput(this);
  }

  update(): void {
    const body = this.player.body as Phaser.Physics.Arcade.Body;

    if (this.cursors.up?.isDown && body.touching.down) {
      this.player.setVelocityY(-300);
      this.player.setVelocityX(118);
      this.snapped = false;
    } else if (body.touching.down) {
      this.player.setVelocityX(0);
    }

    // Snap to barrel center when grounded and horizontal movement has stopped
    if (body.touching.down && Math.abs(body.velocity.x) < 5) {
      const x = this.player.x;
      const inBarrelsRange =
        x >= BARRELS_START_X && x <= BARRELS_START_X + BARRELS_AMOUNT * BARREL_WIDTH;
      if (inBarrelsRange) {
        if (!this.snapped) {
          this.snapped = true;
          const zoom = this.cameras.main.zoom;
          const viewportWorldWidth = this.cameras.main.width / zoom;
          const targetCenterX = this.player.x - 222 / zoom + viewportWorldWidth / 2;
          this.cameras.main.pan(targetCenterX, DESIGN_HEIGHT / 2, 300, 'Sine.easeOut');
        }
      }
    }
  }

  destroy(): void {}
}
