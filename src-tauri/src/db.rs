use rusqlite::{Connection, Result};
use std::fs;
use std::path::PathBuf;

pub fn initialize_database(app_data_dir: &PathBuf) -> Result<Connection> {
    // Esiste la cartella Data dell'app multios? Altrimenti la creiamo!
    if !app_data_dir.exists() {
        fs::create_dir_all(app_data_dir).expect("Failed to create app data directory");
    }

    let db_path = app_data_dir.join("radio_director.sqlite");
    
    // Connessione diretta a file unico
    let conn = Connection::open(db_path)?;

    // Table Media Library
    conn.execute(
        "CREATE TABLE IF NOT EXISTS tracks (
            id TEXT PRIMARY KEY,
            file_path TEXT NOT NULL,
            title TEXT NOT NULL,
            artist TEXT NOT NULL,
            duration_ms INTEGER NOT NULL,
            category TEXT NOT NULL
        )",
        [],
    )?;

    // Table Storico Trasmissioni
    conn.execute(
        "CREATE TABLE IF NOT EXISTS playlog (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            track_id TEXT NOT NULL,
            played_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(track_id) REFERENCES tracks(id)
        )",
        [],
    )?;

    Ok(conn)
}
