import{b as s}from"./init-ad207eca.js";console.log("Script started successfully");function l(e,o,n,r){WA.room.area.onEnter(e).subscribe(()=>{const t=WA.ui.displayActionMessage({message:o,callback:()=>{WA.ui.modal.openModal({title:n,src:r,allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.area.onLeave(e).subscribe(()=>{t.remove()})})}function c(e,o,n,r){WA.room.onEnterLayer(e).subscribe(()=>{const t=WA.ui.displayActionMessage({message:o,callback:()=>{WA.ui.modal.openModal({title:n,src:r,allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.onLeaveLayer(e).subscribe(()=>{t.remove()})})}WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),c("areaAktionUhr1","Drücke 'SPACE' um die Temperatur einzustellen","Anleitung","./levelZweiGUIFail.html");function e(){const n=document.querySelector('input[name="question1"]:checked'),r=document.querySelector('input[name="question2"]:checked');if(n&&r){let t=0;n.value==="correct"&&t++,r.value==="correct"&&t++;const i=document.getElementById("ergebnis");t===2?(i.innerText="Alle Antworten sind korrekt!",l("areaZentraleTuer","Drücke 'SPACE' um die Anleitung zu lesen","Anleitung","./levelZweiAnleitung.html")):i.innerText="Du hast "+t+" von 2 Fragen richtig beantwortet."}else alert("Bitte wähle eine Antwort für jede Frage aus.")}const o=document.getElementById("checkButton");o&&o.addEventListener("click",e),l("areaAnleitung","Drücke 'SPACE' um die Anleitung zu lesen","Anleitung","./levelZweiAnleitung.html"),l("areaAnleitungCode","Drücke 'SPACE' um die Temperatur einzustellen","Heizung","./levelZweiHeizungCode.html"),s().then(()=>{console.log("Scripting API Extra ready")}).catch(n=>console.error(n))}).catch(e=>console.error(e));
//# sourceMappingURL=levelZweiMain-f3db9b44.js.map
