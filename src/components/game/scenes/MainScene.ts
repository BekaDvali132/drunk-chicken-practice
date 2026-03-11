export const VIRTUAL_WIDTH = 800;
export const VIRTUAL_HEIGHT = 600;

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  create() {
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;

    this.add
      .text(centerX, centerY, "Phaser + React + Zustand", {
        fontSize: "32px",
        color: "#ffffff",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    this.add
      .text(centerX, centerY + 50, "Replace this scene with your game logic", {
        fontSize: "18px",
        color: "#aaaaaa",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    // Sync camera zoom on resize
    this.scale.on("resize", this.handleResize, this);
    this.handleResize();
  }

  handleResize() {
    const cam = this.cameras.main;
    const zoomX = this.scale.width / VIRTUAL_WIDTH;
    const zoomY = this.scale.height / VIRTUAL_HEIGHT;
    cam.setZoom(Math.min(zoomX, zoomY));
    cam.centerOn(VIRTUAL_WIDTH / 2, VIRTUAL_HEIGHT / 2);
  }

  update() {
    // Game loop — add your per-frame logic here
  }

  destroy() {
    this.scale.off("resize", this.handleResize, this);
  }
}
