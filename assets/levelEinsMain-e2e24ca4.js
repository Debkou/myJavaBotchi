import{b as s}from"./init-ad207eca.js";console.log("Script started successfully");WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),WA.room.area.onEnter("areaAktionTerminal").subscribe(()=>{const e=WA.ui.displayActionMessage({message:"Drücke 'SPACE' um das Hauptmenü zu öffnen",callback:()=>{WA.ui.modal.openModal({title:"Terminal",src:"./menue.html",allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.area.onLeave("areaAktionTerminal").subscribe(()=>{e.remove()})});async function o(){const a=document.getElementById("eingabefenster").value.trim(),t=document.getElementById("textContainer");try{const n=await fetch("https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=LichtAn",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({eingabe:a})});if(!n.ok)throw new Error("Netzwerkantwort war nicht ok.");const r=await n.json();r.result==="Korrekt!"?(t.innerHTML+=`<p><span style="font-family: pokemon;" class="dBlau-font">Alexa:</span> <br> ${r.result}</p>`,t.innerHTML+="<p>Das Licht geht an!</p>",WA.room.hideLayer("dunkel")):t.innerHTML+=`<p><span style="font-family: pokemon;" class="dBlau-font">Alexa:</span> <br> ${r.result}</p>`}catch(n){t.innerHTML+='<p><span style="font-family: pokemon;" class="dBlau-font">Fehler:</span> <br> Fehler beim Überprüfen des Passworts. Bitte versuche es später erneut.</p>',console.error("Es gab ein Problem mit der Anfrage:",n)}}document.getElementById("lichtButton").addEventListener("click",o),s().then(()=>{console.log("Scripting API Extra ready")}).catch(e=>console.error(e))}).catch(o=>console.error(o));
//# sourceMappingURL=levelEinsMain-e2e24ca4.js.map
