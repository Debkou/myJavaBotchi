let e;WA.room.onEnterLayer("visibleNote").subscribe(async()=>{console.log("Entering visibleNote layer"),e=await WA.ui.website.open({url:"src/note.html",position:{vertical:"top",horizontal:"middle"},size:{height:"30vh",width:"50vw"},margin:{top:"10vh"},allowApi:!0})});WA.room.onLeaveLayer("visibleNote").subscribe(()=>{e.close()});
//# sourceMappingURL=main-ab84445a.js.map
