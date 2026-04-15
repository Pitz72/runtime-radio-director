mod db;
mod audio;

use std::sync::Mutex;
use rusqlite::Connection;
use tauri::Manager;
use serde::{Deserialize, Serialize};

// Wrapper per contenere il Database e l'Audio Engine in memoria
pub struct AppState {
    pub db: Mutex<Connection>,
    pub audio_engine: audio::RadioAudioEngine,
}

#[derive(Serialize, Deserialize)]
pub struct Track {
    pub id: String,
    pub title: String,
    pub artist: String,
    pub duration_ms: i64,
    pub category: String,
}

#[tauri::command]
async fn get_tracks(state: tauri::State<'_, AppState>) -> Result<Vec<Track>, String> {
    // ... DB LOGIC ...
    let db = state.db.lock().map_err(|e| e.to_string())?;
    let mut stmt = db.prepare("SELECT id, title, artist, duration_ms, category FROM tracks").map_err(|e| e.to_string())?;
    
    let track_iter = stmt.query_map([], |row| {
        Ok(Track {
            id: row.get(0)?,
            title: row.get(1)?,
            artist: row.get(2)?,
            duration_ms: row.get(3)?,
            category: row.get(4)?,
        })
    }).map_err(|e| e.to_string())?;

    let mut tracks = Vec::new();
    for track in track_iter {
        tracks.push(track.map_err(|e| e.to_string())?);
    }
    
    Ok(tracks)
}

#[tauri::command]
async fn play_audio(path: String, state: tauri::State<'_, AppState>) -> Result<(), String> {
    state.audio_engine.play_test_file(&path)
}

#[tauri::command]
async fn toggle_mic(active: bool, state: tauri::State<'_, AppState>) -> Result<(), String> {
    state.audio_engine.set_mic_ducking(active)
}

#[tauri::command]
async fn insert_mock_tracks(state: tauri::State<'_, AppState>) -> Result<(), String> {
    let db = state.db.lock().map_err(|e| e.to_string())?;
    
    let tracks = vec![
        ("ID_001", "C:\\RadioMedia\\Jingle1.mp3", "Runtime Station ID", "Station", 8000, "JINGLE"),
        ("ID_002", "C:\\RadioMedia\\Song1.mp3", "Bohemian Rhapsody", "Queen", 354000, "MUSIC"),
        ("ID_003", "C:\\RadioMedia\\Promo.mp3", "Promo Evento Live", "Speaker", 15000, "PROMO"),
        ("ID_004", "C:\\RadioMedia\\Song2.mp3", "Starlight", "Muse", 240000, "MUSIC"),
    ];

    for t in tracks {
        db.execute(
            "INSERT OR REPLACE INTO tracks (id, file_path, title, artist, duration_ms, category) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
            rusqlite::params![t.0, t.1, t.2, t.3, t.4, t.5],
        ).map_err(|e| e.to_string())?;
    }

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            // DB Init
            let app_data_dir = app.path().app_data_dir().expect("Failed to get App Data dir");
            let conn = db::initialize_database(&app_data_dir).expect("Failed to init database");
            
            // Audio Init
            let engine = audio::RadioAudioEngine::new().expect("Failed to init Kira audio engine");

            // Inietta nello Stato Globale
            app.manage(AppState {
                db: Mutex::new(conn),
                audio_engine: engine,
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_tracks, play_audio, toggle_mic, insert_mock_tracks])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
