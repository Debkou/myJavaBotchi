import"./modulepreload-polyfill-3cfb730f.js";import{b as a}from"./init-ad207eca.js";console.log("Script started successfully");let s=!0;function i(e){e?(WA.room.showLayer("gitterTuerZu"),WA.room.hideLayer("gitterTuerAuf")):(WA.room.hideLayer("gitterTuerZu"),WA.room.showLayer("gitterTuerAuf"))}async function l(){const r=document.getElementById("eingabeGitter").value.trim(),o=document.getElementById("ergebnis");try{const t=await fetch("https://javabotchi.kunst-werk-hagen.de/apiTest.php?name=zahlenschloss",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({eingabe:r})});if(!t.ok)throw new Error("Netzwerkantwort war nicht ok.");const n=await t.json();n.result==="Korrekt!"?(o.innerHTML=`<p style="color: green;">${n.result}</p>`,s=!1,i(s),WA.room.hideLayer("gitterSperre"),setTimeout(()=>{WA.ui.modal.closeModal()},3e3)):o.innerHTML=`<p style="color: red;">${n.result}</p>`}catch(t){o.innerHTML='<p><span style="font-family: pokemon;" class="dBlau-font">Fehler:</span> <br> Fehler beim Überprüfen des Zahlenschlosses. Bitte versuche es später erneut.</p>',console.error("Es gab ein Problem mit der Anfrage:",t)}}WA.onInit().then(()=>{console.log("Scripting API ready"),i(s),document.getElementById("gitterTuer").addEventListener("click",l),a().then(()=>{console.log("Scripting API Extra ready")}).catch(r=>console.error(r))}).catch(e=>console.error(e));
//# sourceMappingURL=levelVierKoala-111e1817.js.map
