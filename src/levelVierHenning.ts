import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');


// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');

   document.addEventListener('DOMContentLoaded', () => {

    // Variable für die Buttons aus der Henning-HTML-Datei   
    const button = document.getElementById('btBuch');
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;
    // Event-Listener Button
    button?.addEventListener('click', () => {
    ergebnisElement.innerHTML = `<p">Du hast das Buch herausgezogen!</p>`;
        // Aktionen nach klicken des Buttons
        //EBene "aktenschrankBlock" wird ausgeblendet - Block der Ebene somit aufgehoben
        WA.room.hideLayer('aktenschrankBlock');
        // Ebene "aktionAKtenschrank" wird eingeblendet
        WA.room.showLayer('aktionAktenschrank');
        // Ebene "AKtenschrankOffen" wird eingeblendet
        WA.room.showLayer('aktenschrankOffen');
    });
});
    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
