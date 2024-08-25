/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Funktion zur Überprüfung des Zahlenschlosses
async function telefon() {
    const eingabeElement = document.getElementById("nummer") as HTMLInputElement;
    const eingabe = eingabeElement.value.trim();
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;

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
            ergebnisElement.innerHTML = `<p>${data.result}<br>
            <span style="font-color:#39659F;"><strong>Andreas:</strong></span>"hallo?"<br>
            <strong>Botchi:</strong>"Hallo Andreas! Hier ist Botchi. Ich habe ein Problem."<br>
            <strong>Andreas:</strong>"Gestern wieder zu viel gefeiert?"<br>
            <strong>Botchi:</strong>"Kann man so sagen. Ich bin scheinbar im Keller der Fh eingesperrt."<br>
            <strong>Andreas:</strong>"Ich komme und hole Dich raus! Das kann aber etwas dauern. Ich rufe Dich an, wenn ich da bin."<br>
            <strong>Sieh Dich um, bis du einen Anruf von Andreas bekommst.</strong><br></p>`;
    
           
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
    
    // Event-Listener für den "Gitter Tür" Button
    const nummerBtn = document.getElementById("nummerBtn") as HTMLButtonElement;
    nummerBtn.addEventListener("click", telefon);

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
