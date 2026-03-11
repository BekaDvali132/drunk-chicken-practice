import PhaserGameRender from "./components/game/PhaserGameRender.tsx";
import createGame from "./components/game/createGame.ts";
import { useGameStore } from "./store/gameStore.ts";

function App() {
  const score = useGameStore((state) => state.score);

  return (
    <div className="flex h-screen w-screen flex-col bg-gray-900">
      {/* Header / UI overlay */}
      <header className="flex items-center justify-between bg-gray-800 px-6 py-3 text-white">
        <h1 className="text-xl font-bold">My Phaser Game</h1>
        <span className="text-sm">Score: {score}</span>
      </header>

      {/* Phaser canvas */}
      <main className="flex-1">
        <PhaserGameRender gameFactory={createGame} />
      </main>
    </div>
  );
}

export default App;
