import"./modulepreload-polyfill-3cfb730f.js";/* empty css                   */import{b as r}from"./init-ad207eca.js";console.log("Script started successfully");WA.onInit().then(()=>{console.log("Scripting API ready"),document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("btRad"),o=document.getElementById("ergebnis");e==null||e.addEventListener("click",()=>{o.innerHTML='<p">Du hast das Rad eingesteckt!</p>',WA.room.hideLayer("wagenVor"),WA.room.showLayer("wagenWeg"),WA.room.hideLayer("wagenSperre"),WA.room.area.delete("areaInfoWagen")})}),r().then(()=>{console.log("Scripting API Extra ready")}).catch(e=>console.error(e))}).catch(e=>console.error(e));
//# sourceMappingURL=levelZweiRad-501b81cb.js.map