import{b as s}from"./init-ad207eca.js";console.log("Script started successfully");function n(a,e,t,o){WA.room.area.onEnter(a).subscribe(()=>{const r=WA.ui.displayActionMessage({message:e,callback:()=>{WA.ui.modal.openModal({title:t,src:o,allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.area.onLeave(a).subscribe(()=>{r.remove()})})}async function l(){const e=document.getElementById("eingabefenster").value.trim(),t=document.getElementById("textContainer");try{const o=await fetch("https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=LichttAn",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({eingabe:e})});if(!o.ok)throw new Error("Netzwerkantwort war nicht ok.");const r=await o.json();r.result==="Korrekt!"?(t.innerHTML+=`<p><span style="font-family: pokemon;" class="dBlau-font">Alexa:</span> <br> ${r.result}</p>`,t.innerHTML+="<p>Das Licht geht an!</p>",WA.room.hideLayer("dunkel"),setTimeout(()=>{WA.ui.modal.closeModal()},3e3)):t.innerHTML+=`<p><span style="font-family: pokemon;" class="dBlau-font">Alexa:</span> <br> ${r.result}</p>`}catch(o){t.innerHTML+='<p><span style="font-family: pokemon;" class="dBlau-font">Fehler:</span> <br> Fehler beim Überprüfen des Passworts. Bitte versuche es später erneut.</p>',console.error("Es gab ein Problem mit der Anfrage:",o)}}WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),WA.ui.modal.openModal({title:"Licht Eingabe",src:"./levelEinsLicht.html",allow:"fullscreen",allowApi:!0,position:"center"}),n("areaAktionTerminal","Drücke 'SPACE' um das Hauptmenü zu öffnen","Terminal","./menue.html"),n("p1a","Drücke 'SPACE' um den Hinweis zu öffnen","Terminal","./postIt1a.html"),n("p1b","Drücke 'SPACE' um den Hinweis zu öffnen","Terminal","./postIt1b.html"),n("p2a","Drücke 'SPACE' um den Hinweis zu öffnen","Terminal","./postIt2a.html"),n("p2b","Drücke 'SPACE' um den Hinweis zu öffnen","Terminal","./postIt2b.html"),n("p3a","Drücke 'SPACE' um den Hinweis zu öffnen","Terminal","./postIt3a.html"),n("p3b","Drücke 'SPACE' um den Hinweis zu öffnen","Terminal","./postIt3b.html"),n("p4a","Drücke 'SPACE' um den Hinweis zu öffnen","Terminal","./postIt4a.html"),n("p4b","Drücke 'SPACE' um den Hinweis zu öffnen","Terminal","./postIt4b.html"),n("areaAktionGitter","Drücke 'SPACE' um die Tür zu öffnen","Gittertür","./levelEinsGitter.html"),n("aktionSchlueSchrank","Drücke 'SPACE' um den Schlüsselschrank zu öffnen","Tresor","./levelEinsTresor.html"),n("aktionMaschine","Drücke 'SPACE' um das Programm zu starten","Code Maschine","./levelEinsSchlueCode.html"),WA.room.area.onEnter("aktionHaken").subscribe(()=>{const e=WA.ui.displayActionMessage({message:"Drücke 'SPACE' um die Kiste anzuschauen",callback:()=>{WA.ui.modal.openModal({title:"Vorhang",src:"./levelEinsVorhang.html",allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.showLayer("hakenMagenta"),WA.room.area.onLeave("aktionHaken").subscribe(()=>{e.remove(),WA.room.hideLayer("hakenMagenta")})}),WA.room.area.onEnter("aktionInfoWall").subscribe(()=>{const e=WA.ui.displayActionMessage({message:"Drücke 'SPACE' um die Tafel anzuschauen",callback:()=>{WA.ui.modal.openModal({title:"Anleitung",src:"./levelEinsSchlueAnleitung.html",allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.showLayer("magentaInfo"),WA.room.area.onLeave("aktionHaken").subscribe(()=>{e.remove(),WA.room.hideLayer("magentaInfo")})}),WA.room.area.onEnter("aktionSchliessAnlage").subscribe(()=>{const e=WA.ui.displayActionMessage({message:"Drücke 'SPACE' um die Türschließanlage zu öffnen",callback:()=>{WA.ui.modal.openModal({title:"Türschließer",src:"./levelEinsDrag.html",allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.showLayer("magentaSchliessAnlage"),WA.room.area.onLeave("aktionSchliessAnlage").subscribe(()=>{e.remove(),WA.room.hideLayer("magentaSchliessAnlage")})}),WA.room.area.onEnter("aktionFinal").subscribe(()=>{const e=WA.ui.displayActionMessage({message:"Drücke 'SPACE' um die Tür zu öffnen",callback:()=>{WA.ui.modal.openModal({title:"Passwort Eingabe",src:"./levelEinsFinalEingabe.html",allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.area.onLeave("aktionFinal").subscribe(()=>{e.remove()})}),document.getElementById("lichtButton").addEventListener("click",l),s().then(()=>{console.log("Scripting API Extra ready")}).catch(e=>console.error(e))}).catch(a=>console.error(a));
//# sourceMappingURL=levelEinsMain-1a1cc985.js.map