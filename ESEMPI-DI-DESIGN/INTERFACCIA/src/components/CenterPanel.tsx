import React, { useState } from 'react';
import { PlayMode, Track } from '../types';
import { Play, SkipForward, X, Clock, Calendar, Repeat, Zap } from 'lucide-react';
import { Scheduler } from './Scheduler';

interface CenterPanelProps {
  mode: PlayMode;
  queue: Track[];
  currentTrack: Track | null;
}

export function CenterPanel({ mode, queue, currentTrack }: CenterPanelProps) {
  const [view, setView] = useState<'QUEUE' | 'SCHEDULER'>('QUEUE');

  const getLogicIcon = (logic?: string) => {
    if (!logic) return null;
    if (logic.includes('Rotation')) return <Repeat size={12} className="text-blue-400" />;
    if (logic.includes('Scheduled')) return <Calendar size={12} className="text-amber-400" />;
    if (logic.includes('Ad')) return <Zap size={12} className="text-purple-400" />;
    return <Clock size={12} className="text-neutral-400" />;
  };

  const getLogicColor = (logic?: string) => {
    if (!logic) return 'bg-neutral-800 text-neutral-400';
    if (logic.includes('Rotation')) return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    if (logic.includes('Scheduled')) return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    if (logic.includes('Ad')) return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    return 'bg-neutral-800 text-neutral-400 border-neutral-700';
  };

  return (
    <div className="flex-1 bg-neutral-950 flex flex-col min-w-0">
      <div className="flex items-center justify-between p-4 border-b border-neutral-800">
        <div className="flex bg-neutral-900 rounded-lg p-1 border border-neutral-800">
          <button
            onClick={() => setView('QUEUE')}
            className={`px-4 py-1.5 rounded-md text-sm font-bold tracking-wide transition-colors ${
              view === 'QUEUE' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Live Queue
          </button>
          <button
            onClick={() => setView('SCHEDULER')}
            className={`px-4 py-1.5 rounded-md text-sm font-bold tracking-wide transition-colors ${
              view === 'SCHEDULER' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Scheduler
          </button>
        </div>

        {mode === 'LIVE' && (
          <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-xs font-bold tracking-widest uppercase">Manual Control Active</span>
          </div>
        )}
      </div>

      {view === 'QUEUE' ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
          {/* Current Track */}
          {currentTrack && (
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-4 flex items-center gap-4 relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
              
              <div className="w-12 h-12 rounded bg-emerald-900/50 flex items-center justify-center text-emerald-500 shrink-0">
                <Play size={24} fill="currentColor" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-emerald-500 tracking-widest uppercase">Now Playing</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 ${getLogicColor(currentTrack.logic)}`}>
                    {getLogicIcon(currentTrack.logic)}
                    {currentTrack.logic}
                  </span>
                </div>
                <div className="text-lg font-bold text-white truncate">{currentTrack.title}</div>
                <div className="text-sm text-neutral-400 truncate">{currentTrack.artist}</div>
              </div>
              
              <div className="text-right shrink-0">
                <div className="text-xl font-mono font-light text-emerald-400">-02:39</div>
                <div className="text-xs text-neutral-500 font-mono">Total: {currentTrack.duration}</div>
              </div>
            </div>
          )}

          {/* Upcoming Tracks */}
          <div className="mt-6 mb-2 flex items-center gap-4">
            <h3 className="text-xs font-bold text-neutral-500 tracking-widest uppercase">Upcoming</h3>
            <div className="flex-1 h-px bg-neutral-800"></div>
          </div>

          {queue.map((track, index) => (
            <div
              key={track.id}
              className="group bg-neutral-900/50 border border-neutral-800/50 hover:border-neutral-700 rounded-lg p-3 flex items-center gap-4 transition-colors"
            >
              <div className="w-8 text-center text-xs font-mono text-neutral-600 font-bold">
                {index + 1}
              </div>
              
              <div className="flex-1 min-w-0 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-neutral-200 truncate">{track.title}</div>
                  <div className="text-xs text-neutral-500 truncate">{track.artist}</div>
                </div>
                
                <div className="shrink-0 w-32">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 w-fit ${getLogicColor(track.logic)}`}>
                    {getLogicIcon(track.logic)}
                    {track.logic}
                  </span>
                </div>
              </div>
              
              <div className="text-sm font-mono text-neutral-400 shrink-0 w-16 text-right">
                {track.duration}
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded transition-colors" title="Play Next">
                  <Play size={16} />
                </button>
                <button className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded transition-colors" title="Skip">
                  <SkipForward size={16} />
                </button>
                <button className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors" title="Remove">
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}

          {mode === 'LIVE' && (
            <div className="border-2 border-dashed border-neutral-800 rounded-lg p-8 flex flex-col items-center justify-center text-neutral-500 mt-4">
              <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center mb-3">
                <Play size={20} className="text-neutral-400" />
              </div>
              <p className="text-sm font-medium">Drag items here to add to live queue</p>
            </div>
          )}
        </div>
      ) : (
        <Scheduler />
      )}
    </div>
  );
}
