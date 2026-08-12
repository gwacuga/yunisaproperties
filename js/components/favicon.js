/* ==========================================================
                    FAVICON
========================================================== */

import CONFIG from "../config.js";


export function initializeFavicon(){

    let favicon =
        document.querySelector(
            'link[rel="icon"]'
        );


    if(!favicon){

        favicon =
            document.createElement(
                "link"
            );

        favicon.rel =
            "icon";

        document.head.appendChild(
            favicon
        );

    }


    favicon.type =
        "image/jpeg";

    favicon.href =
        CONFIG.COMPANY.FAVICON;

}