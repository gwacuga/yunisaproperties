/* ==========================================================
                    DASHBOARD
========================================================== */

export function renderDashboard() {

    return `

        <div class="dashboard-header">

            <div>

                <h1>Dashboard</h1>

                <p>
                    Welcome to Yunisa Real Estate CMS
                </p>

            </div>

            <button
                class="btn-primary"
                id="openPropertyDrawer">

                <i class="fa-solid fa-plus"></i>

                Add Property

            </button>

        </div>

        <div class="stats-grid">

            <div class="stat-card">

                <h3>Properties</h3>

                <h2 id="propertiesCount">0</h2>

            </div>

            <div class="stat-card">

                <h3>Agents</h3>

                <h2 id="agentsCount">0</h2>

            </div>

            <div class="stat-card">

                <h3>Messages</h3>

                <h2 id="messagesCount">0</h2>

            </div>

            <div class="stat-card">

                <h3>Subscribers</h3>

                <h2 id="subscribersCount">0</h2>

            </div>

        </div>

    `;

}