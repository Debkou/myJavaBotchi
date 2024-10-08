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

// Funktion zur Überprüfung des Passworts
async function ueberpruefePasswort() {
     // Variablen für die Kontrolle des Passworts (aus der HTML Datei)
    const eingabeElement = document.getElementById("eingabefenster") as HTMLTextAreaElement;
    const eingabe = eingabeElement.value.trim();
    const ergebnisElement = document.getElementById("textContainer") as HTMLElement;

    try {
         // Zuweisung EIngabeelement und trim - löscht Leerzeichen am Anfang und am Ende
        const response = await fetch('https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=LichttAn', {
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
            ergebnisElement.innerHTML += `<p><span style="font-family: pokemon;" class="dBlau-font">Alexa:</span> <br> ${data.result}</p>`;
            ergebnisElement.innerHTML += `<p>Das Licht geht an!</p>`;
            // Ebene "dunkel" ausblenden - sorgt dafür, dass das "Licht" angeht
            WA.room.hideLayer('dunkel');
            // Nach einer kurzen Wartezeit das Modal schließen
            setTimeout(() => {
                //Modal wird geschlossen
                WA.ui.modal.closeModal();
            }, 3000); //Wartezeit
        } else {
            ergebnisElement.innerHTML += `<p><span style="font-family: pokemon;" class="dBlau-font">Alexa:</span> <br> ${data.result}</p>`;
        }
    } catch (error) {
        ergebnisElement.innerHTML += `<p><span style="font-family: pokemon;" class="dBlau-font">Fehler:</span> <br> Fehler beim Überprüfen des Passworts. Bitte versuche es später erneut.</p>`;
        console.error('Es gab ein Problem mit der Anfrage:', error);
    }
}

// Warten, bis die API bereit ist
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ', WA.player.tags);
    // Beim betreten wird das Aktionsfenster geöffnet
    WA.ui.modal.openModal({
        title: "Licht Eingabe",
        src: './levelEinsLicht.html',
        allow: "fullscreen",
        allowApi: true,
        position: "center",
    });
    // Erstellung der jeweilligen Aktions-Fenster
    aktionsFeld("areaAktionTerminal", "Drücke 'SPACE' um das Hauptmenü zu öffnen", "Terminal", './menue.html');
    aktionsFeld("areaAktionTerminal2", "Drücke 'SPACE' um das Hauptmenü zu öffnen", "Terminal", './menue.html');
    aktionsFeld("p1a", "Drücke 'SPACE' um den Hinweis zu öffnen", "Terminal", './postIt1a.html');
    aktionsFeld("p1b", "Drücke 'SPACE' um den Hinweis zu öffnen", "Terminal", './postIt1b.html');
    aktionsFeld("p2a", "Drücke 'SPACE' um den Hinweis zu öffnen", "Terminal", './postIt2a.html');
    aktionsFeld("p2b", "Drücke 'SPACE' um den Hinweis zu öffnen", "Terminal", './postIt2b.html');
    aktionsFeld("p3a", "Drücke 'SPACE' um den Hinweis zu öffnen", "Terminal", './postIt3a.html');
    aktionsFeld("p3b", "Drücke 'SPACE' um den Hinweis zu öffnen", "Terminal", './postIt3b.html');
    aktionsFeld("p4a", "Drücke 'SPACE' um den Hinweis zu öffnen", "Terminal", './postIt4a.html');
    aktionsFeld("p4b", "Drücke 'SPACE' um den Hinweis zu öffnen", "Terminal", './postIt4b.html');
    aktionsFeld("areaAktionGitter", "Drücke 'SPACE' um die Tür zu öffnen", "Gittertür", './levelEinsGitter.html');
    aktionsFeld("aktionSchlueSchrank", "Drücke 'SPACE' um den Schlüsselschrank zu öffnen", "Tresor", './levelEinsTresor.html');
    aktionsFeld("aktionMaschine", "Drücke 'SPACE' um das Programm zu starten", "Code Maschine", './levelEinsSchlueCode.html');
    aktionsEbene("hinweis1", "Drücke 'SPACE' um den Hinweis zu Öffnen", "Hinweis 1", './levelEinsHinweisEins.html');
    aktionsEbene("hinweis2", "Drücke 'SPACE' um den Hinweis zu Öffnen", "Hinweis 2", './levelEinsHinweisZwei.html');
    aktionsEbene("hinweis3", "Drücke 'SPACE' um den Hinweis zu Öffnen", "Hinweis 2", './levelEinsHinweisfinal.html');
    aktionsFeld("woBinIch", "Drücke 'SPACE' - Wo bin ich?", "Alexa", './levelEinsWo.html');
    // Modal Vorhang-Haken start
     WA.room.area.onEnter("aktionHaken").subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um die Kiste anzuschauen",
            callback: () => {
                WA.ui.modal.openModal({
                    title: "Vorhang",
                    src: './levelEinsVorhang.html',
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });
        WA.room.showLayer('hakenMagenta');
        WA.room.area.onLeave("aktionHaken").subscribe(() => {
            triggerMessage.remove();
             WA.room.hideLayer('hakenMagenta');
        });
    });
// Modal Vorhang-Haken Ende
    
// Modal Infowand start    
        WA.room.area.onEnter("aktionInfoWall").subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um die Tafel anzuschauen",
            callback: () => {
                WA.ui.modal.openModal({
                    title: "Anleitung",
                    src: './levelEinsSchlueAnleitung.html',
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });
        WA.room.showLayer('magentaInfo');
        WA.room.area.onLeave("aktionInfoWall").subscribe(() => {
            triggerMessage.remove();
             WA.room.hideLayer('magentaInfo');
        });
    });
// Modal Infowand ende
// Modal Finales Rätsel start
    WA.room.area.onEnter("aktionSchliessAnlage").subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um die Türschließanlage zu öffnen",
            callback: () => {
                WA.ui.modal.openModal({
                    title: "Türschließer",
                    src: './levelEinsDrag.html',
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });
        WA.room.showLayer('magentaSchliessAnlage');
        WA.room.area.onLeave("aktionSchliessAnlage").subscribe(() => {
            triggerMessage.remove();
             WA.room.hideLayer('magentaSchliessAnlage');
        });
    });
// Modal Finales Rätsel ende
// Modal Finales Passwort start 
       WA.room.area.onEnter("aktionFinal").subscribe(() => {
        const triggerMessage = WA.ui.displayActionMessage({
            message: "Drücke 'SPACE' um die Tür zu öffnen",
            callback: () => {
                WA.ui.modal.openModal({
                    title: "Passwort Eingabe",
                    src: './levelEinsFinalEingabe.html', // Dein HTML-Dokument
                    allow: "fullscreen",
                    allowApi: true,
                    position: "center",
                });
            }
        });

        WA.room.area.onLeave("aktionFinal").subscribe(() => {
            triggerMessage.remove();
        });
    });
// Modal Finales Passwort ende
    // Event-Listener für den "Licht an" Button
    const lichtButton = document.getElementById("lichtButton") as HTMLButtonElement;
    lichtButton.addEventListener("click", ueberpruefePasswort);
   

    // Initialisierung der Scripting API Extra-Bibliothek
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
