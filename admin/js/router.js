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


/* ==========================================================
                        NAVIGATE
========================================================== */

export async function navigate(
    page = "dashboard"
) {

    switch (page) {


        /* ==================================================
                            PROPERTIES
        ================================================== */

        case "properties":

            await initAdmin({

                title: "Properties",

                content:
                    renderPropertiesPage

            });

            initializePropertiesPage();

            break;



        /* ==================================================
                            ENQUIRIES
        ================================================== */

        case "enquiries":

            await initAdmin({

                title: "Enquiries",

                content:
                    renderEnquiriesPage

            });

            await initializeEnquiriesPage();

            break;



        /* ==================================================
                            MESSAGES
        ================================================== */

        case "messages":

            await initAdmin({

                title: "Messages",

                content:
                    renderMessagesPage

            });

            initializeMessagesPage();

            break;



        /* ==================================================
                            DASHBOARD
        ================================================== */

        default:

            await initAdmin({

                title: "Dashboard",

                content:
                    renderDashboard

            });

            break;

    }

}