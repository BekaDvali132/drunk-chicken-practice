import { create } from "zustand";

interface GameStore {
  score: number;
  isPlaying: boolean;
  setScore: (score: number) => void;
  incrementScore: (amount: number) => void;
  setIsPlaying: (playing: boolean) => void;
  reset: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  score: 0,
  isPlaying: false,
  setScore: (score) => set({ score }),
  incrementScore: (amount) => set((state) => ({ score: state.score + amount })),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  reset: () => set({ score: 0, isPlaying: false }),
}));
