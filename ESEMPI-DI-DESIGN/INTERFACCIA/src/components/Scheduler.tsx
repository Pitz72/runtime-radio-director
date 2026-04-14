import React from 'react';
import { Clock, Plus } from 'lucide-react';

export function Scheduler() {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-neutral-950">
      <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-bold text-neutral-200">Today's Schedule</h2>
          <span className="text-xs text-neutral-500 font-mono">Oct 24, 2023</span>
        </div>
        <button className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 px-3 py-1.5 rounded text-xs font-bold transition-colors">
          <Plus size={14} /> Add Event
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide relative">
        <div className="absolute left-16 top-0 bottom-0 w-px bg-neutral-800/50 z-0"></div>
        
        {/* Current Time Indicator */}
        <div className="absolute left-0 right-4 top-[30%] h-px bg-red-500/50 z-20 flex items-center">
          <div className="w-2 h-2 rounded-full bg-red-500 -ml-1"></div>
        </div>

        <div className="space-y-8 relative z-10">
          {hours.map((hour) => (
            <div key={hour} className="flex gap-4 min-h-[60px]">
              <div className="w-12 text-right shrink-0">
                <span className="text-xs font-mono font-medium text-neutral-500">
                  {hour.toString().padStart(2, '0')}:00
                </span>
              </div>
              
              <div className="flex-1 relative">
                {/* Mock Scheduled Blocks */}
                {hour === 8 && (
                  <div className="absolute top-0 left-0 right-0 bg-blue-500/10 border border-blue-500/20 rounded p-2">
                    <div className="text-xs font-bold text-blue-400 mb-1">Morning Drive Show</div>
                    <div className="text-[10px] text-neutral-400">Playlist: Upbeat Morning Mix</div>
                  </div>
                )}
                {hour === 12 && (
                  <div className="absolute top-0 left-0 right-0 bg-amber-500/10 border border-amber-500/20 rounded p-2">
                    <div className="text-xs font-bold text-amber-400 mb-1 flex items-center gap-1">
                      <Clock size={10} /> Exact Time Event
                    </div>
                    <div className="text-[10px] text-neutral-400">Top of Hour News Bulletin</div>
                  </div>
                )}
                {hour === 14 && (
                  <div className="absolute top-0 left-0 right-0 bg-purple-500/10 border border-purple-500/20 rounded p-2 h-24">
                    <div className="text-xs font-bold text-purple-400 mb-1">Afternoon Chill</div>
                    <div className="text-[10px] text-neutral-400">Playlist: Lo-Fi & Indie</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
