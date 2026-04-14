# Runtime Radio Director

**Software Desktop Multipiattaforma per l'Automazione Radiofonica e il Live Assist ad elevate performance (Tauri/React)**

---

## 🚀 ROADMAP E STATO DEL PROGETTO

**Fase 1: Setup Progetto ed Environment**
- [x] Documentazione di Master Project finalizzata
- [x] Definizione reference UI (Prototipo Design in folder separata, non codebase)
- [ ] Creazione repository Git locale
- [ ] Setup ed integrazione GitHub (Account: `Pitz72`)

**Fase 2: Inizializzazione Architettura Tauri/React**
- [ ] Configurazione Tauri 2 / Rust
- [ ] React 19 + TypeScript + Vite 6 + Tailwind 4 ("Dark Mode First")
- [ ] Architettura Backend "Host-Side-Heavy" e libreria DB locale

**Fase 3: Core Audio e Gestione Memoria**
- [ ] C++ / Rust Motore di decodifica audio (gapless playback)
- [ ] Sistema Auto-Ducking per microfoni (Live assist)
- [ ] DSP & Crossfader logico

**Fase 4: Sviluppo Interfaccia (Viste Dinamiche)**
- [ ] Left Panel (Libreria Mediatica Drag&Drop)
- [ ] Center Panel (Mix e Coda eventi interattiva con regole visibili)
- [ ] Top Bar e Right Panel (Mixer DSP & Status)

**Fase 5: Motore di Automazione e Scheduler**
- [ ] Implementazione eventi discreti e Rotazioni ("Play At")
- [ ] Error-handling silenzioso e Resilienza
- [ ] Debug e audit performance (RAM Leak test)

---

### 🔥 Stack Tecnologico
*   **Frontend**: React 19, Vite, TypeScript, Tailwind 4.
*   **Backend**: Tauri, Rust.
*   **Data Tier**: SQLite Embedding (No SQL Server esterni).

> **Attenzione ai dev agenti:** Il design system implementerà palette cromatiche basate sull'Arancione (Accento), Ciano elettrico (Auto) e Rosso Corallo (Live), eliminando tutti gli storici workaround di sistema, le playlist fasulle e le dispersioni tipiche di applicativi legacy limitanti.
