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
            try {
                noteWebsite.close();
                console.log("Previous noteWebsite instance closed");
            } catch (error) {
                console.error("Error closing previous noteWebsite instance:", error);
            }
            noteWebsite = undefined;
        }

        try {
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
            console.log("noteWebsite opened successfully");
        } catch (error) {
            console.error("Error opening noteWebsite:", error);
        }
    });

    WA.room.onLeaveLayer("visibleNote").subscribe(() => {
        if (noteWebsite) {
            try {
                noteWebsite.close();
                console.log("noteWebsite closed successfully");
            } catch (error) {
                console.error("Error closing noteWebsite:", error);
            } finally {
                noteWebsite = undefined;  // Setze die Variable auf undefined, um den Zustand zu aktualisieren
            }
        }
    });

}).catch(e => console.error("Error during WA.onInit:", e));

export {};
