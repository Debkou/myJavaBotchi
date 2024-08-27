import{b as c}from"./init-ad207eca.js";console.log("Script started successfully");function a(t,o,e,r){WA.room.area.onEnter(t).subscribe(()=>{const n=WA.ui.displayActionMessage({message:o,callback:()=>{WA.ui.modal.openModal({title:e,src:r,allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.area.onLeave(t).subscribe(()=>{n.remove()})})}function s(t,o,e,r){WA.room.onEnterLayer(t).subscribe(()=>{const n=WA.ui.displayActionMessage({message:o,callback:()=>{WA.ui.modal.openModal({title:e,src:r,allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.onLeaveLayer(t).subscribe(()=>{n.remove()})})}WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),s("terminalAktion","Drücke 'SPACE' um das Hauptmenü zu Öffnen","Hauptmenü","./menueHR.html"),s("buecherAktion","Drücke 'SPACE' um die Bibliothek zu Öffnen","Bibliothek","./bibliothek.html"),a("feldTasteFlyer","Drücke 'SPACE' um den Flyer zu sehen","Bibliothek","./flyer_party.html"),a("feldTasteApi","Drücke 'SPACE' um die Oracle Java API zu öffnen","Oracle Java API","https://docs.oracle.com/en/java/javase/11/docs/api/"),a("feldTasteHin","Drücke 'SPACE' um die Hinweise zu öffnen","Hinweis anzeigen","./hinweis1.html"),a("feldTastePong","Drücke 'SPACE' um PingPong zu spielen","PingPong","https://www.spiele123.com/spiel/ping-pong"),a("feldAktionEingabe","Drücke 'SPACE' um die Tür zu öffnen","Passwort Eingabe","./eingabeTest.html"),s("aktionFlur","Drücke 'SPACE' um das Level zu betreten","Flur","./levelEinsFinalEingabe.html"),s("aktionZentrale","Drücke 'SPACE' um das Level zu betreten","Flur","./levelZweiFinalEingabe.html"),s("aktionArchiv","Drücke 'SPACE' um das Level zu betreten","Flur","./levelVierZutritt.html"),WA.room.onEnterLayer("aktionFlyer").subscribe(async()=>{WA.room.showLayer("magentaFlyer")}),WA.room.onLeaveLayer("aktionFlyer").subscribe(async()=>{console.log("Leaving aktionFlyer layer"),WA.room.hideLayer("magentaFlyer")});const t=document.getElementById("eingabe"),o=document.getElementById("submitButton"),e=document.getElementById("ergebnis");async function r(){const n=t.value.trim();try{const i=await fetch("https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=einstieg",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({eingabe:n})});if(!i.ok)throw new Error("Netzwerkantwort war nicht ok.");const l=await i.json();l.result==="Korrekt!"?(e.textContent=l.result,e.className="correct",WA.room.setProperty("exitLevel1","exitSceneUrl","levelEins.tmj"),WA.ui.modal.closeModal()):(e.textContent=l.result,e.className="incorrect")}catch(i){e.textContent="Fehler beim Überprüfen des Passworts. Bitte versuche es später erneut.",e.className="error",console.error("Es gab ein Problem mit der Anfrage:",i)}}o.addEventListener("click",r),document.addEventListener("keydown",function(n){n.key==="Enter"&&r()}),c().then(()=>{console.log("Scripting API Extra ready")}).catch(n=>console.error(n))}).catch(t=>console.error(t));
//# sourceMappingURL=main-895988a3.js.map
