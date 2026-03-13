import Phaser from 'phaser';
import { DESIGN_HEIGHT } from '@utils/constants.ts';

export function setupWorldAndCamera(scene: Phaser.Scene, worldWidth: number): void {
  scene.physics.world.setBounds(0, 0, worldWidth, DESIGN_HEIGHT);
  scene.cameras.main.setBounds(0, 0, worldWidth, DESIGN_HEIGHT);

  const zoom = scene.scale.height / DESIGN_HEIGHT;
  scene.cameras.main.setZoom(zoom);

  const viewportWorldWidth = scene.cameras.main.width / zoom;
  const midY = DESIGN_HEIGHT / 2;

  scene.cameras.main.centerOn(worldWidth - viewportWorldWidth / 2, midY);

  scene.time.delayedCall(2000, () => {
    scene.cameras.main.pan(viewportWorldWidth / 2, midY, 3000, 'Sine.easeInOut');
  });
}
