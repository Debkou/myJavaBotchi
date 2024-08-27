/// <reference types="@workadventure/iframe-api-typings" />

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

aktionsFeld("areaTourGuide", "Drücke 'SPACE' um die ANleitung zu Öffnen", "Anleitung", './tourGuide.html');
aktionsEbene("terminalAktion", "Drücke 'SPACE' um das Hauptmenü zu Öffnen", "Hauptmenü", './menueHR.html'); 
aktionsEbene("buecherAktion", "Drücke 'SPACE' um die Bibliothek zu Öffnen", "Bibliothek", './bibliothek.html');  
aktionsFeld("feldTasteFlyer", "Drücke 'SPACE' um den Flyer zu sehen", "Bibliothek", './flyer_party.html');
aktionsFeld("feldTasteApi", "Drücke 'SPACE' um die Oracle Java API zu öffnen", "Oracle Java API", 'https://docs.oracle.com/en/java/javase/11/docs/api/');
aktionsFeld("feldTasteHin", "Drücke 'SPACE' um die Hinweise zu öffnen", "Hinweis anzeigen", './hinweis1.html'); 
aktionsFeld("feldTastePong", "Drücke 'SPACE' um PingPong zu spielen", "PingPong", 'https://www.spiele123.com/spiel/ping-pong');
aktionsFeld("feldAktionEingabe", "Drücke 'SPACE' um die Tür zu öffnen", "Passwort Eingabe", './eingabeTest.html');  
aktionsEbene("aktionFlur", "Drücke 'SPACE' um das Level zu betreten", "Flur", './levelEinsFinalEingabe.html');
aktionsEbene("aktionZentrale", "Drücke 'SPACE' um das Level zu betreten", "Flur", './levelZweiFinalEingabe.html'); 
aktionsEbene("aktionArchiv", "Drücke 'SPACE' um das Level zu betreten", "Flur", './levelVierZutritt.html'); 

    WA.room.onEnterLayer("aktionFlyer").subscribe(async () => {
        WA.room.showLayer('magentaFlyer');
    });

    WA.room.onLeaveLayer("aktionFlyer").subscribe(async () => {
        console.log("Leaving aktionFlyer layer");
        WA.room.hideLayer('magentaFlyer');
    });


    // Variablen für die Kontrolle des Passworts
    const eingabeElement = document.getElementById("eingabe") as HTMLInputElement;
    const submitButton = document.getElementById("submitButton") as HTMLButtonElement;
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;

    // Funktion zur Überprüfung des Passworts
    async function ueberpruefePasswort() {
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
                WA.room.setProperty("exitLevel1", "exitSceneUrl", "levelEins.tmj");
                WA.ui.modal.closeModal();
            
            } else {
                ergebnisElement.textContent = data.result;
                ergebnisElement.className = 'incorrect';
            }
        } catch (error) {
            ergebnisElement.textContent = 'Fehler beim Überprüfen des Passworts. Bitte versuche es später erneut.';
            ergebnisElement.className = 'error';
            console.error('Es gab ein Problem mit der Anfrage:', error);
        }
    }

    // Event-Listener für den Button
    submitButton.addEventListener("click", ueberpruefePasswort);

    // Event-Listener für die Enter-Taste
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            ueberpruefePasswort();
        }
    });

   

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
