/* ==========================================================
                MOBILE MENU
========================================================== */


export function initializeMobileMenu(){


    const button =
        document.getElementById(
            "menuToggle"
        );


    const menu =
        document.getElementById(
            "mainNav"
        );


    if(!button || !menu)
        return;



    button.addEventListener(

        "click",

        ()=>{


            menu.classList.toggle(
                "open"
            );


        }

    );


}