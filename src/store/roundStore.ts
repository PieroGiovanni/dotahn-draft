import { create } from "zustand";

interface roundState {
  round: number;
  turn: number;
  setNextRound: (round: number) => void;
  setNextTurn: (turn: number) => void;
  setTurn: (turn: number) => void;
}

export const useRoundStore = create<roundState>()((set) => ({
  round: 1,
  turn: 1,
  setNextRound: (round) => set({ round: round + 1 }),
  setNextTurn: (turn: number) => set({ turn: turn + 1 }),
  setTurn: (turn: number) => set({ turn }),
}));
