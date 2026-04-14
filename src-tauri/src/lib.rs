mod db;

use std::sync::Mutex;
use rusqlite::Connection;
use tauri::Manager;
use serde::{Deserialize, Serialize};

// Wrapper per contenere il Database in memoria (Thread Safe)
pub struct AppState {
    pub db: Mutex<Connection>,
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
fn get_tracks(state: tauri::State<AppState>) -> Result<Vec<Track>, String> {
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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            // Risolve automaticamente la cartella dati in base a Win/Mac/Linux
            let app_data_dir = app.path().app_data_dir().expect("Failed to get App Data dir");
            let conn = db::initialize_database(&app_data_dir).expect("Failed to init database");
            
            // Inietta il pointer al DB nello Stato Globale Globale
            app.manage(AppState {
                db: Mutex::new(conn),
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_tracks])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
