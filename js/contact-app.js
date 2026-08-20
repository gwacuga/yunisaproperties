/* ==========================================================
                    CONTACT APPLICATION
========================================================== */

import {
    renderHeader,
    initializeHeader
} from "./components/header.js";

import {
    renderFooter
} from "./components/footer.js";

import {
    renderFloatingContact
} from "./components/floating-contact.js";

import {
    renderContact
} from "./pages/contact.js";

import AnalyticsService
from "./services/analytics.service.js";


/* ==========================================================
                    INITIALIZE CONTACT
========================================================== */

function initializeContact() {
    AnalyticsService.recordWebsiteVisit();

    const app = document.getElementById("app");

    if (!app) {
        return;
    }

    app.innerHTML =
        renderHeader() +
        renderContact() +
        renderFooter() +
        renderFloatingContact();


    /* Initialize the header AFTER rendering it */
    initializeHeader();

}


/* ==========================================================
                    START APPLICATION
========================================================== */

initializeContact();