/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');


// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);


    // Hier kommt die Logik für die Passwortüberprüfung und das Einblenden der Ebene
    const eingabeElement = document.getElementById("eingabe") as HTMLInputElement;
    const finalBtn = document.getElementById("finalBtn") as HTMLButtonElement;
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;

    // Funktion zur Überprüfung des Passworts
    async function ueberpruefePasswort() {
        const eingabe = eingabeElement.value.trim();

        try {
            const response = await fetch(`https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=finale`, {
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
                WA.room.setProperty("aktionTuerFinal", "exitSceneUrl", "hauptraum.tmj");
              
            
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
    finalBtn.addEventListener("click", ueberpruefePasswort);

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
