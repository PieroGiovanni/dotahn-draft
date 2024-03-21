import { useState } from "react";
import { usePlayerStore } from "../store/playerStore";
import { useTeamsStore } from "../store/teamStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface SelectCaptainTable {
  setAreCaptainsSelected: (boolean: boolean) => void;
}

export const SelectCaptainTable = ({
  setAreCaptainsSelected,
}: SelectCaptainTable) => {
  const [captains, setCaptains] = useState<Player[]>([]);

  const { players, removeCaptainsFromPlayersList } = usePlayerStore();
  const { setTeamsCaptains } = useTeamsStore();

  const selectCaptains = () => {
    const sortedCaptains = captains.sort((a, b) => a.mmr - b.mmr);
    setTeamsCaptains(sortedCaptains);
    setAreCaptainsSelected(true);
    removeCaptainsFromPlayersList(captains);
  };

  const updateCheckStatus = (index: number) => {
    const player = players[index];
    if (captains.includes(player)) {
      setCaptains(captains.filter((c) => c !== player));
    } else {
      setCaptains([...captains, player]);
    }
  };

  return (
    <>
      <Table className="rounded-2xl bg-black/50">
        <TableHeader>
          <TableRow className="text-xl">
            <TableHead className="text-white text-center">NICKNAME</TableHead>
            <TableHead className="text-white text-center">MMR</TableHead>
            <TableHead className="text-white text-center">CAPITÁN</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-center text-2xl">
          {players
            .sort((a, b) => b.mmr - a.mmr)
            .map((player, index) => (
              <TableRow
                className="hover:cursor-pointer"
                key={player.id}
                onClick={() => updateCheckStatus(index)}
              >
                <TableCell className="font-medium">{player.nick}</TableCell>
                <TableCell>{player.mmr}</TableCell>
                <TableCell>
                  <input
                    className="size-7 accent-lime-700"
                    type="checkbox"
                    id={`checkbox-${index}`}
                    checked={captains.includes(player)}
                    onChange={() => updateCheckStatus(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <button
        hidden={captains.length < 2}
        onClick={selectCaptains}
        className="border-[1px] border-white rounded-xl bg-lime-700 w-[70%] h-20 text-2xl hover:contrast-150"
      >
        Seleccionar Capitanes
      </button>
    </>
  );
};

export const Checkbox = ({
  isChecked,
  checkHandler,
  index,
}: {
  isChecked: boolean;
  checkHandler: () => void;
  index: number;
}) => {
  return (
    <div>
      <input
        className="size-5"
        type="checkbox"
        id={`checkbox-${index}`}
        checked={isChecked}
        onChange={checkHandler}
      />
    </div>
  );
};
