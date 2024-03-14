import { useEffect } from "react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "./ui/table";
import { useTeamsStore } from "../store/teamStore";
import { usePlayerStore } from "../store/playerStore";
import { useRoundStore } from "../store/roundStore";
import { Rol } from "../data";

interface PlayerPoolTableProps {}

export const PlayerPoolTable = ({}: PlayerPoolTableProps) => {
  const { round, turn, setNextRound, setNextTurn, setTurn } = useRoundStore();

  const { teams, setTeams } = useTeamsStore();
  const { players, removePlayerFromPlayerList } = usePlayerStore();
  const { pickingTeamId, setPickingTeamId } = useTeamsStore();

  const selectPlayer = (player: Player) => {
    const updatedTeams = [...teams];
    updatedTeams.find((t) => t.id === pickingTeamId)!.players.push(player);
    setTeams(updatedTeams);
    removePlayerFromPlayerList(player);
    setNextTurn(turn);
  };

  useEffect(() => {
    if (teams.length && turn > teams.length) {
      setNextRound(round);
      setTurn(1);
    }
  }, [turn, teams.length]);

  useEffect(() => {
    const sortedTeams = sortTeamsByMMR(teams);
    for (let i = 0; i < teams.length; i++) {
      if (sortedTeams[i].players.length < round + 1) {
        setPickingTeamId(sortedTeams[i].id);
        break;
      }
    }
  }, [round, turn]);

  return (
    teams && (
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NOMBRE</TableHead>
              <TableHead>MMR</TableHead>
              <TableHead>POSICIÓN</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players
              .sort((a, b) => b.mmr - a.mmr)
              .map((player) => (
                <TableRow
                  key={player.id}
                  className="hover:cursor-pointer"
                  onClick={() => selectPlayer(player)}
                >
                  <TableCell className="font-medium">{player.nick}</TableCell>
                  <TableCell>{player.mmr}</TableCell>
                  <TableCell className="flex gap-3">
                    {player.roles?.map((rol) => {
                      let icon;
                      switch (rol) {
                        case Rol.SafeLane:
                          icon = "SafeLaneIcon.svg";
                          break;
                        case Rol.MidLane:
                          icon = "MidLaneIcon.svg";
                          break;
                        case Rol.OffLane:
                          icon = "OffLaneIcon.svg";
                          break;
                        case Rol.SoftSupport:
                          icon = "SoftSupportIcon.svg";
                          break;
                        case Rol.HardSupport:
                          icon = "HardSupportIcon.svg";
                          break;
                        default:
                          break;
                      }
                      return (
                        <img
                          key={`${player.id}-${rol}`}
                          className="size-5"
                          title={rol}
                          src={`/src/assets/icons/${icon}`}
                        />
                      );
                    })}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </>
    )
  );
};
const sortTeamsByMMR = (teams: Team[]) => {
  const sortedTeams = teams.sort((teamA, teamB) => {
    const sumMMRTeamA = teamA.players.reduce(
      (sum, player) => sum + player.mmr,
      0
    );
    const sumMMRTeamB = teamB.players.reduce(
      (sum, player) => sum + player.mmr,
      0
    );

    return sumMMRTeamA - sumMMRTeamB;
  });
  return sortedTeams;
};
