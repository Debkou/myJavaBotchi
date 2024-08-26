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

// Funktion zur Registrierung des Aktionsbereichs
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



// Funktion zur Überprüfung des Zahlenschlosses
async function phoneCode() {
    const eingabeElement = document.getElementById("code") as HTMLInputElement;
    const eingabe = eingabeElement.value.trim();
    const ergebnisElement = document.getElementById("ergebnis") as HTMLElement;

    try {
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
             WA.room.showLayer("aktionTelefon"); 
             WA.room.hideLayer("blockTelefon"); 
   
            // Schließe das Modal nach 3 Sekunden und öffne dann die neue Seite
            setTimeout(() => {
                WA.ui.modal.closeModal();
            }, 4000); // 4000 Millisekunden = 4 Sekunden
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
    
    aktionsFeld("areaTerminal", "Drücke 'SPACE' um das Hauptmenü zu öffnen", "Hauptmenü", './menue.html');
    aktionsFeld("areaLadekabel", "Drücke 'SPACE' um dein Handy zu laden", "Ladekabel", './levelDreiBrute.html');
    aktionsFeld("areaPoster", "Drücke 'SPACE' um das Poster anzuschauen", "Ladekabel", './levelDreiSeerosen.html');
    aktionsEbene("hinweisHeiz", "Drücke 'SPACE' um den Hinweis zu Öffnen", "Ladekabel", './flurHinweisHeizraum.html');
    
    WA.room.area.onEnter("test").subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um die Hinweise zu öffnen",
            callback: () => {
                WA.room.showLayer("testEbene");
                WA.room.setProperty("testEbene", "openWebsite", "menue.html"); 
            }
        });

        WA.room.area.onLeave("test").subscribe(() => {
            WA.room.hideLayer("testEbene");
            WA.room.setProperty("testEbene", "openWebsite", ""); 
            triggerMessage.remove();
        });
    });

     WA.room.area.onEnter("areaTelefonbuch").subscribe(() => {
           WA.room.showLayer("MagentaTelBuch");
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um das Telefonbuch zu Öffnen",
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
            WA.room.hideLayer("MagentaTelBuch");
            triggerMessage.remove();
        });
    });

      WA.room.area.onEnter("areaTelefon").subscribe(() => {
          
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um das Telefonbuch zu Öffnen",
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


    WA.room.area.onEnter("areaLadekabel").subscribe(() => {
        WA.room.showLayer("magentaKabel");
    });

    WA.room.area.onLeave("areaLadekabel").subscribe(() => {
        WA.room.hideLayer("magentaKabel");
    });

     WA.room.area.onEnter("areaInfoVid").subscribe(() => {
         WA.room.showLayer("aktionVideo");
         WA.room.hideLayer("blockVideo"); 
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um das Telefonbuch zu Öffnen",
            callback: () => {
              
                    WA.ui.modal.openModal({
                    title:"Info",
                    src: './levelDreiTelefon.html',
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

      const codeBtn = document.getElementById("codeBtn") as HTMLButtonElement;
    codeBtn.addEventListener("click", phoneCode);



    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {}; 
