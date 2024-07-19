/// <reference types="@workadventure/iframe-api-typings" />

console.log('Script started successfully');

// Deklarieren Sie die Variable noteWebsite außerhalb der WA.onInit()-Funktion
let noteWebsite: any;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');

    WA.room.onEnterLayer("visibleNote").subscribe(async () => {
        console.log("Entering visibleNote layer");

        noteWebsite = await WA.ui.website.open({
            url: "https://github.com/Debkou/myJavaBotchi/blob/master/src/note.html",
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
        if (noteWebsite && typeof noteWebsite.close === 'function') {
            noteWebsite.close();
            noteWebsite = null; // Setzen Sie die Variable auf null, um anzuzeigen, dass sie geschlossen wurde
        }
    });

}).catch(e => console.error(e));

export {};
