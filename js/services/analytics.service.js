/* ==========================================================
                    ANALYTICS SERVICE
========================================================== */

import { db }
from "../firebase.js";

import {
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


/* ==========================================================
                    GET VISITOR ID
========================================================== */

function getVisitorId() {

    let visitorId =
        localStorage.getItem(
            "yunisaVisitorId"
        );


    if (!visitorId) {

        visitorId =
            "visitor_" +
            Date.now() +
            "_" +
            Math.random()
            .toString(36)
            .substring(2, 10);


        localStorage.setItem(
            "yunisaVisitorId",
            visitorId
        );

    }


    return visitorId;

}


/* ==========================================================
                RECORD WEBSITE VISIT
========================================================== */

async function recordWebsiteVisit() {

    console.log(
        "ANALYTICS: Recording website visit"
    );


    try {

        const visitorId =
            getVisitorId();


        const visitRef =
            push(
                ref(
                    db,
                    "analytics/websiteVisits"
                )
            );


        const visitData = {

            visitorId: visitorId,

            page: window.location.pathname,

            timestamp: Date.now()

        };


        console.log(
            "ANALYTICS: Website visit data:",
            visitData
        );


        await set(
            visitRef,
            visitData
        );


        console.log(
            "ANALYTICS: WEBSITE VISIT SAVED"
        );


    } catch (error) {

        console.error(
            "ANALYTICS: Website visit error:",
            error
        );

    }

}


/* ==========================================================
                RECORD PROPERTY VIEW
========================================================== */

async function recordPropertyView(property) {

    console.log(
        "ANALYTICS: Recording property view"
    );


    try {

        if (!property ||
            !property.id
        ) {

            console.error(
                "ANALYTICS: Property missing"
            );

            return;

        }


        const visitorId =
            getVisitorId();


        const viewRef =
            push(
                ref(
                    db,
                    "analytics/propertyViews"
                )
            );


        const viewData = {

            propertyId: property.id,

            propertyTitle: property.title || "",

            propertyType: property.type || "",

            location: property.location || "",

            county: property.county || "",

            visitorId: visitorId,

            timestamp: Date.now()

        };


        await set(
            viewRef,
            viewData
        );


        console.log(
            "ANALYTICS: PROPERTY VIEW SAVED SUCCESSFULLY"
        );


    } catch (error) {

        console.error(
            "ANALYTICS: Property view error:",
            error
        );

    }

}


/* ==========================================================
                    EXPORT
========================================================== */

const AnalyticsService = {

    recordWebsiteVisit,

    recordPropertyView

};


export default AnalyticsService;