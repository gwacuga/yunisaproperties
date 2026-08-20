/* ==========================================================
                ABOUT APPLICATION
========================================================== */
import AnalyticsService
from "./services/analytics.service.js";


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

    renderFloatingContact

}

from "./components/floating-contact.js";

import {

    initializeMobileMenu

}

from "./components/mobile-menu.js";

import {

    renderAbout

}


from "./pages/about.js";

async function initializeAbout() {

    AnalyticsService.recordWebsiteVisit();

    document.title =

        `${CONFIG.COMPANY.NAME} | About`;

    const app =

        document.getElementById("app");

    app.innerHTML =

        renderHeader()

    +

    renderAbout()

    +

    renderFooter()

    +

    renderFloatingContact();

    initializeMobileMenu();

}

initializeAbout();