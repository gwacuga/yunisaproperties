/* ==========================================================
                    VIEWINGS / ANALYTICS PAGE
========================================================== */

import { db }
from "../../../js/firebase.js";

import {
    ref,
    get
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


/* ==========================================================
                    RENDER PAGE
========================================================== */

export function renderViewingsPage() {

    return `

        <div class="analytics-page">

            <!-- ==========================================
                        HEADER
            ========================================== -->

            <section class="analytics-header">

                <div>

                    <h1>
                        Website Analytics
                    </h1>

                    <p>
                        Monitor website visitors and
                        property activity.
                    </p>

                </div>

            </section>


            <!-- ==========================================
                        STATISTICS
            ========================================== -->

            <section class="analytics-cards">


                <div class="analytics-card">

                    <span>
                        👥
                    </span>

                    <div>

                        <p>
                            Unique Visitors
                        </p>

                        <h2 id="totalVisitors">
                            0
                        </h2>

                    </div>

                </div>


                <div class="analytics-card">

                    <span>
                        🏠
                    </span>

                    <div>

                        <p>
                            Property Views
                        </p>

                        <h2 id="totalPropertyViews">
                            0
                        </h2>

                    </div>

                </div>


                <div class="analytics-card">

                    <span>
                        📅
                    </span>

                    <div>

                        <p>
                            Visitors Today
                        </p>

                        <h2 id="todayVisitors">
                            0
                        </h2>

                    </div>

                </div>


                <div class="analytics-card">

                    <span>
                        👁️
                    </span>

                    <div>

                        <p>
                            Property Views Today
                        </p>

                        <h2 id="todayPropertyViews">
                            0
                        </h2>

                    </div>

                </div>


            </section>


            <!-- ==========================================
                    MOST VIEWED PROPERTIES
            ========================================== -->

            <section class="analytics-section">

                <div class="section-heading">

                    <h2>
                        Most Viewed Properties
                    </h2>

                    <p>
                        Properties receiving the most
                        attention.
                    </p>

                </div>


                <div
                    id="popularProperties"
                    class="analytics-list">

                    <p>
                        Loading...
                    </p>

                </div>

            </section>


            <!-- ==========================================
                    RECENT PROPERTY VIEWS
            ========================================== -->

            <section class="analytics-section">

                <div class="section-heading">

                    <h2>
                        Recent Property Views
                    </h2>

                    <p>
                        Latest activity on your
                        property listings.
                    </p>

                </div>


                <div
                    id="recentPropertyViews"
                    class="analytics-list">

                    <p>
                        Loading...
                    </p>

                </div>

            </section>

        </div>

    `;

}


/* ==========================================================
                    LOAD ANALYTICS
========================================================== */

export async function initializeViewingsPage() {

    try {

        console.log(
            "Loading website analytics..."
        );


        const visitsSnapshot =
            await get(
                ref(
                    db,
                    "analytics/websiteVisits"
                )
            );


        const viewsSnapshot =
            await get(
                ref(
                    db,
                    "analytics/propertyViews"
                )
            );


        const websiteVisits =
            visitsSnapshot.exists() ?
            visitsSnapshot.val() :
            {};


        const propertyViews =
            viewsSnapshot.exists() ?
            viewsSnapshot.val() :
            {};


        updateStatistics(
            websiteVisits,
            propertyViews
        );


        renderPopularProperties(
            propertyViews
        );


        renderRecentViews(
            propertyViews
        );


    } catch (error) {

        console.error(
            "Analytics loading failed:",
            error
        );

    }

}


/* ==========================================================
                    STATISTICS
========================================================== */

function updateStatistics(
    websiteVisits,
    propertyViews
) {


    /* ------------------------------------------
                UNIQUE VISITORS
    ------------------------------------------ */

    const visitors =
        new Set();


    Object.values(
            websiteVisits
        )
        .forEach(
            visit => {

                if (
                    visit.visitorId
                ) {

                    visitors.add(
                        visit.visitorId
                    );

                }

            }
        );


    const totalVisitors =
        visitors.size;


    /* ------------------------------------------
                PROPERTY VIEWS
    ------------------------------------------ */

    const totalPropertyViews =
        Object.keys(
            propertyViews
        ).length;


    /* ------------------------------------------
                TODAY
    ------------------------------------------ */

    const today =
        new Date();


    const todayVisitors =
        new Set();


    let todayViews = 0;


    Object.values(
            websiteVisits
        )
        .forEach(
            visit => {

                if (
                    isToday(
                        visit.timestamp
                    )
                ) {

                    if (
                        visit.visitorId
                    ) {

                        todayVisitors.add(
                            visit.visitorId
                        );

                    }

                }

            }
        );


    Object.values(
            propertyViews
        )
        .forEach(
            view => {

                if (
                    isToday(
                        view.timestamp
                    )
                ) {

                    todayViews++;

                }

            }
        );


    /* ------------------------------------------
                    DISPLAY
    ------------------------------------------ */

    setText(
        "totalVisitors",
        totalVisitors
    );


    setText(
        "totalPropertyViews",
        totalPropertyViews
    );


    setText(
        "todayVisitors",
        todayVisitors.size
    );


    setText(
        "todayPropertyViews",
        todayViews
    );

}


/* ==========================================================
                    DATE CHECK
========================================================== */

function isToday(timestamp) {

    if (!timestamp) {

        return false;

    }


    const date =
        new Date(timestamp);


    const today =
        new Date();


    return (

        date.getDate() ===
        today.getDate()

        &&

        date.getMonth() ===
        today.getMonth()

        &&

        date.getFullYear() ===
        today.getFullYear()

    );

}


/* ==========================================================
                    SET TEXT
========================================================== */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            value;

    }

}


