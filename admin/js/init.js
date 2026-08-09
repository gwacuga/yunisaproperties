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

        typeof content === "function"

            ? await content()

            : await content;

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

    openButton?.addEventListener(

        "click",

        () => {

            sidebar.classList.add(
                "show"
            );

        }

    );

    closeButton?.addEventListener(

        "click",

        () => {

            sidebar.classList.remove(
                "show"
            );

        }

    );

}

/* ==========================================================
                SIDEBAR NAVIGATION
========================================================== */

function initializeSidebarNavigation() {

    const links =

        document.querySelectorAll(
            ".sidebar-menu a"
        );

    links.forEach(link => {

        link.addEventListener(

            "click",

            async event => {

                event.preventDefault();

                const page =

                    link.dataset.page;

                await navigate(page);

            }

        );

    });

}

/* ==========================================================
                    DRAWER
========================================================== */

function initializeDrawer() {

    const button =

        document.getElementById(
            "openPropertyDrawer"
        );

    if (!button) return;

    button.addEventListener(

        "click",

        () => {

            Drawer.open(

                "Add Property",

                renderPropertyForm(),

                initializePropertyForm

            );

        }

    );

}