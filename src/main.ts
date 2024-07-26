/// <reference types="@workadventure/iframe-api-typings" />

console.log('Script started successfully');

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

let currentPopup: any = undefined;

// Funktion zum Schließen des Popups
function closePopup() {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    });

    WA.room.area.onLeave('clock').subscribe(closePopup);

        WA.room.onEnterLayer("terminalAktion").subscribe(async () => {
        console.log("Entering visibleNote layer");

        WA.ui.modal.openModal({
            title: "WorkAdventure website",
            src: 'https://workadventu.re',
            allow: "fullscreen",
            allowApi: true,
            position: "center",
        });
    });

    // Die folgende Zeile initialisiert die Scripting API Extra-Bibliothek, 
    // die eine Reihe von erweiterten Eigenschaften/Funktionen für WorkAdventure hinzufügt
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
