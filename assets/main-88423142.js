console.log("Script started successfully");let e;const i={url:"src/note.html",position:{vertical:"top",horizontal:"middle"},size:{height:"30vh",width:"50vw"},margin:{top:"10vh"},allowApi:!0};WA.onInit().then(()=>{console.log("Scripting API ready"),WA.room.onEnterLayer("visibleNote").subscribe(async()=>{console.log("Entering visibleNote layer"),e=await WA.ui.website.open(i)}),WA.room.onLeaveLayer("visibleNote").subscribe(()=>{e&&typeof e.close=="function"&&(e.close(),e=null)})}).catch(o=>console.error(o));
//# sourceMappingURL=main-88423142.js.map
