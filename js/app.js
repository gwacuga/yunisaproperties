/* ==========================================================
                    PUBLIC APPLICATION
========================================================== */
import {
    initializeFavicon
}
from "./components/favicon.js";

import CONFIG
from "./config.js";


import {

    renderHeader

}
from "./components/header.js";


import {

    renderFooter

}
from "./components/footer.js";


import {

    renderHome,
    loadFeaturedProperties,
    loadCategoryCounts

}
from "./pages/home.js";


import {

    initializeMobileMenu

}
from "./components/mobile-menu.js";


import {

    initializePropertySearch

}
from "./components/property-search.js";


import {

    renderFloatingContact

}
from "./components/floating-contact.js";

import AnalyticsService
from "./services/analytics.service.js";

/* ==========================================================
                    INITIALIZE APP
========================================================== */


async function initializeApp() {
    AnalyticsService.recordWebsiteVisit();

    const app =

        document.getElementById(
            "app"
        );


    if (!app) {

        console.error(
            "App container missing"
        );

        return;

    }



    app.innerHTML =


        renderHeader()


    +


    await renderHome()


    +


    renderFooter()


    +


    renderFloatingContact();



    // Initialize mobile navigation

    initializeMobileMenu();

    initializeFavicon();


    // Initialize property search

    initializePropertySearch();

    await loadFeaturedProperties();

    await loadCategoryCounts();


    console.log(

        `${CONFIG.COMPANY.NAME} initialized`

    );


}



initializeApp();