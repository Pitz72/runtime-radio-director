use kira::manager::{AudioManager, AudioManagerSettings, backend::DefaultBackend};
use kira::sound::streaming::{StreamingSoundData, StreamingSoundSettings};
use kira::track::{TrackBuilder, TrackHandle};
use kira::tween::Tween;
use kira::Volume;
use std::sync::Mutex;
use std::time::Duration;

const DUCKING_VOLUME: f64 = 0.15;
const DUCKING_FADE_IN_MS: u64 = 300;
const DUCKING_FADE_OUT_MS: u64 = 1500;

pub struct RadioAudioEngine {
    pub manager: Mutex<AudioManager<DefaultBackend>>,
    pub music_track: Mutex<TrackHandle>,
}

impl RadioAudioEngine {
    pub fn new() -> Result<Self, String> {
        let mut manager = AudioManager::<DefaultBackend>::new(AudioManagerSettings::default())
            .map_err(|e| format!("Failed to init audio manager: {}", e))?;

        // Creazione di un BUS virtuale chiamato "Music"
        let music_track = manager
            .add_sub_track(TrackBuilder::new())
            .map_err(|e| format!("Failed to create music subtrack: {}", e))?;

        Ok(Self {
            manager: Mutex::new(manager),
            music_track: Mutex::new(music_track),
        })
    }

    pub fn play_test_file(&self, path: &str) -> Result<(), String> {
        let mut manager = self.manager.lock().unwrap();
        // Esegue uno streaming progressivo dal disco invece che caricare in memoria
        let sound_data = StreamingSoundData::from_file(path, StreamingSoundSettings::default())
            .map_err(|e| format!("Failed to load streaming sound from {}: {}", path, e))?;
        
        manager.play(sound_data).map_err(|e| format!("Failed to play stream: {}", e))?;
        Ok(())
    }

    pub fn set_mic_ducking(&self, mic_open: bool) -> Result<(), String> {
        let music_bus = self.music_track.lock().unwrap();
        
        // Auto-Ducking: Abbassare la musica per far parlare lo speaker
        let target_vol = if mic_open { DUCKING_VOLUME } else { 1.0 };
        
        let fade_tween = Tween {
            duration: Duration::from_millis(if mic_open { DUCKING_FADE_IN_MS } else { DUCKING_FADE_OUT_MS }),
            ..Default::default()
        };

        let _ = music_bus.set_volume(Volume::Amplitude(target_vol), fade_tween);
        Ok(())
    }
}
