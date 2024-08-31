/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');


// Funktion zur Überprüfung der eingegebenen Temperatur
async function ueberpruefeTemperatur() {
    // Variablen für die Kontrolle des Passworts (aus der HTML Datei)
    const eingabeElement = document.getElementById("temperatureInput") as HTMLInputElement;
    const eingabe = eingabeElement.value.trim();
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;

    try {
       // Datenbank API-Abfrage
        const response = await fetch(`https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=Heizung`, {
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
            // Bei korrekter EIngabe wird des Schrank vom Dampf freigegeben
            // Ebene Dampf wird ausgeblendet
            WA.room.hideLayer('dampf');
            // Sperre der Ebene wird ausgeblendet
            WA.room.hideLayer('gitterSperre');
                  setTimeout(() => {
                WA.ui.modal.closeModal();
            }, 2000); //Wartezeit
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
    
    // Event-Listener für den Button
    const gitterButton = document.getElementById("ueberpruefeBtn") as HTMLButtonElement;
    gitterButton.addEventListener("click", ueberpruefeTemperatur);

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
