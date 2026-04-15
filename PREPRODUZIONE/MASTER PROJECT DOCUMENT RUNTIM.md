# 📻 MASTER PROJECT DOCUMENT: RUNTIME RADIO DIRECTOR

**Nome Progetto:** Runtime Radio Director  
**Tagline Principale:** Smart Automation. Seamless Live.  
**Tagline Alternativa:** Radio Automation, Reimagined.  
**Stato Attuale:** Fase di Analisi e Design Concettuale  

---

## 1. LA VISIONE E IL VUOTO DI MERCATO

**L'Obiettivo:** Creare un software desktop multipiattaforma (Windows, Linux, macOS) per la regia radiofonica automatizzata, semi-automatizzata e manuale, che si posizioni come la via di mezzo perfetta tra i sistemi storici e quelli web.

*   **Contro i vecchi software (es. RadioDJ, mAirList):** Eliminiamo le interfacce dispersive, il debito tecnico, gli "arzigogolamenti" (es. dover creare una playlist intera per suonare un singolo file a una certa ora), le dipendenze da server esterni (MySQL) e la necessità di moduli a pagamento per funzioni base.
*   **Contro le soluzioni web (es. AzuraCast):** Manteniamo la facilità di setup e la semplicità concettuale dello scheduling a regole, ma aggiungiamo la potenza, la latenza zero e la fisicità della vera regia in studio e del Live Assist.

**Il "Momento Magico" (Time to Value):** L'utente scarica l'app, trascina una cartella, risponde a 3 domande in croce e preme "Avvia". In meno di 10 minuti la radio è in onda da sola, alternando musica, jingle e spot con logiche professionali.

---

## 2. STACK TECNOLOGICO E ARCHITETTURA

*   **Frontend (UI/UX):** React. Interfaccia utente fluida, reattiva, basata su logiche web moderne e componenti drag-and-drop.
*   **Backend & Audio Engine:** Tauri (Rust). Performance native, consumo bassissimo di RAM, sicurezza elevata tramite sandbox. Il motore DSP e la gestione dei thread audio sono scritti in Rust per garantire zero latenza.
*   **Database (Core Data):** Database Embedded (SQLite, libSQL o DuckDB). **Nessun server esterno richiesto.** Portabilità totale: il backup è un semplice "copia-incolla" di un file.

---

## 3. FILOSOFIA UX E DESIGN SYSTEM (I 3 PRINCIPI ASSOLUTI)

1.  **Visibilità delle logiche:** L'utente deve capire sempre *perché* una cosa sta succedendo. Ogni elemento in coda deve spiegare la sua presenza (es. `[Rotazione]`, `[Evento Schedulato]`, `[Fallback]`).
2.  **Zero workaround:** La regola aurea. Se per far suonare un singolo jingle alle 12:00 devo creare una "playlist delle 12:00", la UX ha fallito. Ogni azione deve essere diretta.
3.  **Dualità perfetta:** L'automazione è un'*orchestra invisibile* che suona da sola in background; il Live Assist è uno *strumento reattivo* nelle mani dello speaker.

---

## 4. FLUSSO OPERATIVO E FUNZIONALITÀ (UX FLOW)

### 4.1. First Launch Experience (Onboarding Intelligente)
Wizard a 4 step (Durata < 10 min):
*   **Step 1 - Import Media:** Drag & drop della cartella. Auto-scansione (invisibile in background) e auto-categorizzazione (Musica, Jingle, Spot, Podcast) basata su ID3 tags, nomi file e keyword.
*   **Step 2 - Creazione Rotazione Base:** Interfaccia a blocchi ("Lego"). Es: `[Musica] -> ogni 3 brani -> [Jingle]`. Regole attivate da toggle semplici ("Alterna artisti") senza gergo tecnico.
*   **Step 3 - Promozioni:** Configurazione rapida degli spot (Ogni X brani o orari fissi tramite slider).
*   **Step 4 - Avvio:** Tasto "Avvia Automazione". La radio è in onda.

### 4.2. Dashboard Principale
Layout leggibile da 2 metri di distanza:
*   **Sinistra:** Media Library categorizzata.
*   **Centro:** Playlist in onda (dinamica e viva, con spiegazione del "Perché" arriverà un determinato brano).
*   **Destra:** Mixer / Controlli DSP.
*   **Alto:** Stato di sistema visibile (LIVE / AUTO / OFF, Brano Attuale, Next Event).

### 4.3. Scheduling ibrido ed Eventi Singoli
*   **L'Evento Singolo (Killer Feature):** Tasto rapido *"Riproduci questo file alle X:Y"*. Viene inserito nella coda automaticamente senza creare playlist.
*   **Calendario a Timeline:** Blocchi visivi invece di liste infinite (es. 10:00 Podcast, 11:00 Rotazione, 12:00 Spot).
*   **Hard vs Soft Priority:**
    *   *Hard:* Entra all'orario esatto (il motore audio calcola in anticipo se serve un fade-out morbido automatico per non tagliare il brano bruscamente).
    *   *Soft:* Attende la fine naturale del brano in onda.

### 4.4. Regia Manuale: Live Assist Mode
Si attiva con il tasto gigante **"🔴 VAI IN DIRETTA"**. Cambia l'intera UI:
*   **Playlist Live Centrale:** Drag & drop immediato, nessun automatismo aggressivo che sposta i brani.
*   **Asset Programma:** Categoria a vista fissa dedicata allo show in onda (Sigle, Effetti).
*   **Sottofondi Intelligenti:** Un'area dedicata per le basi parlate con: Loop automatico continuo, Volume Slider pre-configurato e funzione **Auto-Ducking** (quando lo speaker apre il canale microfonico, il sottofondo si abbassa automaticamente).

### 4.5. Audio Engine e DSP (Sotto il cofano)
*   Nessun vuoto (Gapless playback), crossfade intelligente e riconoscimento visivo/automatico del silenzio.
*   Mixaggio trasparente gestito da Rust.
*   Setup semplice tramite Preset (es. "Talk Radio", "Music Station") per gestire Loudness, Compressione ed EQ in base alla tipologia di stazione. Settings avanzati nascosti.

### 4.6. Error Handling
*   La trasmissione **non deve mai fermarsi**.
*   Se manca un file o cade una rete: il sistema applica un "Fallback invisibile" (pesca un brano sicuro) e salva un log silenzioso ("File non trovato → sostituito con fallback"). Nessun popup di errore distruttivo in primo piano.

---

## 5. BRAND IDENTITY & UI DESIGN

*   **Simbolo Grafico:** Una "R" arancione, pulita, moderna. (Rappresenta: Energia, creatività, onde sonore, distacco dai soliti grigi/blu del software legacy).
*   **Tema UI:** *Dark Mode First*. Sfondo grigio scurissimo / quasi nero (ossidiana/carbone) per riposare gli occhi durante le lunghe sessioni di regia.
*   **Colori di Accento:** Arancione per i loghi, blu/ciano elettrico per le funzioni di automazione, rosso corallo brillante per gli stati "On Air" e Live.
*   **Stile Generale:** Minimalista, design a blocchi sovrapposti, angoli arrotondati, icone piatte (Material/Apple Human Interface). **Zero Cliché radiofonici** (niente microfoni anni '50, vinili o equalizzatori 3D obsoleti). Deve sembrare un'app moderna di fascia alta (stile Figma, Notion, Spotify).