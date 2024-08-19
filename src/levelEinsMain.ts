/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

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

// Funktion zur Überprüfung des Passworts
async function ueberpruefePasswort() {
    const eingabeElement = document.getElementById("eingabefenster") as HTMLTextAreaElement;
    const eingabe = eingabeElement.value.trim();
    const ergebnisElement = document.getElementById("textContainer") as HTMLElement;

    try {
        const response = await fetch('https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=LichttAn', {
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
            ergebnisElement.innerHTML += `<p><span style="font-family: pokemon;" class="dBlau-font">Alexa:</span> <br> ${data.result}</p>`;
            ergebnisElement.innerHTML += `<p>Das Licht geht an!</p>`;

            WA.room.hideLayer('dunkel');
            // Nach einer kurzen Wartezeit das Modal schließen
            setTimeout(() => {
                WA.ui.modal.closeModal();
            }, 3000); // 3000 Millisekunden = 3 Sekunden
        } else {
            ergebnisElement.innerHTML += `<p><span style="font-family: pokemon;" class="dBlau-font">Alexa:</span> <br> ${data.result}</p>`;
        }
    } catch (error) {
        ergebnisElement.innerHTML += `<p><span style="font-family: pokemon;" class="dBlau-font">Fehler:</span> <br> Fehler beim Überprüfen des Passworts. Bitte versuche es später erneut.</p>`;
        console.error('Es gab ein Problem mit der Anfrage:', error);
    }
}

// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

    WA.ui.modal.openModal({
        title: "Licht Eingabe",
        src: './levelEinsLicht.html',
        allow: "fullscreen",
        allowApi: true,
        position: "center",
    });

    aktionsFeld("areaAktionTerminal", "Drücke 'SPACE' um das Hauptmenü zu öffnen", "Terminal", './menue.html');
    aktionsFeld("p1a", "Drücke 'SPACE' um den Hinweis zu öffnen", "Terminal", './postIt1a.html');
    aktionsFeld("p1b", "Drücke 'SPACE' um den Hinweis zu öffnen", "Terminal", './postIt1b.html');
    aktionsFeld("p2a", "Drücke 'SPACE' um den Hinweis zu öffnen", "Terminal", './postIt2a.html');
    aktionsFeld("p2b", "Drücke 'SPACE' um den Hinweis zu öffnen", "Terminal", './postIt2b.html');
    aktionsFeld("p3a", "Drücke 'SPACE' um den Hinweis zu öffnen", "Terminal", './postIt3a.html');
    aktionsFeld("p3b", "Drücke 'SPACE' um den Hinweis zu öffnen", "Terminal", './postIt3b.html');
    aktionsFeld("p4a", "Drücke 'SPACE' um den Hinweis zu öffnen", "Terminal", './postIt4a.html');
    aktionsFeld("p4b", "Drücke 'SPACE' um den Hinweis zu öffnen", "Terminal", './postIt4b.html');
    aktionsFeld("areaAktionGitter", "Drücke 'SPACE' um die Tür zu öffnen", "Gittertür", './levelEinsGitter.html');
    aktionsFeld("aktionSchlueSchrank", "Drücke 'SPACE' um den Schlüsselschrank zu öffnen", "Tresor", './levelEinsTresor.html');

    // Event-Listener für den "Licht an" Button
    const lichtButton = document.getElementById("lichtButton") as HTMLButtonElement;
    lichtButton.addEventListener("click", ueberpruefePasswort);


    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};