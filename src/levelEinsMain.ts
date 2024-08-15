/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');


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

   WA.room.area.onEnter("areaAktionTerminal").subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um das Hauptmenü zu öffnen",
            callback: () => {
                WA.ui.modal.openModal({
                    title: "Terminal",
                    src: './menue.html',
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });

        WA.room.area.onLeave("areaAktionTerminal").subscribe(() => {
            triggerMessage.remove();
        });
    });

       WA.room.area.onEnter("areaAktionGitter").subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um die Tür zu öffnen",
            callback: () => {
                WA.ui.modal.openModal({
                    title: "Gittertür",
                    src: './levelEinsGitter.html',
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });

        WA.room.area.onLeave("areaAktionGitter").subscribe(() => {
            triggerMessage.remove();
        });
    });


    // Funktion zur Überprüfung des Passworts
    async function ueberpruefePasswort() {
        const eingabeElement = document.getElementById("eingabefenster") as HTMLTextAreaElement;
        const eingabe = eingabeElement.value.trim();
        const ergebnisElement = document.getElementById("textContainer") as HTMLElement;

        try {
            const response = await fetch(`https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=LichttAn`, {
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
                }, 3000); // 2000 Millisekunden = 2 Sekunden
            } else {
                ergebnisElement.innerHTML += `<p><span style="font-family: pokemon;" class="dBlau-font">Alexa:</span> <br> ${data.result}</p>`;
            }
        } catch (error) {
            ergebnisElement.innerHTML += `<p><span style="font-family: pokemon;" class="dBlau-font">Fehler:</span> <br> Fehler beim Überprüfen des Passworts. Bitte versuche es später erneut.</p>`;
            console.error('Es gab ein Problem mit der Anfrage:', error);
        }
    }

    // Event-Listener für den "Licht an" Button
    const lichtButton = document.getElementById("lichtButton") as HTMLButtonElement;
    lichtButton.addEventListener("click", ueberpruefePasswort);
   

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
