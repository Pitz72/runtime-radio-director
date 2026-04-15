import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { QueuedTrack, Track } from "../types";

interface CenterPanelProps {
  setStatusMessage: (msg: string) => void;
}

export default function CenterPanel({ setStatusMessage }: CenterPanelProps) {
  const [queue, setQueue] = useState<QueuedTrack[]>([]);
  const [nowPlaying, setNowPlaying] = useState<QueuedTrack | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessario per permettere il drop
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (data) {
      const track: Track = JSON.parse(data);
      const queuedTrack: QueuedTrack = {
        queue_id: crypto.randomUUID(),
        track
      };
      setQueue(prev => [...prev, queuedTrack]);
      setStatusMessage(`Aggiunto alla coda: ${track.title}`);
    }
  };

  const removeFromQueue = (queueId: string) => {
    setQueue(prev => prev.filter(q => q.queue_id !== queueId));
  };

  const playNext = async () => {
    if (queue.length === 0) {
      setStatusMessage("Coda vuota. Impossibile riprodurre.");
      return;
    }

    const nextTrack = queue[0];
    try {
      setStatusMessage(`Caricamento: ${nextTrack.track.title}...`);
      
      // Chiamata al backend in Rust per far partire l'audio
      // NOTA: Richiede file system reale corrispondente al `file_path`.
      // Qui stiamo simulando assumendo che il Rust engine sia cablato a file veri.
      await invoke("play_audio", { path: "test.mp3" /* in produzione: nextTrack.track.file_path */ });
      
      setNowPlaying(nextTrack);
      setQueue(prev => prev.slice(1));
      setStatusMessage(`In onda: ${nextTrack.track.title}`);
    } catch (e) {
      setStatusMessage(`Errore di Riproduzione: ${e}`);
    }
  };

  return (
    <section className="flex-1 bg-neutral-900 p-4 flex flex-col gap-4">
      <h2 className="text-md font-semibold text-neutral-300 uppercase tracking-widest">Coda Eventi (Mixer)</h2>
      
      <div className="flex justify-between items-center bg-neutral-800 p-3 rounded border border-neutral-700">
         <div>
            <div className="text-xs text-neutral-400 uppercase tracking-widest">In Onda Ora</div>
            <div className="text-xl font-bold text-orange-500">
               {nowPlaying ? nowPlaying.track.title : "Nessun Brano in Messa in Onda"}
            </div>
            {nowPlaying && <div className="text-sm text-neutral-300">{nowPlaying.track.artist}</div>}
         </div>
         <button 
           onClick={playNext}
           disabled={queue.length === 0}
           className="px-6 py-3 bg-cyan-700 disabled:bg-neutral-700 hover:bg-cyan-600 rounded text-white font-bold transition-all"
         >
           {nowPlaying ? "FADE NEXT" : "PLAY NEXT"}
         </button>
      </div>

      <div 
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex-1 border-2 border-dashed border-neutral-700 hover:border-cyan-500/50 transition-colors bg-neutral-800/30 rounded-lg flex flex-col p-4 overflow-y-auto custom-scrollbar"
      >
        {queue.length === 0 ? (
           <div className="m-auto text-neutral-500 text-center">
             <p className="text-lg mb-2">Coda di riproduzione vuota.</p>
             <p className="text-sm">Trascina qui le cartucce dalla libreria per aggiungerle alla scaletta.</p>
           </div>
        ) : (
           <div className="flex flex-col gap-2">
             {queue.map((q, index) => (
                <div key={q.queue_id} className="flex justify-between items-center bg-neutral-800 border border-neutral-700 p-3 rounded group hover:border-neutral-500 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className="text-neutral-500 font-mono w-6 text-right">{index + 1}.</div>
                      <div>
                         <div className="font-semibold text-neutral-200">{q.track.title}</div>
                         <div className="text-xs text-neutral-400">{q.track.artist}</div>
                      </div>
                   </div>
                   <div className="flex gap-4 items-center">
                      <div className="text-xs text-neutral-500 font-mono">
                         {Math.floor(q.track.duration_ms / 60000)}:{(Math.floor((q.track.duration_ms % 60000)/1000)).toString().padStart(2, '0')}
                      </div>
                      <button 
                         onClick={() => removeFromQueue(q.queue_id)}
                         className="text-neutral-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                         ✕
                      </button>
                   </div>
                </div>
             ))}
           </div>
        )}
      </div>
    </section>
  );
}
