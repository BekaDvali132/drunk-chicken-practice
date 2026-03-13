import Phaser from "phaser";
import { DESIGN_HEIGHT } from "../../../../../utils/constants.ts";
import { BOARD_W } from "./createBoards.ts";

export default function createPlayer(
  scene: Phaser.Scene,
  blocks: Phaser.Physics.Arcade.StaticGroup
): Phaser.Physics.Arcade.Sprite {
  const roosterTex = scene.textures.get("rooster").getSourceImage() as HTMLImageElement;
  const displayWidth = BOARD_W / 2;
  const displayHeight = roosterTex.height * (displayWidth / roosterTex.width);

  const player = scene.physics.add.sprite(
    BOARD_W / 2,
    DESIGN_HEIGHT / 2 - displayHeight / 2,
    "rooster"
  );
  player.setDisplaySize(displayWidth, displayHeight);
  player.setOrigin(0.5, 0.5);
  player.setCollideWorldBounds(true);

  scene.physics.add.collider(player, blocks);

  return player;
}