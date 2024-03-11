import { create } from "zustand";

interface TeamsState {
  teams: Team[];
  setTeamsCaptains: (captains: Player[]) => void;
  setTeams: (teams: Team[]) => void;
  pickingTeamId: number;
  setPickingTeamId: (id: number) => void;
}

export const useTeamsStore = create<TeamsState>()((set) => ({
  teams: [],
  pickingTeamId: 1,
  setPickingTeamId: (pickingTeamId: number) => set({ pickingTeamId }),
  setTeamsCaptains: (captains: Player[]) => {
    set({
      teams: captains.map((captain, index) => ({
        id: index + 1,
        players: [captain],
      })),
    });
  },
  setTeams: (teams: Team[]) => set({ teams }),
}));
