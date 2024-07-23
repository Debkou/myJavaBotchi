/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

const closeButton = document.getElementById("closeButton") as HTMLButtonElement;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');


    closeButton.addEventListener("click", () => {
              noteWebsite.close();
    });

}).catch(e => console.error(e));

export {};