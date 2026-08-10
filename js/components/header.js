/* ==========================================================
                    HEADER COMPONENT
========================================================== */

import CONFIG from "../config.js";


/* ==========================================================
                    RENDER HEADER
========================================================== */

export function renderHeader() {

    return `

        <header class="site-header">

            <div class="logo">

                <a href="index.html">

                    <img
                        src="${CONFIG.COMPANY.LOGO}"
                        alt="${CONFIG.COMPANY.NAME}"
                        class="site-logo">

                </a>

                <div class="logo-text">

                    <h2>
                        ${CONFIG.COMPANY.NAME}
                    </h2>

                    <span>
                        ${CONFIG.COMPANY.TAGLINE}
                    </span>

                </div>

            </div>


            <button
                class="menu-toggle"
                id="menuToggle"
                aria-label="Open navigation">

                ☰

            </button>


            <nav
                class="main-nav"
                id="mainNav">

                <a href="index.html">
                    Home
                </a>

                <a href="properties.html">
                    Properties
                </a>

                <a href="about.html">
                    About
                </a>

                <a href="contact.html">
                    Contact
                </a>

            </nav>

        </header>

    `;

}


/* ==========================================================
                    INITIALIZE HEADER
========================================================== */

export function initializeHeader() {

    const menuButton =
        document.getElementById("menuToggle");

    const nav =
        document.getElementById("mainNav");


    if (
        !menuButton ||
        !nav
    ) {
        return;
    }


    menuButton.addEventListener(
        "click",
        () => {

            nav.classList.toggle("open");

        }
    );

}