/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Variable zur Steuerung des Verhaltens beim Betreten des Layers
let isTestPassed: boolean = true; // Standardwert: true

function aktionsFeld(
    areaName: string,
    messageText: string,
    menuTitle: string,
    menuSrc: string
): void {
    WA.room.onEnterLayer(areaName).subscribe(() => {
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

        WA.room.onLeaveLayer(areaName).subscribe(() => {
            triggerMessage.remove();
        });
    });
}

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

    // Funktion zur Überprüfung der Antworten
    function checkAnswers() {
        const question1 = document.querySelector('input[name="question1"]:checked') as HTMLInputElement;
        const question2 = document.querySelector('input[name="question2"]:checked') as HTMLInputElement;

        if (question1 && question2) {
            let score = 0;

            if (question1.value === "correct") {
                score++;
            }

            if (question2.value === "correct") {
                score++;
            }

            const ergebnisDiv = document.getElementById('ergebnis');
            if (score === 2) {
                ergebnisDiv!.innerText = "Alle Antworten sind korrekt!";

                // Setze die Variable auf false
                isTestPassed = false;

            } else {
                ergebnisDiv!.innerText = "Du hast " + score + " von 2 Fragen richtig beantwortet.";
            }
        } else {
            alert("Bitte wähle eine Antwort für jede Frage aus.");
        }
    }

    // Event-Listener für den Button
    const button = document.getElementById('checkButton');
    if (button) {
        button.addEventListener('click', checkAnswers);
    }

    // Entscheidet, welches Aktionsfeld aktiviert wird basierend auf dem Wert von isTestPassed
    if (isTestPassed) {
        aktionsFeld("areaAktionUhr1", "Drücke 'SPACE' um die Temperatur einzustellen", "Heizung", './levelZweiGUIFail.html');
    } else {
        aktionsFeld("areaAktionUhr1", "Drücke 'SPACE' um die Temperatur einzustellen", "Heizung", './levelEinsTresor.html');
    }

     aktionArea("areaAnleitung", "Drücke 'SPACE' um die Anleitung zu lesen", "Anleitung", './levelZweiAnleitung.html');
    aktionArea("areaAnleitungCode", "Drücke 'SPACE' um die Temperatur einzustellen", "Heizung", './levelZweiHeizungCode.html');

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};