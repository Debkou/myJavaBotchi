/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');

   document.addEventListener('DOMContentLoaded', () => {
    
    const button = document.getElementById('btRad');
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;

    // Event-Listener für den Button 
    button?.addEventListener('click', () => {
    ergebnisElement.innerHTML = `<p">Du hast das Rad eingesteckt!</p>`;
        // Die Funktion zum Ausblenden der Ebene aufrufen
        WA.room.hideLayer('wagenVor');
        WA.room.showLayer('wagenWeg');
        WA.room.hideLayer('wagenSperre');
        WA.room.area.delete('areaInfoWagen');
    });
});
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
