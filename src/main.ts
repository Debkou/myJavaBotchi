/// <reference types="@workadventure/iframe-api-typings" />

console.log('Script started successfully');

// Globale Deklaration der noteWebsite-Variable
let noteWebsite: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

    WA.room.onEnterLayer("visibleNote").subscribe(async () => {
        console.log("Entering visibleNote layer");

        // Überprüfen, ob noteWebsite bereits geöffnet ist und es schließen
        if (noteWebsite) {
            noteWebsite.close();
            noteWebsite = undefined;
        }

        noteWebsite = await WA.ui.website.open({
            url: "./note.html",
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

    });

    WA.room.onLeaveLayer("visibleNote").subscribe(() => {
        if (noteWebsite) {
            noteWebsite.close();
            noteWebsite = undefined;  // Setze die Variable auf undefined, um den Zustand zu aktualisieren
        }
    });

}).catch(e => console.error(e));

export {};
