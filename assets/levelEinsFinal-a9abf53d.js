import{b as c}from"./init-ad207eca.js";console.log("Script started successfully");WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags);const n=document.getElementById("eingabe"),a=document.getElementById("submitButton"),e=document.getElementById("ergebnis");async function s(){const t=n.value.trim();try{const r=await fetch("https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=LevelEinsTuer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({eingabe:t})});if(!r.ok)throw new Error("Netzwerkantwort war nicht ok.");const o=await r.json();o.result==="Korrekt!"?(e.textContent=o.result,e.className="correct",WA.room.setProperty("exitLevelEins","exitSceneUrl","flur.tmj"),WA.ui.modal.closeModal()):(e.textContent=o.result,e.className="incorrect")}catch(r){e.textContent="Fehler beim Überprüfen des Passworts. Bitte versuche es später erneut.",e.className="error",console.error("Es gab ein Problem mit der Anfrage:",r)}}a.addEventListener("click",s),document.addEventListener("keydown",function(t){t.key==="Enter"&&s()}),c().then(()=>{console.log("Scripting API Extra ready")}).catch(t=>console.error(t))}).catch(n=>console.error(n));
//# sourceMappingURL=levelEinsFinal-a9abf53d.js.map
