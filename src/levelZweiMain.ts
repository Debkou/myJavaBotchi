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
    aktionArea("areaTerminal1", "Drücke 'SPACE' um das Hauptmenü zu öffnen", "Terminal", './menue.html');
    aktionArea("areaRad", "Drücke 'SPACE' um das Rad zu suchen", "Schrank", './levelZweiRad.html');
    aktionArea("areaInfoWagen", "Drücke 'SPACE' um den Wagen zu schieben.", "Wagen", './levelZweiWagen.html');

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
