import Phaser from "phaser";

export const VIRTUAL_WIDTH = 800;
export const VIRTUAL_HEIGHT = 600;

export class MainScene extends Phaser.Scene {

  private player!: Phaser.Physics.Arcade.Sprite;
  private blocks!: Phaser.Physics.Arcade.StaticGroup;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ 
      key: "MainScene",
      physics: {
        arcade: {
          gravity: { y: 300, x: 0 },
          debug: false
        }
      }
    });
  }

  create(): void {

    const blockWidth = 120;
    const blockHeight = 40;
    const blockCount = 25;

    const worldWidth = blockWidth * blockCount;

    this.physics.world.setBounds(0, 0, worldWidth, VIRTUAL_HEIGHT);
    this.cameras.main.setBounds(0, 0, worldWidth, VIRTUAL_HEIGHT);

    this.blocks = this.physics.add.staticGroup();

    for (let i = 0; i < blockCount; i++) {
      const x = i * blockWidth + blockWidth / 2;
      const y = 450;

      const block = this.add.rectangle(x, y, blockWidth - 10, blockHeight, 0x00aa00);
      this.physics.add.existing(block, true);

      this.blocks.add(block);
    }

    this.player = this.physics.add.sprite(100, 300, "");
    this.player.setSize(40, 60);
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.blocks);

    if (this?.input?.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    this.input.on(
        "pointermove",
        (pointer: Phaser.Input.Pointer) => {
          if (pointer.isDown) {
            this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x);
          }
        }
    );
  }

  update(): void {
    if (this.cursors.up?.isDown && this.player.body?.touching.down) {
      this.player.setVelocityY(-400);
    }
  }

  destroy(): void {}
}