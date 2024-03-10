import { useEffect, useState } from "react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "./ui/table";
import { useTeamsStore } from "../store/teamStore";

interface PlayerPoolTableProps {
  players: Player[];
}

export const PlayerPoolTable = ({ players }: PlayerPoolTableProps) => {
  const [turn, setTurn] = useState(1);
  const [round, setRound] = useState(1);
  const [teamId, setTeamId] = useState(1);
  const { teams, setTeams } = useTeamsStore();

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

  const selectPlayer = (player: Player) => {
    const updatedTeams = [...teams];
    updatedTeams.find((t) => t.id === teamId)!.players.push(player);
    setTeams(updatedTeams);
    const sortedTeams = sortTeamsByMMR(updatedTeams);
    setTeamId(sortedTeams[0].id);
    setTurn((turn) => turn + 1);
  };

  useEffect(() => {
    if (teams.length && turn > teams.length) {
      setRound((round) => round + 1);
      setTurn(1);
    }
  }, [turn, teams.length]);

  return (
    teams && (
      <>
        <div>
          round: {round}, TURN {turn}
        </div>
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
                  <TableCell>{player.rol}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </>
    )
  );
};
