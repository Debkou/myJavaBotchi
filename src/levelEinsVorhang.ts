/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

async function vorhang(){
    WA.room.hideLayer('vorhangZu');
    WA.room.showLayer('vorhangAuf');
    WA.room.hideLayer('vorhangWand');
} 

// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);


    const vorhangButton = document.getElementById("btVorhang") as HTMLButtonElement;
    vorhangButton.addEventListener("click", vorhang);

   WA.room.area.onEnter("aktionHaken").subscribe(async () => {
    WA.room.showLayer('hakenMagenta');
    });

    WA.room.area.onLeave("aktionHaken").subscribe(async () => {
     WA.room.hideLayer('hakenMagenta');
    });

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
