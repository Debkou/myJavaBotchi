/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

function telefon(state: boolean) {
    // Handler für den Eintritt in die Area
    const onEnterHandler = () => {
        // Erzeuge die Action Message
        const triggerMessage = WA.ui.displayActionMessage({
            message: messageText,
            callback: () => {
                // Bestimme die Modalquelle basierend auf dem State
                const modalSrc = state ? './menue.html' : './levelEinsGitter.html';
                WA.ui.modal.openModal({
                    title: "Telefon",
                    src: modalSrc,
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });

        // Handler für das Verlassen der Area
        const onLeaveHandler = () => {
            triggerMessage.remove();
        };

        // Abonniere den onLeave-Handler, um die Action Message zu entfernen
        WA.room.area.onLeave("areaTelefon").subscribe(onLeaveHandler);
    };

    // Abonniere den onEnter-Handler für die Area
    WA.room.area.onEnter("areaTelefon").subscribe(onEnterHandler);
}

// Funktion zur Registrierung des Aktionsbereichs
function aktionArea(
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

// Funktion zur Überprüfung des Zahlenschlosses
async function phoneCode() {
    const eingabeElement = document.getElementById("code") as HTMLInputElement;
    const eingabe = eingabeElement.value.trim();
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;

    try {
        const response = await fetch(`https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=PhoneCode`, {
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
            ergebnisElement.innerHTML = `<p style="color: green;">${data.result}</p>`;
            // Ändere den Status der Gittertür
          aktionArea("areaTelefon", "Drücke 'SPACE' um das Telefon zu nutzen", "Telefon", './levelDreiBrute.html');
                  setTimeout(() => {
                WA.ui.modal.closeModal();
            }, 3000); // 3000 Millisekunden = 3 Sekunden
        } else {
            ergebnisElement.innerHTML = `<p style="color: red;">${data.result}</p>`;
        }
    } catch (error) {
        ergebnisElement.innerHTML = `<p><span style="font-family: pokemon;" class="dBlau-font">Fehler:</span> <br> Fehler beim Überprüfen des Zahlenschlosses. Bitte versuche es später erneut.</p>`;
        console.error('Es gab ein Problem mit der Anfrage:', error);
    }
}


// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);
    telefon(WA.state.phone);
       WA.state.onVariableChange('phone').subscribe((phoneState) => {
        // Each time the "doorState" variable changes, we call the "displayDoor" function to update the door image visually.
        telefon(phoneState as boolean);
    });
    aktionArea("areaTerminal", "Drücke 'SPACE' um das Hauptmenü zu öffne", "Hauptmenü", './menue.html');
    aktionArea("areaLadekabel", "Drücke 'SPACE' um dein Handy zu laden", "Ladekabel", './levelDreiBrute.html');

      WA.room.area.onEnter("areaLadekabel").subscribe(() => {
      WA.room.showLayer("magentaKabel");
    });
       WA.room.area.onLeave("areaLadekabel").subscribe(() => {
      WA.room.hideLayer("magentaKabel");
    });

      const codeBtn = document.getElementById("codeBtn") as HTMLButtonElement;
    codeBtn.addEventListener("click", phoneCode);

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
