/* ==========================================================
                    ADMIN APPLICATION
========================================================== */
import {
    initializeFavicon
}
from "../../js/components/favicon.js";

import AuthService
from "./services/auth.service.js";

import {
    navigate
}
from "./router.js";


/* ==========================================================
                    AUTHENTICATION
========================================================== */

AuthService.onAuthStateChanged(
    async (user) => {

        /*
            No authenticated user
            → return to login
        */

        if (!user) {

            window.location.href =
                "./login.html";

            return;

        }


        /*
            Authenticated user
            → open dashboard
        */
        initializeFavicon();


        await navigate(
            "dashboard"
        );

    }
);