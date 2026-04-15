# Runtime Radio Director

## Software Desktop Multipiattaforma per l'Automazione Radiofonica e il Live Assist ad elevate performance (Tauri/React)

---

## 🚀 ROADMAP E STATO DEL PROGETTO

### Fase 1: Setup Progetto ed Environment

- ✅ Documentazione di Master Project finalizzata
- ✅ Definizione reference UI (Prototipo Design in folder separata, non codebase)
- ✅ Creazione repository Git locale
- ✅ Setup ed integrazione GitHub (Account: `Pitz72` completato)

### Fase 2: Inizializzazione Architettura Tauri/React

- ✅ Configurazione Tauri 2 / Rust
- ✅ React 19 + TypeScript + Vite 6 + Tailwind 4 ("Dark Mode First")
- ✅ Architettura Backend "Host-Side-Heavy" e libreria DB locale

### Fase 3: Core Audio e Gestione Memoria

- ✅ C++ / Rust Motore di decodifica audio (gapless playback)
- ✅ Sistema Auto-Ducking per microfoni (Live assist)
- ✅ DSP & Crossfader logico

### Fase 4: Sviluppo Interfaccia (Viste Dinamiche)

- ✅ Left Panel (Libreria Mediatica Drag&Drop)
- ✅ Center Panel (Mix e Coda eventi interattiva con regole visibili)
- ✅ Top Bar e Right Panel (Mixer DSP & Status)

### Fase 5: Motore di Automazione e Scheduler

- ⬜ Implementazione eventi discreti e Rotazioni ("Play At")
- ⬜ Error-handling silenzioso e Resilienza
- ⬜ Debug e audit performance (RAM Leak test)

---

### 🔥 Stack Tecnologico e Supporto OS

- **Supporto Nativo Multipiattaforma**: Sviluppo testato su Windows ma architetturalmente **concepito per garantire perfetta compatibilità, stabilità e medesime performance in ambiente macOS e Linux** fin dalle fondamenta.
- **Frontend**: React 19, Vite, TypeScript, Tailwind 4.
- **Backend**: Tauri 2, Rust (che garantisce chiamate native OS leggere senza container come Electron).
- **Data Tier**: SQLite Embedding (No Server Esterni, portabilità in un singolo file).

> **Attenzione ai dev agenti:** Il design system implementerà palette cromatiche basate sull'Arancione (Accento), Ciano elettrico (Auto) e Rosso Corallo (Live), eliminando tutti gli storici workaround di sistema, le playlist fasulle e le dispersioni tipiche di applicativi legacy limitanti.
