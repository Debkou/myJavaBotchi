import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');
  // Variablen für das Anzeigen des Ergebnisses (Aus der HTML)
const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;
// Funktion zur Veränderung des Vorhangs bei klicken des Buttons
async function vorhang(){
    WA.room.hideLayer('vorhangZu');
    WA.room.showLayer('vorhangAuf');
    WA.room.hideLayer('vorhangWand');
    ergebnisElement.innerHTML = `<p">Du hast den Vorhang geöffnet!</p>`;
} 

// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

    // Button zum nehmen des Hakens (Aus der HTML)
    const vorhangButton = document.getElementById("btVorhang") as HTMLButtonElement;
    vorhangButton.addEventListener("click", vorhang);
    
    
    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
