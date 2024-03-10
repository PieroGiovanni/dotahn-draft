import { create } from "zustand";

interface TeamsState {
  teams: Team[];
  setTeamsCaptains: (captains: Player[]) => void;
  setTeams: (teams: Team[]) => void;
}

export const useTeamsStore = create<TeamsState>()((set) => ({
  teams: [],
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
