/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');


// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');

   document.addEventListener('DOMContentLoaded', () => {
    // Den Button-Element selektieren
    const button = document.getElementById('btPhone');

    // Event-Listener für den Klick auf den Button hinzufügen
    button?.addEventListener('click', () => {
        // Die Funktion zum Ausblenden der Ebene aufrufen
       WA.room.area.onEnter("areaZentraleTuer").subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um die Tür zu öffnen",
            callback: () => {
                WA.ui.modal.openModal({
                    title: "Eintritt",
                    src: './levelZweiRad.html',
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });

        WA.room.area.onLeave("areaZentraleTuer").subscribe(() => {
            triggerMessage.remove();
        });
    });

    });
});
    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
