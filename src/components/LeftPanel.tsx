import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Track } from "../types";

export default function LeftPanel() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchTracks() {
    try {
      setLoading(true);
      const data: Track[] = await invoke("get_tracks");
      setTracks(data);
    } catch (e) {
      console.error("Failed to fetch tracks:", e);
    } finally {
      setLoading(false);
    }
  }

  const handleMockData = async () => {
    try {
      setLoading(true);
      await invoke("insert_mock_tracks");
      await fetchTracks();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, track: Track) => {
    e.dataTransfer.setData("application/json", JSON.stringify(track));
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <aside className="w-1/4 bg-neutral-800 border-r border-neutral-700 p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-md font-semibold text-neutral-300 uppercase tracking-widest">Libreria Media</h2>
        <button 
          onClick={fetchTracks}
          className="text-xs text-cyan-400 hover:text-cyan-300 px-2 py-1 rounded bg-neutral-700 hover:bg-neutral-600 transition"
        >
          Refresh
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
        {loading && <p className="text-neutral-500 text-sm">Caricamento libreria...</p>}
        {(!loading && tracks.length === 0) && (
          <div className="flex-1 border-2 border-dashed border-neutral-600/50 rounded flex flex-col items-center justify-center text-sm text-neutral-400 p-4 text-center gap-4">
            <p>Database vuoto.</p> 
            <button
               onClick={handleMockData}
               className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-neutral-900 font-bold text-xs rounded transition-colors"
            >
               INSERISCI DATI DI TEST
            </button>
          </div>
        )}
        
        {tracks.map(track => (
          <div 
            key={track.id}
            draggable
            onDragStart={(e) => handleDragStart(e, track)}
            className="p-3 bg-neutral-900 border border-neutral-700 rounded cursor-grab active:cursor-grabbing hover:border-orange-500 transition-colors select-none"
          >
            <div className="font-bold text-neutral-200 text-sm">{track.title}</div>
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>{track.artist}</span>
              <span>{Math.floor(track.duration_ms / 60000)}:{(Math.floor((track.duration_ms % 60000)/1000)).toString().padStart(2, '0')}</span>
            </div>
            <div className="mt-2 inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-neutral-800 text-cyan-500">
              {track.category}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
