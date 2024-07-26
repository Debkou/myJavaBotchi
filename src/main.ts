/// <reference types="@workadventure/iframe-api-typings" />

console.log('Script started successfully');

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

let currentPopup: any = undefined;
let noteWebsite: any = undefined;

// Function to close the popup
function closePopup() {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

// Function to open the note website if not already opened
async function openNoteWebsite() {
    if (!noteWebsite) {
        noteWebsite = await WA.ui.website.open({
            url: "https://javabotchi.kunst-werk-hagen.de/menue.html",
            visible: true,
            position: {
                vertical: "top",
                horizontal: "middle",
            },
            size: {
                height: "30vh",
                width: "50vw",
            },
            margin: {
                top: "10vh",
            },
            allowApi: true,
        });
    } else {
        noteWebsite.open(); // Open if already created
    }
}

// Function to close the note website if it's open
function closeNoteWebsite() {
    if (noteWebsite) {
        noteWebsite.close();
        noteWebsite = undefined;
    }
}

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

    WA.room.area.onEnter('clock').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup", "It's " + time, []);
    });

    WA.room.area.onLeave('clock').subscribe(closePopup);

    WA.room.onEnterLayer("terminalAktion").subscribe(() => {
        console.log("Entering visibleNote layer");
        openNoteWebsite();
    });

    WA.room.onLeaveLayer("terminalAktion").subscribe(() => {
        console.log("Leaving visibleNote layer");
        closeNoteWebsite();
    });

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
