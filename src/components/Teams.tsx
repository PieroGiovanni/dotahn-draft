import { cn } from "../lib/utils";

interface TeamsProps {
  captains: Player[];
  teams: {
    players: Player[];
    id: number;
  }[];
}

export const Teams = ({ captains, teams }: TeamsProps) => {
  const cl = captains.length;

  return (
    captains &&
    teams && (
      <div
        className={cn("grid p-4 gap-5 w-full items-center", {
          "grid-cols-2": cl > 2 && cl <= 4,
          "grid-cols-3": cl > 4 && cl <= 6,
          "grid-cols-4": cl > 6,
        })}
      >
        {captains.map((captain) => {
          const team = teams.find((t) => t.players.find((c) => c === captain));
          return (
            <div key={captain.id} className="text-center border-2 min-h-40">
              Team {captain.nick}
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
