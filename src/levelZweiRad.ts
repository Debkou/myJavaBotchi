/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');


// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');

   document.addEventListener('DOMContentLoaded', () => {
    // Den Button-Element selektieren
    const button = document.getElementById('btRad');

    // Event-Listener für den Klick auf den Button hinzufügen
    button?.addEventListener('click', () => {
        // Die Funktion zum Ausblenden der Ebene aufrufen
        WA.room.hideLayer('wagenVor');
        WA.room.showLayer('wagenWeg');
    });
});
    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
