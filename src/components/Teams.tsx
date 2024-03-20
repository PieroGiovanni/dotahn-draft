import { cn } from "../lib/utils";
import { useTeamsStore } from "../store/teamStore";
import { RoleIcons } from "./RoleIcons";

interface TeamsProps {}

export const Teams = ({}: TeamsProps) => {
  const { teams, pickingTeamId } = useTeamsStore();

  const tl = teams.length;

  return (
    teams && (
      <>
        <div
          className={cn("grid p-4 w-full items-center place-items-center", {
            "grid-cols-2": tl <= 4,
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
                  className={cn(
                    "text-center  rounded-xl border-[4px] h-[214px] w-full relative max-w-[500px]  bg-black/70 transition-all",
                    {
                      "team bg-black border-0": team.id === pickingTeamId,
                      "scale-[1.5] border-double border-[6px] border-red-950":
                        pickingTeamId === 0 && tl < 5,
                      "scale-[1.23] border-double border-[6px] border-red-950":
                        pickingTeamId === 0 && tl === 5,
                      "scale-[1.2] border-double border-[6px] border-red-950":
                        pickingTeamId === 0 && tl > 5,
                    },
                    {
                      "col-start-3":
                        tl === 5 && (team.id === 2 || team.id === 5),
                      "col-start-2": tl === 5 && team.id === 3,
                      "col-start-1": tl === 5 && team.id === 4,
                    }
                  )}
                >
                  <div>
                    <h2 className="font-bold text-center text-3xl">
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
                      <tbody>
                        {team?.players.map((p, index) => (
                          <tr className="text-2xl" key={p.id}>
                            <td className="text-xs text-justify">
                              {index + 1}
                            </td>
                            <td className="text-left text-2xl">{p.nick}</td>
                            <td>
                              <RoleIcons className="size-5" player={p} />
                            </td>
                            <td className="text-xl">{p.mmr}</td>
                          </tr>
                        ))}
                      </tbody>
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
