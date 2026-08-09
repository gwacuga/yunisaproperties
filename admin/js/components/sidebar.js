/* ==========================================================
                    ADMIN SIDEBAR
========================================================== */

export function renderSidebar() {

    return `

        <aside
            class="sidebar"
            id="sidebar">

            <div class="sidebar-header">

                <h2>YUNISA</h2>

                <button
                    id="closeSidebar"
                    class="close-sidebar">

                    <i class="fa-solid fa-xmark"></i>

                </button>

            </div>

            <nav class="sidebar-menu">

                <a
                    href="#"
                    data-page="dashboard">

                    <i class="fa-solid fa-gauge"></i>

                    <span>

                        Dashboard

                    </span>

                </a>

                <a
                    href="#"
                    data-page="properties">

                    <i class="fa-solid fa-building"></i>

                    <span>

                        Properties

                    </span>

                </a>

                <a
                    href="#"
                    data-page="agents">

                    <i class="fa-solid fa-user-tie"></i>

                    <span>

                        Agents

                    </span>

                </a>
                <a href="#" data-page="enquiries">

                 <i class="fa-regular fa-envelope"></i>

                  <span>Enquiries</span>

                 </a>

                <a
                    href="#"
                    data-page="blogs">

                    <i class="fa-solid fa-newspaper"></i>

                    <span>

                        Blogs

                    </span>

                </a>

                <a
                    href="#"
                    data-page="news">

                    <i class="fa-solid fa-bullhorn"></i>

                    <span>

                        News

                    </span>

                </a>

                <a
                    href="#"
                    data-page="messages">

                    <i class="fa-solid fa-envelope"></i>

                    <span>

                        Messages

                    </span>

                </a>

                <a
                    href="#"
                    data-page="viewings">

                    <i class="fa-solid fa-calendar-check"></i>

                    <span>

                        Viewings

                    </span>

                </a>

                <a
                    href="#"
                    data-page="subscribers">

                    <i class="fa-solid fa-users"></i>

                    <span>

                        Subscribers

                    </span>

                </a>

                <a
                    href="#"
                    data-page="testimonials">

                    <i class="fa-solid fa-star"></i>

                    <span>

                        Testimonials

                    </span>

                </a>

                <a
                    href="#"
                    data-page="settings">

                    <i class="fa-solid fa-gear"></i>

                    <span>

                        Settings

                    </span>

                </a>

            </nav>

        </aside>

    `;

}