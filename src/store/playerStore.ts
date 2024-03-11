import { create } from "zustand";

interface PlayersState {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  removeCaptainsFromPlayersList: (captains: Player[]) => void;
  removePlayerFromPlayerList: (player: Player) => void;
}

export const usePlayerStore = create<PlayersState>()((set) => ({
  players: [],
  setPlayers: (players: Player[]) => set({ players }),
  removeCaptainsFromPlayersList: (captains: Player[]) =>
    set((state) => ({
      players: state.players.filter((player) => !captains.includes(player)),
    })),

  removePlayerFromPlayerList: (player: Player) =>
    set((state) => ({
      players: state.players.filter((p) => p !== player),
    })),
}));
