/* ==========================================================
                PROPERTIES APPLICATION
========================================================== */


import CONFIG from "./config.js";



import {

    renderHeader

}

from "./components/header.js";



import {

    renderFooter

}

from "./components/footer.js";



import {

    renderProperties,

    loadProperties,

    initializePropertyFilters

}

from "./pages/properties.js";



import {

    renderFloatingContact

}

from "./components/floating-contact.js";



import {

    initializeMobileMenu

}

from "./components/mobile-menu.js";





/* ==========================================================
                INITIALIZE
========================================================== */


async function initializeProperties(){



    document.title =


        `${CONFIG.COMPANY.NAME} | Properties`;





    const app =


        document.getElementById(
            "app"
        );





    if(!app){


        console.error(
            "App container missing"
        );


        return;


    }






    app.innerHTML =



        renderHeader()



        +



        await renderProperties()



        +



        renderFooter()



        +



        renderFloatingContact();






    /*
        IMPORTANT:

        HTML must exist first,
        then load Firebase data
    */



    await loadProperties();





    initializePropertyFilters();





    initializeMobileMenu();





    console.log(

        `${CONFIG.COMPANY.NAME} properties loaded`

    );



}





initializeProperties();