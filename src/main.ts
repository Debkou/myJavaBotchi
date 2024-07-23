/// <reference types="@workadventure/iframe-api-typings" />

console.log('Script started successfully');

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

let currentPopup: WA.Popup | undefined = undefined;
let noteWebsite: WA.Website | undefined = undefined;
const closeButton = document.getElementById("closeButton") as HTMLButtonElement | null; 

// Funktion zum Schließen des Popups
function closePopup() {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
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

    WA.room.onEnterLayer("visibleNote").subscribe(async () => {
        console.log("Entering visibleNote layer");

        try {
            noteWebsite = await WA.ui.website.open({
                url: "./menue.html",
                position: {
                    vertical: "top",
                    horizontal: "middle",
                },
                size: {
                    height: "60vh",
                    width: "20vw",
                },
                margin: {
                    top: "10vh",
                },
                allowApi: true,
            });
        } catch (e) {
            console.error("Error opening website:", e);
        }
    });

    WA.room.onLeaveLayer("visibleNote").subscribe(() => {
        if (noteWebsite && typeof noteWebsite.close === 'function') {
            noteWebsite.close();
            noteWebsite = null; // Setzen Sie die Variable auf null, um anzuzeigen, dass sie geschlossen wurde
        }
    });

    if (closeButton) {
        closeButton.addEventListener("click", () => {
            if (noteWebsite && typeof noteWebsite.close === 'function') {
                noteWebsite.close();
                noteWebsite = null;
            }
        });
    } else {
        console.warn("Close button not found");
    }

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
