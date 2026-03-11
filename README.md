# Vite + React + Phaser 3 + Zustand + Tailwind CSS

A project template for building browser games with **Phaser 3** embedded in a **React** UI, powered by **Vite**, **Zustand** for state management, and **Tailwind CSS** for styling.

## Tech Stack

| Technology     | Purpose                          |
| -------------- | -------------------------------- |
| Vite           | Build tool & dev server          |
| React 19       | UI layer                         |
| Phaser 3       | Game engine (Matter.js physics)  |
| Zustand        | Global state management          |
| Tailwind CSS 4 | Utility-first CSS                |
| TypeScript     | Type safety                      |

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   └── game/
│       ├── PhaserGameRender.tsx   # React ↔ Phaser bridge component
│       ├── createGame.ts          # Phaser.Game factory (canvas, DPR, resize)
│       └── scenes/
│           ├── BootScene.ts       # Asset loading & progress bar
│           └── MainScene.ts       # Main game scene (replace with your game)
├── store/
│   └── gameStore.ts               # Zustand store (game state)
├── utils/
│   ├── gameEvents.ts              # Custom event emitter (React ↔ Phaser comms)
│   └── enums/
│       └── gameEvents.enum.ts     # Event name constants
├── styles/
│   └── index.css                  # Tailwind imports & base styles
├── App.tsx                        # Root component
└── main.tsx                       # Entry point
```

## Architecture

### React ↔ Phaser Communication

- **React → Phaser**: Use `gameEvents.emit(event, data)` to send commands to game scenes.
- **Phaser → React**: Use `gameEvents.emit(event, data)` from scenes, and listen with `gameEvents.on()` in React components or update Zustand store directly.

### Adding a New Scene

1. Create a new file in `src/components/game/scenes/`
2. Extend `Phaser.Scene` with a unique key
3. Add it to the `scene` array in `createGame.ts`

### Adding Game Assets

Place assets in `public/` and load them in `BootScene.ts`:

```ts
this.load.image('player', '/assets/player.png');
```

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start dev server         |
| `npm run build` | Type-check & build       |
| `npm run lint`  | Run ESLint               |
| `npm run preview` | Preview production build |
