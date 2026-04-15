import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { LeftPanel } from './components/LeftPanel';
import { CenterPanel } from './components/CenterPanel';
import { RightPanel } from './components/RightPanel';
import { PlayMode, Track } from './types';

const MOCK_QUEUE: Track[] = [
  { id: '2', title: 'Station ID - Top of Hour', artist: 'Runtime Radio', duration: '0:15', durationMs: 15000, type: 'Jingle', logic: 'Scheduled event', status: 'upcoming' },
  { id: '3', title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20', durationMs: 200000, type: 'Music', logic: 'Rotation', status: 'upcoming' },
  { id: '4', title: 'Local Weather Update', artist: 'News Team', duration: '1:00', durationMs: 60000, type: 'Show', logic: 'Scheduled event', status: 'upcoming' },
  { id: '5', title: 'Ad Block A', artist: 'Sponsors', duration: '2:30', durationMs: 150000, type: 'Ad', logic: 'Ad block', status: 'upcoming' },
  { id: '6', title: 'Instant Crush', artist: 'Daft Punk', duration: '5:38', durationMs: 338000, type: 'Music', logic: 'Rotation', status: 'upcoming' },
];

const CURRENT_TRACK: Track = {
  id: '1', title: 'Midnight City', artist: 'M83', duration: '4:03', durationMs: 243000, type: 'Music', logic: 'Rotation', status: 'playing'
};

export default function App() {
  const [mode, setMode] = useState<PlayMode>('AUTO');
  const [isPlaying, setIsPlaying] = useState(true);
  
  return (
    <div className="h-screen w-screen bg-neutral-950 text-neutral-100 flex flex-col overflow-hidden font-sans selection:bg-emerald-500/30">
      <TopBar 
        mode={mode} 
        setMode={setMode} 
        currentTrack={CURRENT_TRACK} 
        nextTrack={MOCK_QUEUE[0]} 
      />
      <div className="flex-1 flex overflow-hidden">
        <LeftPanel />
        <CenterPanel mode={mode} queue={MOCK_QUEUE} currentTrack={CURRENT_TRACK} />
        <RightPanel isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </div>
    </div>
  );
}
