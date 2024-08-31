import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

//Bereich für das Ergebnis aus der HTML-Datei
const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;

// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');

   document.addEventListener('DOMContentLoaded', () => {
    // Button aus der HTML-Datei
    const button = document.getElementById('btKoala');

    // Event-Listener für den Klick auf den Button 
    button?.addEventListener('click', () => {
        ergebnisElement.innerHTML = `<p">Du hast den Koala genommen!</p>`;
        //Aktion nach dem klicken des Buttons
        // Ebene "kassenBandBlock" ausblenden - ebene wird freigegeben
        WA.room.hideLayer('kassenBandBlock');
        // Ebene "AktionKassenband" einblenden
        WA.room.showLayer('aktionKassenband');
    });
});
    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
