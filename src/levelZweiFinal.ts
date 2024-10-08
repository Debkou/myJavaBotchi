import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);


   // Variablen für die Kontrolle des Passworts (aus der HTML Datei)
    const eingabeElement = document.getElementById("l2eingabe") as HTMLInputElement;
    const l2tButton = document.getElementById("l2tButton") as HTMLButtonElement;
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;

    // Funktion zur Überprüfung des Passworts
    async function ueberpruefePasswortl2() {
        // Zuweisung EIngabeelement und trim - löscht Leerzeichen am Anfang und am Ende
        const eingabe = eingabeElement.value.trim();

        try { 
            // Datenbank API-Abfrage
            const response = await fetch(`https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=LevelZweiTuer`, {
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

                // Der Wert der Eigenschaft "exitSceneUrl" von Ebene "enterZentrale" wird auf "zentrale.tmj" geändert
                WA.room.setProperty("enterZentrale", "exitSceneUrl", "zentrale.tmj");
                // Modal wird geschlossen
                WA.ui.modal.closeModal();
            
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
    l2tButton.addEventListener("click", ueberpruefePasswortl2);

    // Event-Listener für die Enter-Taste
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            ueberpruefePasswortl2();
        }
    });

   

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
