console.log("Script started successfully");let o;WA.onInit().then(()=>{console.log("Scripting API ready"),WA.room.onEnterLayer("visibleNote").subscribe(async()=>{if(console.log("Entering visibleNote layer"),o){try{o.close(),console.log("Previous noteWebsite instance closed")}catch(e){console.error("Error closing previous noteWebsite instance:",e)}o=void 0}try{o=await WA.ui.website.open({url:"./note.html",position:{vertical:"top",horizontal:"middle"},size:{height:"30vh",width:"50vw"},margin:{top:"10vh"},allowApi:!0}),console.log("noteWebsite opened successfully")}catch(e){console.error("Error opening noteWebsite:",e)}}),WA.room.onLeaveLayer("visibleNote").subscribe(()=>{if(o)try{o.close(),console.log("noteWebsite closed successfully")}catch(e){console.error("Error closing noteWebsite:",e)}finally{o=void 0}})}).catch(e=>console.error("Error during WA.onInit:",e));
//# sourceMappingURL=main-46a71ef0.js.map
