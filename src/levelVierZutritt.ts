/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');


// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);


    // Hier kommt die Logik für die Passwortüberprüfung und das Einblenden der Ebene
    const eingabeElement = document.getElementById("eingabe") as HTMLInputElement;
    const vierBtn = document.getElementById("vierBtn") as HTMLButtonElement;
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;

    const name = 'EingangArchiv'; // Dieser Wert kann direkt in der HTML-Datei geändert werden

        async function ueberpruefePasswort() {
            const eingabe = document.getElementById('eingabe').value.trim();
            const ergebnis = document.getElementById('ergebnis');

            const response = await fetch(`https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=${encodeURIComponent(name)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ eingabe })
            });

            const data = await response.json();
            if (data.result === 'Korrekt!') {
                ergebnis.textContent = data.result;
                ergebnis.className = 'correct';
            } else {
                ergebnis.textContent = data.result;
                ergebnis.className = 'incorrect';
            }
        }
    // Event-Listener für den Button
    vierBtn.addEventListener("click", ueberpruefePasswort);

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
