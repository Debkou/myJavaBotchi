/// <reference types="@workadventure/iframe-api-typings" />

console.log('Script started successfully');

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
// Import von ActionMessage entfernt, da es nicht verwendet wird

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
        console.log("Entering terminalAktion layer");

        WA.ui.modal.openModal({
            title: "Hauptmenue",
            src: './menue.html',
            allow: "fullscreen",
            allowApi: true,
            position: "center",
        });
    });

    WA.room.onEnterLayer("buecherAktion").subscribe(async () => {
        console.log("Entering buecherAktion layer");

        WA.ui.modal.openModal({
            title: "Bibliothek",
            src: './bibliothek.html',
            allow: "fullscreen",
            allowApi: true,
            position: "center",
        });
    });

    WA.room.onEnterLayer("aktionFlyer").subscribe(async () => {
        console.log("Entering aktionFlyer layer");

        WA.room.showLayer('magentaFlyer');
    });

    WA.room.onLeaveLayer("aktionFlyer").subscribe(async () => {
        console.log("Leaving aktionFlyer layer");

        WA.room.hideLayer('magentaFlyer');
    });

    WA.room.area.onEnter("feldTasteFlyer").subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um den Flyer zu sehen",
            callback: () => {
                WA.ui.modal.openModal({
                    title: "Bibliothek",
                    src: './flyer_party.html',
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                    closeCallback: () => {
                        console.info('The modal was closed');
                     }
                });
            }
        });

        WA.room.area.onLeave("feldTasteFlyer").subscribe(() => {
            triggerMessage.remove();
        });
    });

    // Die folgende Zeile initialisiert die Scripting API Extra-Bibliothek, 
    // die eine Reihe von erweiterten Eigenschaften/Funktionen für WorkAdventure hinzufügt
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
