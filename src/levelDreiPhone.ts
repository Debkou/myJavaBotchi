/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Funktion zur Überprüfung des Zahlenschlosses
async function telefon() {
    const eingabeElement = document.getElementById("nummer") as HTMLInputElement | null;
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement | null;

    if (!eingabeElement || !ergebnisElement) {
        console.error('Eingabe- oder Ergebnis-Element fehlt im DOM.');
        return;
    }

    const eingabe = eingabeElement.value.trim();

    try {
        const response = await fetch(`https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=Telefonnummer`, {
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

            // Schließe das Modal nach 4 Sekunden
            setTimeout(() => {
                if (WA.ui && WA.ui.modal) {
                    WA.ui.modal.closeModal();
                } else {
                    console.error('WA.ui.modal ist nicht verfügbar.');
                }
            }, 4000); // 4000 Millisekunden = 4 Sekunden
        } else {
            ergebnisElement.innerHTML = `<p style="color: red;">${data.result}</p>`;
        }
    } catch (error) {
        if (ergebnisElement) {
            ergebnisElement.innerHTML = `<p><span style="font-family: pokemon;" class="dBlau-font">Fehler:</span> <br> Fehler beim Überprüfen des Zahlenschlosses. Bitte versuche es später erneut.</p>`;
        }
        console.error('Es gab ein Problem mit der Anfrage:', error);
    }
}

// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

    const telBtn = document.getElementById("nummerBtn") as HTMLButtonElement | null;
    if (telBtn) {
        telBtn.addEventListener("click", telefon);
    } else {
        console.error('Button-Element fehlt im DOM.');
    }

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