/* ==========================================================
                MOST VIEWED PROPERTIES
========================================================== */

function renderPopularProperties(
    propertyViews
) {

    const container =
        document.getElementById(
            "popularProperties"
        );


    if (!container) {

        return;

    }


    const counts = {};


    Object.values(
            propertyViews
        )
        .forEach(
            view => {

                const id =
                    view.propertyId;


                if (!id) {

                    return;

                }


                if (!counts[id]) {

                    counts[id] = {

                        title: view.propertyTitle ||
                            "Unnamed Property",

                        location: view.location ||
                            "",

                        views: 0

                    };

                }


                counts[id].views++;

            }
        );


    const properties =
        Object.values(
            counts
        )
        .sort(
            (a, b) =>
            b.views - a.views
        )
        .slice(
            0,
            5
        );


    if (!properties.length) {

        container.innerHTML =
            "<p>No property views yet.</p>";

        return;

    }


    container.innerHTML =

        properties
        .map(
            property => `

                <div class="analytics-property">

                    <div>

                        <strong>
                            ${property.title}
                        </strong>

                        <span>
                            ${property.location}
                        </span>

                    </div>

                    <strong>
                        ${property.views}
                        views
                    </strong>

                </div>

            `
        )
        .join("");

}


/* ==========================================================
                    RECENT VIEWS
========================================================== */

function renderRecentViews(
    propertyViews
) {

    const container =
        document.getElementById(
            "recentPropertyViews"
        );


    if (!container) {

        return;

    }


    const recent =
        Object.values(
            propertyViews
        )
        .sort(
            (a, b) =>
            (b.timestamp || 0) -
            (a.timestamp || 0)
        )
        .slice(
            0,
            10
        );


    if (!recent.length) {

        container.innerHTML =
            "<p>No property views yet.</p>";

        return;

    }


    container.innerHTML =

        recent
        .map(
            view => {

                const date =
                    new Date(
                        view.timestamp
                    );


                return `

                    <div class="recent-view">

                        <div>

                            <strong>
                                ${
                                    view.propertyTitle ||
                                    "Property"
                                }
                            </strong>

                            <span>
                                ${
                                    view.location ||
                                    ""
                                }
                            </span>

                        </div>

                        <time>
                            ${date.toLocaleString()}
                        </time>

                    </div>

                `;

            }
        )
        .join("");

}