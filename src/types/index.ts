// Interfacce per lo store e la tipologia di dati
export interface Track {
    id: string;
    title: string;
    artist: string;
    duration_ms: number;
    category: string;
}

export interface QueuedTrack {
    queue_id: string; // id univoco per la coda, una traccia può essere messa in coda più volte
    track: Track;
}
