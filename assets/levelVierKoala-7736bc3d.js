import"./modulepreload-polyfill-3cfb730f.js";/* empty css                   */import{b as o}from"./init-ad207eca.js";console.log("Script started successfully");const n=document.getElementById("ergebnis");WA.onInit().then(()=>{console.log("Scripting API ready"),document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("btKoala");e==null||e.addEventListener("click",()=>{n.innerHTML='<p">Du hast den Koala genommen!</p>',WA.room.hideLayer("kassenBandBlock"),WA.room.showLayer("aktionKassenband")})}),o().then(()=>{console.log("Scripting API Extra ready")}).catch(e=>console.error(e))}).catch(e=>console.error(e));
//# sourceMappingURL=levelVierKoala-7736bc3d.js.map