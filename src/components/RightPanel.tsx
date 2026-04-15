import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

interface RightPanelProps {
  setStatusMessage: (msg: string) => void;
}

export default function RightPanel({ setStatusMessage }: RightPanelProps) {
  const [duckingActive, setDuckingActive] = useState(false);

  const testToggleMic = async () => {
    try {
      const newState = !duckingActive;
      setDuckingActive(newState);
      await invoke("toggle_mic", { active: newState });
      setStatusMessage(`Microphone Ducking is now ${newState ? "ACTIVE (-15dB)" : "INACTIVE (0dB)"}`);
    } catch (e) {
      setStatusMessage(`Mic Error: ${e}`);
    }
  };

  return (
    <aside className="w-1/4 bg-neutral-800 border-l border-neutral-700 p-4 flex flex-col gap-4">
      <h2 className="text-md font-semibold text-neutral-300 uppercase tracking-widest">Controllo Live</h2>
      
      <div className="flex-1 flex flex-col gap-4 justify-start mt-4">
        {/* DJ MIC BUTTON */}
        <button 
          onClick={testToggleMic}
          className={`flex-none px-6 py-8 rounded font-black text-xl tracking-wider transition-all shadow-md active:scale-95 ${
            duckingActive 
              ? "bg-red-600 hover:bg-red-500 shadow-red-900/50 animate-pulse text-white outline outline-4 outline-red-500/30" 
              : "bg-neutral-700 hover:bg-neutral-600 text-neutral-300"
          }`}
        >
          {duckingActive ? "🔴 DJ MIC LIVE" : "DJ MIC (PFL)"}
        </button>

        {/* METERING FAKE DISPLAY */}
        <div className="mt-8 p-4 bg-neutral-900 border border-neutral-700 rounded flex gap-2 h-48 justify-center items-end">
          {/* L Channel */}
          <div className="w-4 bg-neutral-800 h-full rounded-sm overflow-hidden flex flex-col justify-end">
            <div className={`w-full transition-all duration-75 ${duckingActive ? "h-1/4 bg-green-800" : "h-3/4 bg-green-500"}`}></div>
          </div>
          {/* R Channel */}
          <div className="w-4 bg-neutral-800 h-full rounded-sm overflow-hidden flex flex-col justify-end">
            <div className={`w-full transition-all duration-75 ${duckingActive ? "h-[22%] bg-green-800" : "h-[72%] bg-green-500"}`}></div>
          </div>
        </div>
        <div className="text-center text-xs text-neutral-500 font-mono mt-1">MASTER OUT</div>

      </div>
    </aside>
  );
}
