import { useEffect, useState } from "react";
import { Players } from "./data";
import { SelectCaptainTable } from "./components/SelectCaptainTable";
import { PlayerPoolTable } from "./components/PlayerPoolTable";
import { Teams } from "./components/Teams";
import { usePlayerStore } from "./store/playerStore";

function App() {
  const [areCaptainsSelected, setAreCaptainsSelected] =
    useState<boolean>(false);

  const { setPlayers } = usePlayerStore();

  useEffect(() => {
    setPlayers(Players);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen flex flex-col items-center">
      <h1 className="text-center h-[10%] text-5xl">Spring HN Major</h1>

      {!areCaptainsSelected ? (
        <div className="flex h-[90%] w-auto justify-center flex-col">
          <SelectCaptainTable setAreCaptainsSelected={setAreCaptainsSelected} />
        </div>
      ) : (
        <div className="flex h-[90%] w-full">
          <div className="border-2 w-[30%] overflow-y-auto">
            <PlayerPoolTable />
          </div>
          <div className="flex flex-1 bg-yellow-500">
            <Teams />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
