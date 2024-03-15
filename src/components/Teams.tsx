import { cn } from "../lib/utils";
import { useTeamsStore } from "../store/teamStore";
import { Counter } from "./Counter";
import { RoleIcons } from "./RoleIcons";

interface TeamsProps {}

export const Teams = ({}: TeamsProps) => {
  const { teams, pickingTeamId } = useTeamsStore();

  const tl = teams.length;

  return (
    teams && (
      <>
        {/* <Counter /> */}
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
                    "text-center  rounded-xl border-[4px] min-h-40 w-full relative max-w-[500px] bg-black/70 transition-all",
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

                  <div className="flex items-center justify-center">
                    <table className="border-separate border-spacing-x-3">
                      {team?.players.map((p, index) => (
                        <tr className="text-xl" key={p.id}>
                          <td className="text-xs text-justify">{index + 1}</td>
                          <td className="text-left">{p.nick}</td>
                          <td>
                            <RoleIcons className="size-5" player={p} />
                          </td>
                          <td className="text-xl">{p.mmr}</td>
                        </tr>
                      ))}
                    </table>
                  </div>
                </div>
              );
            })}
        </div>
      </>
    )
  );
};
const getTeamAverageMMR = (team: Team) =>
  Math.round(
    team.players.reduce((sum, player) => sum + player.mmr, 0) /
      team.players.length
  );
