import { useState } from "react";
import { PlayerPoolTable } from "./components/PlayerPoolTable";
import { SelectCaptainTable } from "./components/SelectCaptainTable";
import { Teams } from "./components/Teams";

function App() {
  const [areCaptainsSelected, setAreCaptainsSelected] =
    useState<boolean>(false);

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
          <div className="flex flex-1 p-7">
            <Teams />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
