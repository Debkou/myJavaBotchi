/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Funktion zur Überprüfung des Zahlenschlosses
async function ueberpruefeZahlenschloss() {
    const eingabeElement = document.getElementById("eingabeGitter") as HTMLInputElement;
    const eingabe = eingabeElement.value.trim();
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;

    try {
        const response = await fetch(`https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=zahlenschloss`, {
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
            // Setze den Status der Gittertür auf false
            WA.state.statusGitterTuer = false;
        } else {
            ergebnisElement.innerHTML = `<p style="color: red;">${data.result}</p>`;
        }
    } catch (error) {
        ergebnisElement.innerHTML = `<p><span style="font-family: pokemon;" class="dBlau-font">Fehler:</span> <br> Fehler beim Überprüfen des Zahlenschlosses. Bitte versuche es später erneut.</p>`;
        console.error('Es gab ein Problem mit der Anfrage:', error);
    }
}

// Funktion zum Überprüfen des Gittertür-Status
function displayDoor(state: boolean) { 
    if (state === true) {
        WA.room.showLayer('gitterTuerZu');
        WA.room.hideLayer('gitterTuerAuf');
    } else {
        WA.room.hideLayer('gitterTuerZu');
        WA.room.showLayer('gitterTuerAuf');
    }
}

// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');

    displayDoor(WA.state.statusGitterTuer);

    // Überwache Änderungen des Türstatus
    WA.state.onVariableChange('statusGitterTuer').subscribe((statusGitterTuer) => {
        // Typ-Assertion um den Wert explizit in einen boolean zu konvertieren
        displayDoor(statusGitterTuer as boolean);
    });
    
    // Event-Listener für den "Gitter Tür" Button
    const gitterButton = document.getElementById("gitterTuer") as HTMLButtonElement;
    gitterButton.addEventListener("click", ueberpruefeZahlenschloss);

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
