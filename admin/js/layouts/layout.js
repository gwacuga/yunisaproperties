/* ==========================================================
                    ADMIN LAYOUT
========================================================== */

import {

    renderSidebar

} from "../components/sidebar.js";

import {

    renderHeader

} from "../components/header.js";

export function renderLayout({

    title,

    content

}){

    return `

        ${renderSidebar()}

        <main class="content">

            ${renderHeader(title)}

            <section id="pageContent">

                ${content}

            </section>

        </main>

    `;

}