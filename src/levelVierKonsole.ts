import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');


// Funktion zur Überprüfung des Passworts
async function ueberpruefePasswort() {
    // Variablen für die Kontrolle des Passworts (aus der HTML Datei)
    const eingabeElement = document.getElementById("eingabe") as HTMLInputElement;
    const eingabe = eingabeElement.value.trim();
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;

    try {
         // Datenbank API-Abfrage
        const response = await fetch(`https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=Archiv`, {
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
            // Aktionen bei korrektem Ergebnis
             WA.room.hideLayer('schrankZu');
             WA.room.hideLayer('klausurBlock');
             WA.room.showLayer('schrankAuf');
             WA.room.showLayer('klausurBlock2');
            WA.room.showLayer('aktionKlausur');
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
    
    // Event-Listener für den "Konsole" Button
    const btKonsole = document.getElementById("btKonsole") as HTMLButtonElement;
    btKonsole.addEventListener("click", ueberpruefePasswort);

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
