import { gameEvents } from "../../../../utils/gameEvents.ts";
import { GameEventsEnum } from "../../../../utils/enums/gameEvents.enum.ts";

export class BootScene extends Phaser.Scene {
  private progressBox?: Phaser.GameObjects.Graphics;
  private progressBar?: Phaser.GameObjects.Graphics;
  private loadingText?: Phaser.GameObjects.Text;
  private percentText?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    const width = this.scale.width;
    const height = this.scale.height;

    // Loading UI
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    this.progressBar = this.add.graphics();

    this.loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: { font: "24px Arial", color: "#ffffff" },
    });
    this.loadingText.setOrigin(0.5, 0.5);

    this.percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: "0%",
      style: { font: "20px Arial", color: "#ffffff" },
    });
    this.percentText.setOrigin(0.5, 0.5);

    this.load.on("progress", (value: number) => {
      const w = this.scale.width;
      const h = this.scale.height;
      this.percentText?.setText(Math.floor(value * 100) + "%");
      this.progressBar?.clear();
      this.progressBar?.fillStyle(0x4caf50, 1);
      this.progressBar?.fillRect(w / 2 - 150, h / 2 - 15, 300 * value, 30);
    });

    this.load.on("complete", () => {
      this.progressBar?.destroy();
      this.progressBox?.destroy();
      this.loadingText?.destroy();
      this.percentText?.destroy();
    });

    this.load.image('worldBackground', '/images/worldBackground.webp');
    this.load.image('jumpingBoard', '/images/jumpingBoard.webp');
    this.load.image('chicken', '/images/chicken.webp');
    this.load.image('rooster', '/images/rooster.webp');
  }

  create() {
    gameEvents.emit(GameEventsEnum.GAME_LOADED);

    // Transition to the main game scene
    this.scene.start("MainScene");
  }
}
