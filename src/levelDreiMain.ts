import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Funktion Erstellung Modal (Area)
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

// Funktion Erstellung Modal (Ebene)
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

// Funktion zur Überprüfung des Entsperrcodes
async function phoneCode() {
    // Variablen für die Kontrolle des Codes(aus der HTML Datei)
    const eingabeElement = document.getElementById("code") as HTMLInputElement;
    const eingabe = eingabeElement.value.trim();
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;

    try {
         // Datenbank API-Abfrage
        const response = await fetch(`https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=PhoneCode`, {
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
            ergebnisElement.innerHTML = `<p>"Na Super! Kein Empfang. Ich brauche ein Telefon!"</p>`;
            // Ebene "aktionTelefon" wird eingeblendet
            WA.room.showLayer("aktionTelefon"); 
            // Ebene "blockTelefon" wird ausgeblendet
            WA.room.hideLayer("blockTelefon"); 
            setTimeout(() => {
                // Modal wird geschlossen
                WA.ui.modal.closeModal();
            }, 4000); // Wartezeit
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
    console.log('Player tags: ', WA.player.tags); 
    // Erstellung der jeweilligen Aktions-Fenster
    aktionsFeld("areaTerminal", "Drücke 'SPACE' um das Hauptmenü zu öffnen", "Hauptmenü", './menue.html');
    aktionsFeld("areaLadekabel", "Drücke 'SPACE' um dein Handy zu laden", "Ladekabel", './levelDreiBrute.html');
    aktionsFeld("areaPoster", "Drücke 'SPACE' um das Poster anzuschauen", "Ladekabel", './levelDreiSeerosen.html');
    aktionsEbene("hinweis", "Drücke 'SPACE' um den Hinweis zu Öffnen", "Ladekabel", './levelDreiHinweis.html');
   // Öffnen des AKtionsfelds Telefonbuch start 
    WA.room.area.onEnter("areaTelefonbuch").subscribe(() => {
        WA.room.showLayer("magentaTelBuch");
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um das Telefonbuch zu öffnen",
            callback: () => {
                WA.ui.modal.openModal({
                    title:"Telefonbuch",
                    src: './levelDreiTelBuch.html',
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });
         
        WA.room.area.onLeave("areaTelefonbuch").subscribe(() => {
            WA.room.hideLayer("magentaTelBuch");
            triggerMessage.remove();
        });
    });
    // Öffnen des AKtionsfelds Telefonbuch Ende
    // Öffnen des AKtionsfelds Telefon start
    WA.room.area.onEnter("areaTelefon").subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um das Telefon zu benutzen",
            callback: () => {
                WA.ui.modal.openModal({
                    title:"Telefonbuch",
                    src: './levelDreiTelefon.html',
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });
         
        WA.room.area.onLeave("areaTelefon").subscribe(() => {
            triggerMessage.remove();
        });
    });
     // Öffnen des AKtionsfelds Telefon ende
    WA.room.area.onEnter("areaLadekabel").subscribe(() => {
        WA.room.showLayer("magentaKabel");
    });

    WA.room.area.onLeave("areaLadekabel").subscribe(() => {
        WA.room.hideLayer("magentaKabel");
    });
    // Öffnen des AKtionsfelds Video Info start
    WA.room.area.onEnter("areaInfoVid").subscribe(() => {
        WA.room.showLayer("aktionVideo");
        WA.room.hideLayer("blockVideo"); 
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um die Information zu lesen",
            callback: () => {
                WA.ui.modal.openModal({
                    title:"Info",
                    src: './levelDreiKachelnInfo.html',
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });
         
        WA.room.area.onLeave("areaInfoVid").subscribe(() => {
            triggerMessage.remove();
        });
    });
    // Öffnen des AKtionsfelds Video Info ende
    // Öffnen des AKtionsfelds Video start
    WA.room.area.onEnter("areaVideo").subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um die Überwachungsvideos anzusehen",
            callback: () => {
                WA.ui.modal.openModal({
                    title:"Info",
                    src: './levelDreiVideo.html',
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });
         
        WA.room.area.onLeave("areaVideo").subscribe(() => {
            triggerMessage.remove();
        });
    });
    // Öffnen des AKtionsfelds Video ende
    // Öffnen des AKtionsfelds Tür start
    WA.room.onEnterLayer("aktionTuer").subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um den Flur zu betreten",
            callback: () => {
                WA.room.setProperty("aktionTuer", "exitSceneUrl", "flur.tmj");
            }
        });
         
        WA.room.onLeaveLayer("aktionTuer").subscribe(() => {
            triggerMessage.remove();
        });
    });
    // Öffnen des AKtionsfelds Tür ende
    const codeBtn = document.getElementById("codeBtn") as HTMLButtonElement;
    codeBtn.addEventListener("click", phoneCode);

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
