import Phaser from 'phaser';

export default function setupInput(scene: Phaser.Scene): Phaser.Types.Input.Keyboard.CursorKeys {
  const cursors = scene.input.keyboard!.createCursorKeys();

  scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
    if (pointer.isDown) {
      scene.cameras.main.scrollX -= pointer.x - pointer.prevPosition.x;
    }
  });

  return cursors;
}
