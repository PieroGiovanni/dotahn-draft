import { cn } from "../lib/utils";
import { useTeamsStore } from "../store/teamStore";

interface TeamsProps {}

export const Teams = ({}: TeamsProps) => {
  const { teams, pickingTeamId } = useTeamsStore();

  const tl = teams.length;

  return (
    teams && (
      <div
        className={cn("grid p-4 gap-5 w-full items-center", {
          "grid-cols-2": tl > 2 && tl <= 4,
          "grid-cols-3": tl > 4 && tl <= 6,
          "grid-cols-4": tl > 6,
        })}
      >
        {teams
          .sort((a, b) => a.id - b.id)
          .map((team) => {
            return (
              <div
                key={team.id}
                className={cn("text-center border-2 min-h-40", {
                  "outline outline-8": team.id === pickingTeamId,
                })}
              >
                Team {team.players[0].nick} - average MMR:
                {getTeamAverageMMR(team)}
                <ul>
                  {team?.players.map((p) => (
                    <li key={p.id}>
                      {p.nick} {p.mmr}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
      </div>
    )
  );
};
const getTeamAverageMMR = (team: Team) =>
  Math.round(
    team.players.reduce((sum, player) => sum + player.mmr, 0) /
      team.players.length
  );
