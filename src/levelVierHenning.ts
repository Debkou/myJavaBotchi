/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');


// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');

   document.addEventListener('DOMContentLoaded', () => {

    const button = document.getElementById('btBuch');
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;
    // Event-Listener Button
    button?.addEventListener('click', () => {
    ergebnisElement.innerHTML = `<p">Du hast das Buch herausgezogen!</p>`;
        WA.room.hideLayer('aktenschrankBlock');
        WA.room.showLayer('aktionAktenschrank');
        WA.room.showLayer('aktenschrankOffen');
    });
});
    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
