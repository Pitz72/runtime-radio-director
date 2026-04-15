export type PlayMode = 'AUTO' | 'LIVE' | 'OFF';

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationMs: number;
  type: 'Music' | 'Jingle' | 'Ad' | 'Show' | 'Asset';
  logic?: string;
  status?: 'playing' | 'upcoming' | 'played';
}
