import{b as s}from"./init-ad207eca.js";console.log("Script started successfully");function n(e,a,o,r){WA.room.area.onEnter(e).subscribe(()=>{const l=WA.ui.displayActionMessage({message:a,callback:()=>{WA.ui.modal.openModal({title:o,src:r,allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.area.onLeave(e).subscribe(()=>{l.remove()})})}function t(e,a,o,r){WA.room.onEnterLayer(e).subscribe(()=>{const l=WA.ui.displayActionMessage({message:a,callback:()=>{WA.ui.modal.openModal({title:o,src:r,allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.onLeaveLayer(e).subscribe(()=>{l.remove()})})}WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),t("aktionTerminal","Drücke 'SPACE' um das Hauptmenü zu öffnen","Hauptmenü","./menue.html"),n("areaErnest","Drücke 'SPACE' um das Buch zu nehmen","Ernest","./levelVierHenning.html"),n("areaKoala","Drücke 'SPACE' um den Inhalt anzuschauen","Koala","./levelVierKoala.html"),n("areaFuenf","Drücke 'SPACE' um den Zettel anzuschauen","Zettel","./levelVierFue.html"),n("areaMaschine","Drücke 'SPACE' um diw Konsole zu Öffnen","Zettel","./levelVierKonsole.html"),t("aktionAktenschrank","Drücke 'SPACE' um das Dokument zu Öffnen","Aktenschrank","./levelVierArray.html"),t("aktionKassenband","Drücke 'SPACE' um das Dokument zu Öffnen","Aktenschrank","./levelVierKasse.html"),s().then(()=>{console.log("Scripting API Extra ready")}).catch(e=>console.error(e))}).catch(e=>console.error(e));
//# sourceMappingURL=levelVierMain-d85f0b54.js.map
