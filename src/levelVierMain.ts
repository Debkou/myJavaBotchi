import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');
// Funktion Erstellung Modal (Area)
function aktionsFeld(
    areaName: string,
    messageText: string,
    menuTitle: string,
    menuSrc: string
): void {
    WA.room.area.onEnter(areaName).subscribe(() => {
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

        WA.room.area.onLeave(areaName).subscribe(() => {
            triggerMessage.remove();
        });
    });
}
// Funktion Erstellung Modal (Ebene)
function aktionsEbene(
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

    // Erstellung der jeweilligen Aktions-Fenster
    aktionsEbene("aktionTerminal", "Drücke 'SPACE' um das Hauptmenü zu öffnen", "Hauptmenü", './menue.html');
    aktionsFeld("areaErnest", "Drücke 'SPACE' um das Buch zu nehmen", "Ernest", './levelVierHenning.html');
    aktionsFeld("areaKoala", "Drücke 'SPACE' um den Inhalt anzuschauen", "Koala", './levelVierKoala.html');
    aktionsFeld("areaFuenf", "Drücke 'SPACE' um den Zettel anzuschauen", "Zettel", './levelVierFue.html');
    aktionsFeld("areaMaschine", "Drücke 'SPACE' um diw Konsole zu Öffnen", "Zettel", './levelVierKonsole.html');
    aktionsEbene("aktionAktenschrank", "Drücke 'SPACE' um das Dokument zu Öffnen", "Aktenschrank", './levelVierArray.html');
    aktionsEbene("aktionKassenband", "Drücke 'SPACE' um den Hinweis zu lesen", "Aktenschrank", './levelVierKasse.html');
    aktionsEbene("hinweis", "Drücke 'SPACE' um den Hinweis zu Öffnen", "Hinweis", './levelVierHinweis.html');
    aktionsFeld("areaKlausur", "Drücke 'SPACE' um die Klausur anzusehen", "Klausur", './levelVierKlausur.html');

    // Aktion Tür start
      WA.room.onEnterLayer("aktionTuer").subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um den Flur zu betreten",
            callback: () => {
                WA.room.setProperty("aktionTuer", "exitSceneUrl", "flur.tmj");
            }
        });
         
        WA.room.onLeaveLayer("aktionTuer").subscribe(() => {
            triggerMessage.remove();
        });
    });
    // Aktion Tür ende

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
