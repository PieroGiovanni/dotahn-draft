import { useState } from "react";
import { PlayerPoolTable } from "./components/PlayerPoolTable";
import { SelectCaptainTable } from "./components/SelectCaptainTable";
import { Teams } from "./components/Teams";
import { Counter } from "./components/Counter";

function App() {
  const [areCaptainsSelected, setAreCaptainsSelected] =
    useState<boolean>(false);

  return (
    <div className="h-screen flex flex-col items-center">
      {/* <Counter /> */}
      <h1 className="text-center h-[10%] text-5xl">Spring HN Major</h1>
      <video
        className="absolute -z-10 w-full h-full "
        src="/src/assets/videos/aegis_loop.webm"
        loop
        autoPlay
        muted
      ></video>

      {!areCaptainsSelected ? (
        <div className="flex h-[85%] w-auto justify-center flex-col gap-y-3 items-center">
          <SelectCaptainTable setAreCaptainsSelected={setAreCaptainsSelected} />
        </div>
      ) : (
        <div className="flex h-[85%] w-full">
          <div className="border-2 w-[23%] overflow-y-auto bg-black/50">
            <PlayerPoolTable />
          </div>
          <div className="flex flex-1 px-10 relative">
            <Teams />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
