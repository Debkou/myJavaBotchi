import"./modulepreload-polyfill-3cfb730f.js";/* empty css                   */import{b as s}from"./init-ad207eca.js";console.log("Script started successfully");async function a(){const r=document.getElementById("eingabe").value.trim(),t=document.getElementById("ergebnis");try{const e=await fetch("https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=Archiv",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({eingabe:r})});if(!e.ok)throw new Error("Netzwerkantwort war nicht ok.");const n=await e.json();n.result==="Korrekt!"?(t.innerHTML=`<p style="color: green;">${n.result}</p>`,WA.room.hideLayer("schrankZu"),WA.room.hideLayer("klausurBlock"),WA.room.showLayer("schrankAuf"),WA.room.showLayer("klausurBlock2"),WA.room.showLayer("aktionKlausur"),setTimeout(()=>{WA.ui.modal.closeModal()},2e3)):t.innerHTML=`<p style="color: red;">${n.result}</p>`}catch(e){t.innerHTML='<p><span style="font-family: pokemon;" class="dBlau-font">Fehler:</span> <br> Fehler beim Überprüfen des Zahlenschlosses. Bitte versuche es später erneut.</p>',console.error("Es gab ein Problem mit der Anfrage:",e)}}WA.onInit().then(()=>{console.log("Scripting API ready"),document.getElementById("btKonsole").addEventListener("click",a),s().then(()=>{console.log("Scripting API Extra ready")}).catch(r=>console.error(r))}).catch(o=>console.error(o));
//# sourceMappingURL=levelVierKonsole-26967305.js.map
