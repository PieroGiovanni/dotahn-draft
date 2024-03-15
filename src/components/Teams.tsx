import { cn } from "../lib/utils";
import { useTeamsStore } from "../store/teamStore";
import { RoleIcons } from "./RoleIcons";

interface TeamsProps {}

export const Teams = ({}: TeamsProps) => {
  const { teams, pickingTeamId } = useTeamsStore();

  const tl = teams.length;

  return (
    teams && (
      <div
        className={cn(
          "grid p-4 gap-10 w-full items-center justify-items-center",
          {
            "grid-cols-2": tl > 2 && tl <= 4,
            "grid-cols-3": tl > 4 && tl <= 6,
            "grid-cols-4": tl > 6,
          }
        )}
      >
        {teams
          .sort((a, b) => a.id - b.id)
          .map((team) => {
            return (
              <div
                key={team.id}
                className={cn(
                  "text-center  rounded-xl border-[0.5rem] min-h-40 w-full relative max-w-[500px] bg-black/70",
                  {
                    "team bg-black border-0": team.id === pickingTeamId,
                  }
                )}
              >
                <div>
                  <h2 className="font-bold text-center text-2xl">
                    Team {team.players[0].nick}
                  </h2>

                  <h3 className="absolute  right-1 top-0 text-xs">
                    AVG:
                    <strong className="text-sm">
                      {" "}
                      {getTeamAverageMMR(team)}
                    </strong>
                  </h3>
                </div>

                <ul>
                  {team?.players.map((p) => (
                    <li
                      className="flex text-center justify-center items-center gap-5 text-xl"
                      key={p.id}
                    >
                      <h3>{p.nick}</h3>
                      <RoleIcons className="size-5" player={p} />
                      <h3 className="text-xl">{p.mmr}</h3>
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
