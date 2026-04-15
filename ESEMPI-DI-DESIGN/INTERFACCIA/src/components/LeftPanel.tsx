import React, { useState } from 'react';
import { Search, Music, Mic, RadioTower, Sparkles, Folder, GripVertical } from 'lucide-react';
import { Track } from '../types';

const CATEGORIES = [
  { id: 'Music', icon: Music, label: 'Music' },
  { id: 'Jingle', icon: Sparkles, label: 'Jingles' },
  { id: 'Ad', icon: RadioTower, label: 'Ads/Promos' },
  { id: 'Show', icon: Mic, label: 'Shows' },
  { id: 'Asset', icon: Folder, label: 'Assets' },
];

const MOCK_LIBRARY: Track[] = [
  { id: 'l1', title: 'Get Lucky', artist: 'Daft Punk', duration: '4:08', durationMs: 248000, type: 'Music' },
  { id: 'l2', title: 'Midnight City', artist: 'M83', duration: '4:03', durationMs: 243000, type: 'Music' },
  { id: 'l3', title: 'Morning Show Intro', artist: 'Runtime Radio', duration: '0:30', durationMs: 30000, type: 'Asset' },
  { id: 'l4', title: 'Sweep Jingle 1', artist: 'Runtime Radio', duration: '0:05', durationMs: 5000, type: 'Jingle' },
  { id: 'l5', title: 'Tech Talk Podcast', artist: 'Host Name', duration: '45:00', durationMs: 2700000, type: 'Show' },
  { id: 'l6', title: 'Local Weather Update', artist: 'News Team', duration: '1:00', durationMs: 60000, type: 'Show' },
  { id: 'l7', title: 'Ad Block A', artist: 'Sponsors', duration: '2:30', durationMs: 150000, type: 'Ad' },
  { id: 'l8', title: 'Instant Crush', artist: 'Daft Punk', duration: '5:38', durationMs: 338000, type: 'Music' },
];

export function LeftPanel() {
  const [activeCategory, setActiveCategory] = useState('Music');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLibrary = MOCK_LIBRARY.filter(
    (t) => t.type === activeCategory && (t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.artist.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-80 bg-neutral-900 border-r border-neutral-800 flex flex-col shrink-0">
      <div className="p-4 border-b border-neutral-800">
        <h2 className="text-sm font-bold text-neutral-400 tracking-wider uppercase mb-4">Media Library</h2>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
          <input
            type="text"
            placeholder="Search library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-md py-2 pl-9 pr-4 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-neutral-700 text-white'
                  : 'bg-neutral-950 text-neutral-400 hover:bg-neutral-800'
              }`}
            >
              <cat.icon size={12} />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-hide">
        {filteredLibrary.map((track) => (
          <div
            key={track.id}
            draggable
            className="group flex items-center gap-3 p-2 rounded-md hover:bg-neutral-800 cursor-grab active:cursor-grabbing transition-colors"
          >
            <GripVertical size={14} className="text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-neutral-200 truncate">{track.title}</div>
              <div className="text-xs text-neutral-500 truncate">{track.artist}</div>
            </div>
            <div className="text-xs font-mono text-neutral-500">{track.duration}</div>
          </div>
        ))}
        {filteredLibrary.length === 0 && (
          <div className="text-center text-neutral-500 text-sm p-4 mt-8">
            No items found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
