# NEXUS-7 · Demo Play-by-Chat sci-fi

Prototipo di interfaccia per un gioco di ruolo testuale in tempo reale: layout a tre colonne, estetica sci-fi/tattica, chat multi-stanza.

## Funzionalità
- Accesso con creazione rapida del personaggio (nome, fazione, classe, colore)
- Scheda personaggio con barre di stato e caratteristiche
- Settori (stanze) con descrizione d'ambientazione e notifiche dei messaggi non letti
- Messaggi di tipo **dialogo**, **azione**, **off-game** e **tiro di dado d20** (anche con il comando `/d20 motivo`)
- Indicatore "sta scrivendo", utenti online con posizione, registro di bordo

## Avvio

### Modalità multi-utente (Socket.io)
```bash
npm install
npm start
```
Apri http://localhost:3000 in più browser o schede.

### Modalità rapida (senza server)
Apri `index.html` direttamente nel browser: le schede dello stesso browser si sincronizzano tra loro tramite BroadcastChannel.

## Stack
Vue 3 · HTML5 · CSS3 · Node.js · Express · Socket.io
