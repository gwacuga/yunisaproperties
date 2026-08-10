/* ==========================================================
                    ADMIN HEADER
========================================================== */

export function renderHeader(title = "Dashboard") {

    return `

        <header class="topbar">

            <button
                id="openSidebar"
                class="menu-btn">

                <i class="fa-solid fa-bars"></i>

            </button>

            <h2>${title}</h2>

            <div class="topbar-right">

                <button class="icon-btn">

                    <i class="fa-solid fa-bell"></i>

                </button>

                <button class="icon-btn">

                    <i class="fa-solid fa-user"></i>

                </button>

            </div>

        </header>

    `;

}