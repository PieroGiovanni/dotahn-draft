import { useEffect, useState } from "react";
import { PlayerPoolTable } from "./components/PlayerPoolTable";
import { SelectCaptainTable } from "./components/SelectCaptainTable";
import { Teams } from "./components/Teams";
import { useRoundStore } from "./store/roundStore";
import { useTeamsStore } from "./store/teamStore";

function App() {
  const [areCaptainsSelected, setAreCaptainsSelected] =
    useState<boolean>(false);

  const { round } = useRoundStore();
  const { setPickingTeamId } = useTeamsStore();

  useEffect(() => {
    if (round > 4) {
      setPickingTeamId(0);
    }
  }, [round]);

  return (
    <div className="h-screen flex flex-col items-center font-sans">
      <h1 className="text-center items-center flex h-[10%] text-8xl">
        Spring HN Major
      </h1>
      <video
        className="absolute -z-10 w-full h-full "
        src="/src/assets/videos/aegis_loop.webm"
        loop
        autoPlay
        muted
      ></video>

      {!areCaptainsSelected ? (
        <div className="flex h-[90%] w-auto justify-center flex-col gap-y-3 items-center py-4">
          <SelectCaptainTable setAreCaptainsSelected={setAreCaptainsSelected} />
        </div>
      ) : (
        <div className="flex h-[90%] w-full pb-4">
          {round < 5 && (
            <div className="border-2 w-[23%] overflow-y-auto bg-black/50 transition-all rounded-xl">
              <PlayerPoolTable />
            </div>
          )}
          <div className="flex flex-1 px-10 relative transition-transform">
            <Teams />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
