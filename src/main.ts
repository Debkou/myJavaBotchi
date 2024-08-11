/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

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
                    title: "Flyer",
                    src: './flyer_party.html',
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });

        WA.room.area.onLeave("feldTasteFlyer").subscribe(() => {
            triggerMessage.remove();
        });
    });

    WA.room.area.onEnter("feldTasteApi").subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um die Oracle Java API zu öffnen",
            callback: () => {
                WA.ui.modal.openModal({
                    title: "Oracle Java API",
                    src: 'https://docs.oracle.com/en/java/javase/11/docs/api/',
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });

        WA.room.area.onLeave("feldTasteApi").subscribe(() => {
            triggerMessage.remove();
        });
    });

    WA.room.area.onEnter("feldTasteHin").subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um die Hinweise zu öffnen",
            callback: () => {
                WA.ui.modal.openModal({
                    title: "Hinweis",
                    src: './hinweise.html',
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });

        WA.room.area.onLeave("feldTasteHin").subscribe(() => {
            triggerMessage.remove();
        });
    });

    WA.room.area.onEnter("feldTastePong").subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um PingPong zu spielen",
            callback: () => {
                WA.ui.modal.openModal({
                    title: "PingPong",
                    src: 'http://de.pong-2.com/',
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });

        WA.room.area.onLeave("feldTastePong").subscribe(() => {
            triggerMessage.remove();
        });
    });

    WA.room.area.onEnter("feldAktionEingabe").subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um die Tür zu öffnen",
            callback: () => {
                WA.ui.modal.openModal({
                    title: "Passwort Eingabe",
                    src: './eingabeTest.html', // Dein HTML-Dokument
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });

        WA.room.area.onLeave("feldAktionEingabe").subscribe(() => {
            triggerMessage.remove();
        });
    });

    // Hier kommt die Logik für die Passwortüberprüfung und das Einblenden der Ebene
    const eingabeElement = document.getElementById("eingabe") as HTMLInputElement;
    const submitButton = document.getElementById("submitButton") as HTMLButtonElement;
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;

    submitButton.addEventListener("click", async () => {
        const eingabe = eingabeElement.value.trim();

        try {
            const response = await fetch(`https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=einstieg`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ eingabe })
            });

            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok.');
            }

            const data = await response.json();

            if (data.result === 'Korrekt!') {
                ergebnisElement.textContent = data.result;
                ergebnisElement.className = 'correct';

                // Ebene aktionLevel1 einblenden
                WA.room.setProperty("exitLevel1", "exitSceneUrl", "office.tmj");
            
            } else {
                ergebnisElement.textContent = data.result;
                ergebnisElement.className = 'incorrect';
            }
        } catch (error) {
            ergebnisElement.textContent = 'Fehler beim Überprüfen des Passworts. Bitte versuche es später erneut.';
            ergebnisElement.className = 'error';
            console.error('Es gab ein Problem mit der Anfrage:', error);
        }
    });

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
