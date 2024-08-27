/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');
const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;

// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');

   document.addEventListener('DOMContentLoaded', () => {
    // Den Button-Element selektieren
    const button = document.getElementById('btKoala');

    // Event-Listener für den Klick auf den Button hinzufügen
    button?.addEventListener('click', () => {
        ergebnisElement.innerHTML = `<p">Du hast den Koala genommen!</p>`;
        WA.room.hideLayer('kassenBandBlock');
        WA.room.showLayer('aktionKassenband');
    });
});
    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
