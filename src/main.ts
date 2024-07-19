/// <reference types="@workadventure/iframe-api-typings" />
 let noteWebsite: any;

const myWebsite = await WA.ui.website.open({
    url: "https://wikipedia.org",
    position: {
        vertical: "top",
        horizontal: "middle",
    },
    size: {
        height: "50vh",
        width: "50vw",
    },
    margin: {
                top: "10vh",
            },
            allowApi: true,
});


    WA.room.onEnterLayer("visibleNote").subscribe(async () => {
        console.log("Entering visibleNote layer");

       await WA.ui.website.open(myWebsite)

    });

    WA.room.onLeaveLayer("visibleNote").subscribe(() => {
        mywebsite.close();
    });



export {};
