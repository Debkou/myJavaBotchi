import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');

   document.addEventListener('DOMContentLoaded', () => {
    // Variablen für den Button aus der HTML-Datei
    const button = document.getElementById('btPhone');
    const ergebnisElement = document.getElementById("Passwort") as HTMLElement;

    // Event-Listener für den Klick auf den Button hinzufügen
    button?.addEventListener('click', () => {
    // Nach dem klicken des Buttons wird das Ergebnis angezeigt
    ergebnisElement.innerHTML = `<p> <br> Zutritt Haustechnik: Frikadelle</p>`;

    });
});
    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
