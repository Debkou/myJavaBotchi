/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

function aktionsFeld(
    areaName: string,
    messageText: string,
    menuTitle: string,
    menuSrc: string
): void {
    WA.room.onEnterLayer(areaName).subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: messageText,
            callback: () => {
                WA.ui.modal.openModal({
                    title: menuTitle,
                    src: menuSrc,
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });

        WA.room.onLeaveLayer(areaName).subscribe(() => {
            triggerMessage.remove();
        });
    });
}



// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

    aktionsFeld("areaAktionUhr1", "Drücke 'SPACE' um die Temperatur einzustellen", "Heizung", './levelZweiGUIFail.html');
   

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
