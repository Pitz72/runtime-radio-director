import React from 'react';
import { Radio, Activity, Settings, Play, FastForward } from 'lucide-react';
import { PlayMode, Track } from '../types';

interface TopBarProps {
  mode: PlayMode;
  setMode: (mode: PlayMode) => void;
  currentTrack: Track | null;
  nextTrack: Track | null;
}

export function TopBar({ mode, setMode, currentTrack, nextTrack }: TopBarProps) {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-20 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between px-6 shrink-0">
      {/* Logo & Mode */}
      <div className="flex items-center gap-8 w-1/4">
        <div className="flex items-center gap-3 text-emerald-500">
          <Radio size={28} className={mode === 'LIVE' ? 'text-red-500 animate-pulse' : ''} />
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight text-neutral-100">Runtime Radio</h1>
            <p className="text-xs font-medium text-neutral-500 tracking-widest uppercase">Director</p>
          </div>
        </div>

        <div className="flex bg-neutral-900 rounded-lg p-1 border border-neutral-800">
          {(['AUTO', 'LIVE', 'OFF'] as PlayMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 rounded-md text-xs font-bold tracking-wider transition-colors ${
                mode === m
                  ? m === 'LIVE'
                    ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                    : m === 'AUTO'
                    ? 'bg-emerald-500 text-neutral-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-neutral-700 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Now Playing Info */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl px-8">
        {currentTrack ? (
          <div className="w-full flex flex-col items-center">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-emerald-400 text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                <Play size={12} fill="currentColor" /> ON AIR
              </span>
              <h2 className="text-xl font-bold text-white truncate max-w-[300px]">{currentTrack.title}</h2>
              <span className="text-neutral-400 text-sm truncate max-w-[200px]">{currentTrack.artist}</span>
            </div>
            
            <div className="w-full flex items-center gap-3">
              <span className="text-xs font-mono text-neutral-400">01:24</span>
              <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-1/3 rounded-full relative">
                  <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/20 blur-[2px]"></div>
                </div>
              </div>
              <span className="text-xs font-mono text-neutral-400">-{currentTrack.duration}</span>
            </div>
          </div>
        ) : (
          <div className="text-neutral-500 font-medium">No track playing</div>
        )}
      </div>

      {/* Next & Status */}
      <div className="flex items-center justify-end gap-8 w-1/4">
        {nextTrack && (
          <div className="flex flex-col items-end text-right">
            <span className="text-xs font-bold text-amber-400 tracking-widest uppercase flex items-center gap-1 mb-0.5">
               NEXT <FastForward size={10} />
            </span>
            <span className="text-sm font-medium text-neutral-200 truncate max-w-[150px]">{nextTrack.title}</span>
          </div>
        )}

        <div className="h-10 w-px bg-neutral-800"></div>

        <div className="flex items-center gap-5">
          <div className="flex flex-col items-end">
            <span className="text-lg font-mono font-medium text-neutral-100">
              {time.toLocaleTimeString([], { hour12: false })}
            </span>
            <span className="text-[10px] font-bold text-emerald-500 tracking-wider flex items-center gap-1">
              <Activity size={10} /> SYSTEM OK
            </span>
          </div>
          <button className="text-neutral-400 hover:text-white transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
