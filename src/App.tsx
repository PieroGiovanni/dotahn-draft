import { useEffect, useState } from "react";
import { PlayerPoolTable } from "./components/PlayerPoolTable";
import { SelectCaptainTable } from "./components/SelectCaptainTable";
import { Teams } from "./components/Teams";
import { useRoundStore } from "./store/roundStore";
import { useTeamsStore } from "./store/teamStore";
import backgroundVideo from "./assets/videos/drafthn.webm";

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
      <div className="fixed bottom-0 right-0">
        <h1>
          Designed by <strong className="text-xl">TosH</strong>
        </h1>
      </div>

      <div className="pt-4 flex h-[10%] italic relative">
        <p className="pt-3 text-4xl">The</p>
        <h1 className="text-center text-8xl">Spring HN Major</h1>
      </div>
      <video
        className="absolute -z-10 w-full h-full "
        src={backgroundVideo}
        loop
        autoPlay
        muted
      ></video>

      {!areCaptainsSelected ? (
        <div className="flex h-[90%] w-auto justify-center flex-col gap-y-3 items-center py-6">
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
