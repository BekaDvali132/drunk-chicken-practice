import { useEffect, useRef } from "react";

interface Props {
  gameFactory: (config: { parent: string }) => Phaser.Game;
}

function PhaserGameRender({ gameFactory }: Props) {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const game = gameFactory({
      parent: "phaser-container",
    });

    gameRef.current = game;

    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
  }, [gameFactory]);

  return (
    <div id="phaser-container" className="h-full w-full overflow-hidden" />
  );
}

export default PhaserGameRender;
