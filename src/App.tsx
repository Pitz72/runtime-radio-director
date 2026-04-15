import { useState } from "react";
import "./App.css";

import LeftPanel from "./components/LeftPanel";
import CenterPanel from "./components/CenterPanel";
import RightPanel from "./components/RightPanel";

function App() {
  const [statusMessage, setStatusMessage] = useState("System Ready.");

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-white font-sans overflow-hidden pattern-dots">
      {/* HEADER */}
      <header className="bg-neutral-900 p-4 border-b border-neutral-800 flex justify-between items-center shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 tracking-tight">
            RUNTIME RADIO DIRECTOR
          </h1>
        </div>
        <div className="bg-neutral-800 border border-neutral-700 px-4 py-1.5 rounded-full flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
          <p className="text-sm font-mono text-cyan-400">{statusMessage}</p>
        </div>
      </header>

      {/* WORKSPACE */}
      <main className="flex flex-1 overflow-hidden">
        <LeftPanel />
        <CenterPanel setStatusMessage={setStatusMessage} />
        <RightPanel setStatusMessage={setStatusMessage} />
      </main>
    </div>
  );
}

export default App;
