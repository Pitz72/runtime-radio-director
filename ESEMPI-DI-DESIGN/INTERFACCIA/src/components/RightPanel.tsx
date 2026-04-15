import React, { useState } from 'react';
import { Play, Square, SkipForward, Volume2, Mic, Repeat, SlidersHorizontal, Activity } from 'lucide-react';

interface RightPanelProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export function RightPanel({ isPlaying, setIsPlaying }: RightPanelProps) {
  const [masterVol, setMasterVol] = useState(85);
  const [bedVol, setBedVol] = useState(40);
  const [bedLoop, setBedLoop] = useState(true);
  const [ducking, setDucking] = useState(true);

  return (
    <div className="w-80 bg-neutral-900 border-l border-neutral-800 flex flex-col shrink-0">
      {/* Transport Controls */}
      <div className="p-6 border-b border-neutral-800 flex flex-col items-center justify-center gap-6">
        <div className="flex items-center justify-center gap-4">
          <button className="w-12 h-12 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 transition-colors">
            <Square size={20} fill="currentColor" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-neutral-950 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all"
          >
            {isPlaying ? (
              <div className="flex gap-1.5">
                <div className="w-1.5 h-6 bg-current rounded-sm"></div>
                <div className="w-1.5 h-6 bg-current rounded-sm"></div>
              </div>
            ) : (
              <Play size={28} fill="currentColor" className="ml-1" />
            )}
          </button>
          <button className="w-12 h-12 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-300 transition-colors">
            <SkipForward size={20} fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Background Audio / Beds */}
      <div className="p-5 border-b border-neutral-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-neutral-400 tracking-widest uppercase">Background Bed</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setBedLoop(!bedLoop)}
              className={`p-1.5 rounded ${bedLoop ? 'bg-blue-500/20 text-blue-400' : 'text-neutral-500 hover:bg-neutral-800'}`}
              title="Loop Bed"
            >
              <Repeat size={14} />
            </button>
            <button 
              onClick={() => setDucking(!ducking)}
              className={`p-1.5 rounded flex items-center gap-1 text-[10px] font-bold ${ducking ? 'bg-amber-500/20 text-amber-400' : 'text-neutral-500 hover:bg-neutral-800'}`}
              title="Auto-Ducking (lowers volume when mic is active)"
            >
              <Activity size={12} /> DUCK
            </button>
          </div>
        </div>

        <div className="bg-neutral-950 rounded p-3 mb-3 border border-neutral-800">
          <div className="text-sm font-medium text-neutral-200 truncate">News Bed - Light Tension</div>
          <div className="text-xs text-neutral-500 font-mono mt-1">00:45 / 03:00</div>
        </div>

        <div className="flex items-center gap-3">
          <Volume2 size={16} className="text-neutral-500" />
          <input 
            type="range" 
            min="0" max="100" 
            value={bedVol}
            onChange={(e) => setBedVol(parseInt(e.target.value))}
            className="flex-1 h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <span className="text-xs font-mono text-neutral-400 w-8 text-right">{bedVol}%</span>
        </div>
      </div>

      {/* Master Output */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-bold text-neutral-400 tracking-widest uppercase">Master Output</h3>
          <SlidersHorizontal size={14} className="text-neutral-500" />
        </div>

        <div className="flex-1 flex justify-center gap-8 mb-6">
          {/* Left Meter */}
          <div className="w-8 bg-neutral-950 rounded-full border border-neutral-800 relative overflow-hidden flex flex-col justify-end p-1">
            <div className="w-full bg-gradient-to-t from-emerald-500 via-amber-400 to-red-500 rounded-full" style={{ height: '75%' }}></div>
            {/* Meter markers */}
            <div className="absolute inset-0 flex flex-col justify-between py-2 opacity-20 pointer-events-none">
              {[...Array(10)].map((_, i) => <div key={i} className="w-full h-px bg-white"></div>)}
            </div>
          </div>
          {/* Right Meter */}
          <div className="w-8 bg-neutral-950 rounded-full border border-neutral-800 relative overflow-hidden flex flex-col justify-end p-1">
            <div className="w-full bg-gradient-to-t from-emerald-500 via-amber-400 to-red-500 rounded-full" style={{ height: '72%' }}></div>
            <div className="absolute inset-0 flex flex-col justify-between py-2 opacity-20 pointer-events-none">
              {[...Array(10)].map((_, i) => <div key={i} className="w-full h-px bg-white"></div>)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Mic size={16} className="text-neutral-500" />
          <input 
            type="range" 
            min="0" max="100" 
            value={masterVol}
            onChange={(e) => setMasterVol(parseInt(e.target.value))}
            className="flex-1 h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <span className="text-xs font-mono text-neutral-400 w-8 text-right">{masterVol}%</span>
        </div>
      </div>
    </div>
  );
}
