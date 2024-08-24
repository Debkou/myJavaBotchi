/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Funktion zur Registrierung des Aktionsbereichs
function aktionArea(
    areaName: string,
    messageText: string,
    menuTitle: string,
    menuSrc: string
): void {
    WA.room.area.onEnter(areaName).subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: messageText,
            callback: () => {
                WA.ui.modal.openModal({
                    title: menuTitle,
                    src: menuSrc,
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });

        WA.room.area.onLeave(areaName).subscribe(() => {
            triggerMessage.remove();
        });
    });
}

// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);

 document.getElementById("checkButton")?.addEventListener("click", () => {
    // Auswahl der Radio-Buttons überprüfen
    const question1Correct = (document.getElementById("option1-2") as HTMLInputElement).checked;
    const question2Correct = (document.getElementById("option2-2") as HTMLInputElement).checked;

    // Überprüfungsergebnis-Element
    const ergebnisElement = document.getElementById("ergebnis");

    if (question1Correct && question2Correct) {
        // Wenn beide Antworten korrekt sind
        ergebnisElement!.innerHTML = "<p>Korrekt!<br>Passwort: Reparieren</p>";
        
    } else {
        // Anzahl der richtigen und falschen Antworten berechnen
        let correctAnswers = 0;
        let incorrectAnswers = 0;

        if (question1Correct) {
            correctAnswers++;
        } else {
            incorrectAnswers++;
        }

        if (question2Correct) {
            correctAnswers++;
        } else {
            incorrectAnswers++;
        }

        // Anzeige der Anzahl der richtigen und falschen Antworten
        ergebnisElement!.innerHTML = `<p>Du hast ${correctAnswers} richtige und ${incorrectAnswers} falsche Antworten.</p><p>Bitte versuche es erneut.</p>`;
    }
});
    aktionArea("areaAnleitung", "Drücke 'SPACE' um die Anleitung zu lesen", "Anleitung", './levelZweiAnleitung.html');
    aktionArea("areaAnleitungCode", "Drücke 'SPACE' um den Code anzuzeigen", "AnleitungCode", './levelZweiHeizungCode.html');
    aktionArea("areaUhr", "Drücke 'SPACE' um den Code anzuzeigen", "AnleitungCode", './levelZweiGUIFail.html');
    aktionArea("areaTerminalEins", "Drücke 'SPACE' um das Hauptmenü zu öffnen", "Terminal", './menue.html'); 
    aktionArea("areaRad", "Drücke 'SPACE' um das Rad zu suchen", "Schrank", './levelZweiRad.html');
    aktionArea("areaInfoWagen", "Drücke 'SPACE' um den Wagen zu schieben.", "Wagen", './levelZweiWagen.html');
    aktionArea("areaInfoHandy", "Drücke 'SPACE' um die Info anzuzeigen.", "Fundbüro", './levelZweiFundbuero.html');
    aktionArea("areaAktionHandy", "Drücke 'SPACE' um den Schrank zu Öffnen", "Schrank", './levelZweiPhone.html');
    aktionArea("areaZentraleTuer", "Drücke 'SPACE' um die Tür zu Öffnen", "Haustechnik", './levelZweiFinalEingabe.html');

    // Hier kommt die Logik für die Passwortüberprüfung und das Einblenden der Ebene
    const eingabeElement = document.getElementById("l2eingabe") as HTMLInputElement;
    const l2Button = document.getElementById("l2Button") as HTMLButtonElement;
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;

    // Funktion zur Überprüfung des Passworts
    async function ueberpruefePasswort() {
        const eingabe = eingabeElement.value.trim();

        try {
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

                // Ebene aktionLevel1 einblenden
                WA.room.setProperty("enterZentrale", "exitSceneUrl", "zentrale.tmj");
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
    l2Button.addEventListener("click", ueberpruefePasswortl2);

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
