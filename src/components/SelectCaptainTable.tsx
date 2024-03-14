import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useTeamsStore } from "../store/teamStore";
import { usePlayerStore } from "../store/playerStore";

interface SelectCaptainTable {
  setAreCaptainsSelected: (boolean: boolean) => void;
}

export const SelectCaptainTable = ({
  setAreCaptainsSelected,
}: SelectCaptainTable) => {
  const [captains, setCaptains] = useState<Player[]>([]);

  const { setTeamsCaptains } = useTeamsStore();
  const { players, removeCaptainsFromPlayersList } = usePlayerStore();

  const selectCaptains = () => {
    const sortedCaptains = captains.sort((a, b) => a.mmr - b.mmr);
    setTeamsCaptains(sortedCaptains);
    setAreCaptainsSelected(true);
    removeCaptainsFromPlayersList(captains);
  };

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setCaptains([...captains, players.find((p) => p.id === Number(value))!]);
    } else {
      setCaptains(captains.filter((c) => c.id !== Number(value)));
    }
  };

  const handleRowClick = (id: string) => {
    const checkbox = document.getElementById(id) as HTMLInputElement;
    checkbox.click();
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
              <TableRow
                className="hover:cursor-pointer"
                key={player.id}
                onClick={() => handleRowClick(player.id.toString())}
              >
                <TableCell className="font-medium">{player.nick}</TableCell>
                <TableCell>{player.mmr}</TableCell>
                <TableCell>
                  <input
                    className="size-5"
                    type="checkbox"
                    id={player.id.toString()}
                    name="isCaptain"
                    value={player.id}
                    onChange={handleCheckBoxChange}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {captains.length > 1 && (
        <button onClick={selectCaptains} className="border border-white">
          Seleccionar Capitanes
        </button>
      )}
    </>
  );
};
