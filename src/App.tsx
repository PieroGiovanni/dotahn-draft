import { useEffect, useState } from "react";
import { Players } from "./data";
import { SelectCaptainTable } from "./components/SelectCaptainTable";
import { PlayerPoolTable } from "./components/PlayerPoolTable";
import { Teams } from "./components/Teams";
import { useTeamsStore } from "./store/teamStore";

function App() {
  const [playersToDraft, setPlayersToDraft] = useState<Player[]>([]);
  const [captains, setCaptains] = useState<Player[]>([]);
  const [areCaptainsSelected, setAreCaptainsSelected] =
    useState<boolean>(false);
  // const [teams, setTeams] = useState<Team[]>([]);
  const { teams, setTeamsCaptains } = useTeamsStore();

  const selectCaptains = (captains: Player[]) => {
    const sortedCaptains = captains.sort((a, b) => a.mmr - b.mmr);
    setCaptains(sortedCaptains);
    setTeamsCaptains(sortedCaptains);
    setAreCaptainsSelected(true);
    setPlayersToDraft(Players.filter((player) => !captains.includes(player)));
  };

  // useEffect(() => {
  //   setTeams(captains);
  // }, [captains]);

  // useEffect(() => {
  //   console.log("teams", teams);
  // }, [teams]);

  return (
    <div className="h-screen flex flex-col items-center">
      <h1 className="text-center h-[10%] text-5xl">Spring HN Major</h1>

      {!areCaptainsSelected ? (
        <div className="flex h-[90%] w-auto justify-center flex-col">
          <SelectCaptainTable
            players={Players}
            selectCaptains={selectCaptains}
          />
        </div>
      ) : (
        <div className="flex h-[90%] w-full">
          <div className="border-2 overflow-y-auto">
            <PlayerPoolTable
              players={playersToDraft}
              // setTeams={setTeams}
              // teams={teams}
            />
          </div>
          <div className="flex flex-1 bg-yellow-500">
            <Teams captains={captains} teams={teams} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
