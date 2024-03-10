import { create } from "zustand";

interface PlayersState {
  players: Player[];
}

export const useTeamsStore = create<PlayersState>()((set) => ({
  players: [],
}));
