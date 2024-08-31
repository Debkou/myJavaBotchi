import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');

   document.addEventListener('DOMContentLoaded', () => {
    // Variablen für die Kontrolle des Passworts (aus der HTML Datei)
    const button = document.getElementById('btRad');
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;

    // Event-Listener für den Button 
    button?.addEventListener('click', () => {
    ergebnisElement.innerHTML = `<p">Du hast das Rad eingesteckt!</p>`;
        // Ebene "WagenVor" wird ausgeblendet
        WA.room.hideLayer('wagenVor');
        // Ebene "WagenWeg" wird eingeblendet
        WA.room.showLayer('wagenWeg');
        // Sperre wird ausgeblendet
        WA.room.hideLayer('wagenSperre');
        // Area "areaInfoWagen" wird gelöscht
        WA.room.area.delete('areaInfoWagen');
    });
});
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
