import{b as i}from"./init-ad207eca.js";console.log("Script started successfully");function e(n,t,o,l){WA.room.area.onEnter(n).subscribe(()=>{const r=WA.ui.displayActionMessage({message:t,callback:()=>{WA.ui.modal.openModal({title:o,src:l,allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.area.onLeave(n).subscribe(()=>{r.remove()})})}WA.onInit().then(()=>{var n;console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),(n=document.getElementById("checkButton"))==null||n.addEventListener("click",()=>{const t=document.getElementById("option1-2").checked,o=document.getElementById("option2-2").checked,l=document.getElementById("ergebnis");if(t&&o)l.innerHTML="<p>Korrekt!<br>Passwort: Reparieren</p>";else{let r=0,a=0;t?r++:a++,o?r++:a++,l.innerHTML=`<p>Du hast ${r} richtige und ${a} falsche Antworten.</p><p>Bitte versuche es erneut.</p>`}}),e("areaAnleitung","Drücke 'SPACE' um die Anleitung zu lesen","Anleitung","./levelZweiAnleitung.html"),e("areaAnleitungCode","Drücke 'SPACE' um den Code anzuzeigen","AnleitungCode","./levelZweiHeizungCode.html"),e("areaUhr","Drücke 'SPACE' um den Code anzuzeigen","AnleitungCode","./levelZweiGUIFail.html"),e("areaTerminalEins","Drücke 'SPACE' um das Hauptmenü zu öffnen","Terminal","./menue.html"),e("areaRad","Drücke 'SPACE' um das Rad zu suchen","Schrank","./levelZweiRad.html"),e("areaInfoWagen","Drücke 'SPACE' um den Wagen zu schieben.","Wagen","./levelZweiWagen.html"),e("areaInfoHandy","Drücke 'SPACE' um die Info anzuzeigen.","Fundbüro","./levelZweiFundbuero.html"),e("areaAktionHandy","Drücke 'SPACE' um den Schrank zu Öffnen","Schrank","./levelZweiPhone.html"),i().then(()=>{console.log("Scripting API Extra ready")}).catch(t=>console.error(t))}).catch(n=>console.error(n));
//# sourceMappingURL=levelZweiMain-cc1d6be7.js.map
