import { useState } from "react";
import { PlayerPoolTable } from "./components/PlayerPoolTable";
import { SelectCaptainTable } from "./components/SelectCaptainTable";
import { Teams } from "./components/Teams";

function App() {
  const [areCaptainsSelected, setAreCaptainsSelected] =
    useState<boolean>(false);

  return (
    <div className="h-screen flex flex-col items-center bg-cover bg-center bg-[url('/src/assets/images/background3.webp')]">
      <h1 className="text-center h-[10%] text-5xl">Spring HN Major</h1>

      {!areCaptainsSelected ? (
        <div className="flex h-[80%] w-auto justify-center flex-col">
          <SelectCaptainTable setAreCaptainsSelected={setAreCaptainsSelected} />
        </div>
      ) : (
        <div className="flex h-[80%] w-full">
          <div className="border-2 w-[30%] overflow-y-auto">
            <PlayerPoolTable />
          </div>
          <div className="flex flex-1 px-10">
            <Teams />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
