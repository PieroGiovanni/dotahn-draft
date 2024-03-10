import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface SelectCaptainTable {
  players: Player[];
  selectCaptains: (captains: Player[]) => void;
}

export const SelectCaptainTable = ({
  players,
  selectCaptains,
}: SelectCaptainTable) => {
  const [captains, setCaptains] = useState<Player[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setCaptains([...captains, players.find((p) => p.id === Number(value))!]);
    } else {
      setCaptains(captains.filter((c) => c.id !== Number(value)));
    }
  };

  const saveCaptains = () => {
    if (captains.length > 1) selectCaptains(captains);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nickname</TableHead>
            <TableHead>MMR</TableHead>
            <TableHead>Capitán</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players
            .sort((a, b) => b.mmr - a.mmr)
            .map((player) => (
              <TableRow key={player.id}>
                <TableCell className="font-medium">{player.nick}</TableCell>
                <TableCell>{player.mmr}</TableCell>
                <TableCell>
                  <input
                    className="size-5"
                    type="checkbox"
                    id="id"
                    name="isCaptain"
                    value={player.id}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <button onClick={saveCaptains} className="border border-white">
        Seleccionar Capitanes
      </button>
    </>
  );
};
