import{b as c}from"./init-ad207eca.js";console.log("Script started successfully");function l(e,o,t,r){WA.room.area.onEnter(e).subscribe(()=>{const n=WA.ui.displayActionMessage({message:o,callback:()=>{WA.ui.modal.openModal({title:t,src:r,allow:"fullscreen",allowApi:!0,position:"center"})}});WA.room.area.onLeave(e).subscribe(()=>{n.remove()})})}WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags);function e(){const t=document.querySelector('input[name="question1"]:checked'),r=document.querySelector('input[name="question2"]:checked');if(t&&r){let n=0;t.value==="correct"&&n++,r.value==="correct"&&n++;const i=document.getElementById("ergebnis");n===2?(i.innerText="Alle Antworten sind korrekt!",l("areaZentraleTuer","Drücke 'SPACE' um die Anleitung zu lesen","Anleitung","./levelZweiAnleitung.html")):i.innerText="Du hast "+n+" von 2 Fragen richtig beantwortet."}else alert("Bitte wähle eine Antwort für jede Frage aus.")}const o=document.getElementById("checkButton");o&&o.addEventListener("click",e),l("areaAnleitung","Drücke 'SPACE' um die Anleitung zu lesen","Anleitung","./levelZweiAnleitung.html"),l("areaAnleitungCode","Drücke 'SPACE' um die Temperatur einzustellen","Heizung","./levelZweiHeizungCode.html"),c().then(()=>{console.log("Scripting API Extra ready")}).catch(t=>console.error(t))}).catch(e=>console.error(e));
//# sourceMappingURL=levelZweiMain-7e38478c.js.map
