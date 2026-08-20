/* ==========================================================
                    ADMIN INITIALIZER
========================================================== */

import { navigate } from "./router.js";

import {
    renderLayout
} from "./layouts/layout.js";

import Drawer from "./components/drawer.js";

import {
    renderPropertyForm,
    initializePropertyForm
} from "./forms/property-form.js";


/* ==========================================================
                    INIT ADMIN
========================================================== */

export async function initAdmin({

    title,

    content

}) {

    const app =
        document.getElementById(
            "app"
        );


    const pageContent =
        typeof content === "function" ?
        await content() :
        await content;


    app.innerHTML =
        renderLayout({

            title,

            content: pageContent

        });


    initializeSidebar();

    initializeSidebarNavigation();

    initializeDrawer();

}


/* ==========================================================
                    SIDEBAR
========================================================== */

function initializeSidebar() {

    const sidebar =
        document.getElementById(
            "sidebar"
        );


    const openButton =
        document.getElementById(
            "openSidebar"
        );


    const closeButton =
        document.getElementById(
            "closeSidebar"
        );


    /* ======================================================
                    OPEN SIDEBAR
    ====================================================== */

    if (openButton) {

        openButton.addEventListener(

            "click",

            function() {

                if (sidebar) {

                    sidebar.classList.add(
                        "show"
                    );

                }

            }

        );

    }


    /* ======================================================
                    CLOSE SIDEBAR
    ====================================================== */

    if (closeButton) {

        closeButton.addEventListener(

            "click",

            function() {

                if (sidebar) {

                    sidebar.classList.remove(
                        "show"
                    );

                }

            }

        );

    }

}


/* ==========================================================
                SIDEBAR NAVIGATION
========================================================== */

function initializeSidebarNavigation() {

    const links =
        document.querySelectorAll(
            ".sidebar-menu a"
        );


    links.forEach(

        function(link) {

            link.addEventListener(

                "click",

                async function(event) {

                    event.preventDefault();


                    const page =
                        link.dataset.page;


                    if (!page) {

                        return;

                    }


                    await navigate(
                        page
                    );

                }

            );

        }

    );

}


/* ==========================================================
                    DRAWER
========================================================== */

function initializeDrawer() {

    const button =
        document.getElementById(
            "openPropertyDrawer"
        );


    if (!button) {

        return;

    }


    button.addEventListener(

        "click",

        function() {

            Drawer.open(

                "Add Property",

                renderPropertyForm(),

                initializePropertyForm

            );

        }

    );

}