/* ==========================================================
                    ADMIN ROUTER
========================================================== */

import {
    initAdmin
} from "./init.js";

import {
    renderDashboard
} from "./pages/dashboard.js";

import {
    renderPropertiesPage,
    initializePropertiesPage
} from "./pages/properties.js";

import {
    renderEnquiriesPage,
    initializeEnquiriesPage
} from "./pages/enquiries.js";

import {
    renderMessagesPage,
    initializeMessagesPage
} from "./pages/messages.js";

import {
    renderViewingsPage,
    initializeViewingsPage
} from "./pages/viewings.js";

/* ==========================================================
                        NAVIGATE
========================================================== */

export async function navigate(
    page = "dashboard"
) {

    switch (page) {


        /* ==================================================
                            DASHBOARD
        ================================================== */

        case "dashboard":

            await initAdmin({

                title: "Dashboard",

                content: renderDashboard

            });

            break;


            /* ==================================================
                                PROPERTIES
            ================================================== */

        case "properties":

            await initAdmin({

                title: "Properties",

                content: renderPropertiesPage

            });

            initializePropertiesPage();

            break;


            /* ==================================================
                                ENQUIRIES
            ================================================== */

        case "enquiries":

            await initAdmin({

                title: "Enquiries",

                content: renderEnquiriesPage

            });

            await initializeEnquiriesPage();

            break;


            /* ==================================================
                                MESSAGES
            ================================================== */

        case "messages":

            await initAdmin({

                title: "Messages",

                content: renderMessagesPage

            });

            initializeMessagesPage();

            break;
            /* ==================================================
                    VIEWINGS
================================================== */

        case "viewings":

            await initAdmin({

                title: "Viewings",

                content: renderViewingsPage

            });

            await initializeViewingsPage();

            break;

            /* ==================================================
                            UNKNOWN PAGE
            ================================================== */

        default:

            await navigate(
                "dashboard"
            );

            break;

    }

}