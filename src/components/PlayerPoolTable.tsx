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
import { RoleIcons } from "./RoleIcons";

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
        console.log("2");
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
              <TableHead className="text-lg text-center">NOMBRE</TableHead>
              <TableHead className="text-lg text-center">MMR</TableHead>
              <TableHead className="text-lg text-center">POSICIÓN</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-2xl text-center">
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
                  <TableCell>
                    <RoleIcons className="size-5" player={player} />
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
