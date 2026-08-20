/* ==========================================================
                    VIEWINGS DASHBOARD
========================================================== */

import { db }
from "../../js/firebase.js";

import {
    ref,
    get
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


/* ==========================================================
                    GLOBAL DATA
========================================================== */

let websiteVisits = {};

let propertyViews = {};


/* ==========================================================
                    LOAD ANALYTICS
========================================================== */

async function loadAnalytics() {

    try {

        console.log(
            "Loading analytics..."
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


        websiteVisits =
            visitsSnapshot.exists() ?
            visitsSnapshot.val() :
            {};


        propertyViews =
            viewsSnapshot.exists() ?
            viewsSnapshot.val() :
            {};


        console.log(
            "Website visits:",
            websiteVisits
        );


        console.log(
            "Property views:",
            propertyViews
        );


        updateDashboard();


    } catch (error) {

        console.error(
            "Failed to load analytics:",
            error
        );

    }

}


/* ==========================================================
                UNIQUE VISITORS
========================================================== */

function getUniqueVisitors() {

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


    return visitors.size;

}


/* ==========================================================
                TODAY CHECK
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
                TODAY'S VISITORS
========================================================== */

function getTodayVisitors() {

    const visitors =
        new Set();


    Object.values(
            websiteVisits
        )
        .forEach(
            visit => {

                if (
                    isToday(
                        visit.timestamp
                    ) &&
                    visit.visitorId
                ) {

                    visitors.add(
                        visit.visitorId
                    );

                }

            }
        );


    return visitors.size;

}


/* ==========================================================
                TODAY'S PROPERTY VIEWS
========================================================== */

function getTodayPropertyViews() {

    return Object.values(
            propertyViews
        )
        .filter(
            view =>
            isToday(
                view.timestamp
            )
        )
        .length;

}


/* ==========================================================
                    UPDATE CARDS
========================================================== */

function updateDashboard() {

    const uniqueVisitors =
        getUniqueVisitors();


    const totalPropertyViews =
        Object.keys(
            propertyViews
        ).length;


    const todayVisitors =
        getTodayVisitors();


    const todayPropertyViews =
        getTodayPropertyViews();


    const visitorsElement =
        document.getElementById(
            "totalVisitors"
        );


    const propertyViewsElement =
        document.getElementById(
            "totalPropertyViews"
        );


    const todayVisitorsElement =
        document.getElementById(
            "todayVisitors"
        );


    const todayViewsElement =
        document.getElementById(
            "todayPropertyViews"
        );


    if (visitorsElement) {

        visitorsElement.textContent =
            uniqueVisitors;

    }


    if (propertyViewsElement) {

        propertyViewsElement.textContent =
            totalPropertyViews;

    }


    if (todayVisitorsElement) {

        todayVisitorsElement.textContent =
            todayVisitors;

    }


    if (todayViewsElement) {

        todayViewsElement.textContent =
            todayPropertyViews;

    }


    renderPopularProperties();

    renderRecentViews();

}


/* ==========================================================
                MOST VIEWED PROPERTIES
========================================================== */

function renderPopularProperties() {

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
                RECENT PROPERTY VIEWS
========================================================== */

function renderRecentViews() {

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
                                ${view.propertyTitle || "Property"}
                            </strong>

                            <span>
                                ${view.location || ""}
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


/* ==========================================================
                    INITIALIZE
========================================================== */

loadAnalytics();