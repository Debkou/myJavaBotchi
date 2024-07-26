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

// Function to open the note website if not already opened or make it visible if already opened
async function openNoteWebsite() {
    if (!noteWebsite) {
        noteWebsite = await WA.ui.website.open({
            url: "./menue.html",
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
        noteWebsite.setVisible(true); // Make visible if already created
    }
}

// Function to hide the note website if it's open
function hideNoteWebsite() {
    if (noteWebsite) {
        noteWebsite.setVisible(false);
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
        hideNoteWebsite();
    });

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
