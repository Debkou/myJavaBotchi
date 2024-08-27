/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Funktion zur Registrierung des Aktionsbereichs
function aktionsFeld(
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

function aktionsEbene(
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
    aktionsFeld("areaAnleitung", "Drücke 'SPACE' um die Anleitung zu lesen", "Anleitung", './levelZweiAnleitung.html');
    aktionsFeld("areaAnleitungCode", "Drücke 'SPACE' um den Code anzuzeigen", "AnleitungCode", './levelZweiHeizungCode.html');
    aktionsFeld("areaUhr", "Drücke 'SPACE' um den Code anzuzeigen", "AnleitungCode", './levelZweiGUIFail.html');
    aktionsFeld("areaTerminalEins", "Drücke 'SPACE' um das Hauptmenü zu öffnen", "Terminal", './menue.html'); 
    aktionsFeld("areaRad", "Drücke 'SPACE' um das Rad zu suchen", "Schrank", './levelZweiRad.html');
    aktionsFeld("areaInfoWagen", "Drücke 'SPACE' um den Wagen zu schieben.", "Wagen", './levelZweiWagen.html');
    aktionsFeld("areaInfoHandy", "Drücke 'SPACE' um die Info anzuzeigen.", "Fundbüro", './levelZweiFundbuero.html');
    aktionsFeld("areaAktionHandy", "Drücke 'SPACE' um den Schrank zu Öffnen", "Schrank", './levelZweiPhone.html');
    aktionsFeld("areaZentraleTuer", "Drücke 'SPACE' um die Tür zu Öffnen", "Haustechnik", './levelZweiFinalEingabe.html');
    aktionsFeld("areaArchivTuer", "Drücke 'SPACE' um das Archiv zu Betreten", "Haustechnik", './levelVierZutritt.html');
    aktionsEbene("hinweisHeiz", "Drücke 'SPACE' um den Hinweis zu Öffnen", "Hinweis", './flurHinweisHeizraum.html');
    aktionsEbene("aktionTuerFinal", "Drücke 'SPACE' um das Spiel zu beenden", "Finale", './finaleEingabe.html');
    aktionsFeld("areaFotoFlur", "Drücke 'SPACE' um die Bilder anzuschauen", "Flur", './flurBilder.html');
    aktionsFeld("areaFotoHeizung", "Drücke 'SPACE' um die Bilder anzuschauen", "Heizung", './heizungBilder.html');
    aktionsFeld("areaFotoBunker", "Drücke 'SPACE' um die Bilder anzuschauen", "Bunker", './bunkerBilder.html');
    aktionsFeld("areaFotoTreppe", "Drücke 'SPACE' um die Bilder anzuschauen", "Treppe", './treppeBild.html');
    


    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
