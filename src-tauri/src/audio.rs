use kira::{
    manager::{AudioManager, AudioManagerSettings, backend::DefaultBackend},
    sound::static_sound::{StaticSoundData, StaticSoundSettings},
    track::{TrackBuilder, TrackHandle},
    Volume, tween::Tween,
};
use std::sync::Mutex;
use std::time::Duration;

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
        // N.B: Questo leggerà il file in blocchi in memoria e lo instraderà
        let sound_data = StaticSoundData::from_file(path, StaticSoundSettings::default())
            .map_err(|e| format!("Failed to load sound from {}: {}", path, e))?;
        
        manager.play(sound_data).map_err(|e| format!("Failed to play: {}", e))?;
        Ok(())
    }

    pub fn set_mic_ducking(&self, mic_open: bool) -> Result<(), String> {
        let music_bus = self.music_track.lock().unwrap();
        
        // Auto-Ducking: Abbassare la musica per far parlare lo speaker
        let target_vol = if mic_open { 0.15 } else { 1.0 }; // Abbassamento all'15%
        
        let fade_tween = Tween {
            duration: Duration::from_millis(if mic_open { 300 } else { 1500 }),
            ..Default::default()
        };

        let _ = music_bus.set_volume(Volume::Amplitude(target_vol), fade_tween);
        Ok(())
    }
}
