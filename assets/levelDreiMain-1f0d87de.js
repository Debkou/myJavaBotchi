import{b as s}from"./init-ad207eca.js";console.log("Script started successfully");function t(o,e,r,a){WA.room.area.onEnter(o).subscribe(()=>{const n=WA.ui.displayActionMessage({message:e,callback:()=>{WA.ui.modal.openModal({title:r,src:a,allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.area.onLeave(o).subscribe(()=>{n.remove()})})}async function l(){const e=document.getElementById("code").value.trim(),r=document.getElementById("ergebnis");try{const a=await fetch("https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=PhoneCode",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({eingabe:e})});if(!a.ok)throw new Error("Netzwerkantwort war nicht ok.");const n=await a.json();n.result==="Korrekt!"?(r.innerHTML=`<p style="color: green;">${n.result}</p>`,r.innerHTML='<p>"Na Super! Kein Empfang. Ich brauche ein Telefon!"</p>',WA.room.showLayer("aktionTelefon"),WA.room.hideLayer("blockTelefon"),setTimeout(()=>{WA.ui.modal.closeModal()},4e3)):r.innerHTML=`<p style="color: red;">${n.result}</p>`}catch(a){r.innerHTML='<p><span style="font-family: pokemon;" class="dBlau-font">Fehler:</span> <br> Fehler beim Überprüfen des Zahlenschlosses. Bitte versuche es später erneut.</p>',console.error("Es gab ein Problem mit der Anfrage:",a)}}WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),WA.room.area.onEnter("test").subscribe(()=>{const e=WA.ui.displayActionMessage({message:"Drücke 'SPACE' um die Hinweise zu öffnen",callback:()=>{WA.room.showLayer("testEbene"),WA.room.setProperty("testEbene","openWebsite","menue.html")}});WA.room.area.onLeave("test").subscribe(()=>{WA.room.hideLayer("testEbene"),WA.room.setProperty("testEbene","openWebsite",""),e.remove()})}),WA.room.area.onEnter("areaTelefonbuch").subscribe(()=>{WA.room.showLayer("MagentaTelBuch");const e=WA.ui.displayActionMessage({message:"Drücke 'SPACE' um das Telefonbuch zu Öffnen",callback:()=>{WA.ui.modal.openModal({title:"Telefonbuch",src:"./levelDreiTelBuch.html",allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.area.onLeave("areaTelefonbuch").subscribe(()=>{WA.room.hideLayer("MagentaTelBuch"),e.remove()})}),WA.room.area.onEnter("areaTelefon").subscribe(()=>{const e=WA.ui.displayActionMessage({message:"Drücke 'SPACE' um das Telefonbuch zu Öffnen",callback:()=>{WA.ui.modal.openModal({title:"Telefonbuch",src:"./levelDreiTelefon.html",allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.area.onLeave("areaTelefon").subscribe(()=>{e.remove()})}),t("areaTerminal","Drücke 'SPACE' um das Hauptmenü zu öffnen","Hauptmenü","./menue.html"),t("areaLadekabel","Drücke 'SPACE' um dein Handy zu laden","Ladekabel","./levelDreiBrute.html"),WA.room.area.onEnter("areaLadekabel").subscribe(()=>{WA.room.showLayer("magentaKabel")}),WA.room.area.onLeave("areaLadekabel").subscribe(()=>{WA.room.hideLayer("magentaKabel")}),document.getElementById("codeBtn").addEventListener("click",l),s().then(()=>{console.log("Scripting API Extra ready")}).catch(e=>console.error(e))}).catch(o=>console.error(o));
//# sourceMappingURL=levelDreiMain-1f0d87de.js.map
