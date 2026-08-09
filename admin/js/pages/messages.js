/* ==========================================================
                    MESSAGES PAGE
========================================================== */

import EnquiriesService
from "../../../js/services/enquiries.service.js";


/* ==========================================================
                    RENDER PAGE
========================================================== */

export function renderMessagesPage(){

    return `

        <section class="admin-page">

            <div class="page-header">

                <div>

                    <h2>
                        Enquiries
                    </h2>

                    <p>
                        Property enquiries from customers.
                    </p>

                </div>

            </div>


            <div
                id="enquiriesContainer"
                class="enquiries-container">

                <p>
                    Loading enquiries...
                </p>

            </div>

        </section>

    `;

}


/* ==========================================================
                    LOAD ENQUIRIES
========================================================== */

export async function initializeMessagesPage(){

    const container =
        document.getElementById(
            "enquiriesContainer"
        );

    if(!container){

        return;

    }


    try{

        const enquiries =
            await EnquiriesService.getAll();


        if(!enquiries.length){

            container.innerHTML = `

                <div class="empty-state">

                    <h3>
                        No enquiries yet
                    </h3>

                    <p>
                        Customer enquiries will appear here.
                    </p>

                </div>

            `;

            return;

        }


        container.innerHTML = enquiries

            .sort(
                (a,b) =>
                    (b.createdAt || 0) -
                    (a.createdAt || 0)
            )

            .map(
                renderEnquiry
            )

            .join("");

    }

    catch(error){

        console.error(
            "Failed to load enquiries:",
            error
        );

        container.innerHTML = `

            <div class="error-state">

                Failed to load enquiries.

            </div>

        `;

    }

}


/* ==========================================================
                    ENQUIRY CARD
========================================================== */

function renderEnquiry(enquiry){

    return `

        <article
            class="enquiry-card">

            <div class="enquiry-card-header">

                <div>

                    <h3>
                        ${enquiry.customerName || "Unknown Customer"}
                    </h3>

                    <span
                        class="enquiry-status ${getStatusClass(enquiry.status)}">

                        ${enquiry.status || "New"}

                    </span>

                </div>

                <small>

                    ${formatDate(enquiry.createdAt)}

                </small>

            </div>


            <div class="enquiry-property">

                <strong>
                    ${enquiry.propertyTitle || "Property enquiry"}
                </strong>

                <span>
                    ${enquiry.propertyType || ""}
                </span>

            </div>


            <div class="enquiry-contact">

                <p>

                    <strong>
                        Phone:
                    </strong>

                    ${enquiry.customerPhone || "Not provided"}

                </p>


                <p>

                    <strong>
                        Email:
                    </strong>

                    ${enquiry.customerEmail || "Not provided"}

                </p>

            </div>


            <div class="enquiry-message">

                <strong>
                    Message
                </strong>

                <p>
                    ${enquiry.message || "No message"}
                </p>

            </div>


            <div class="enquiry-actions">

                <a
                    href="tel:${enquiry.customerPhone || ""}"
                    class="btn-primary">

                    Call

                </a>


                ${
                    enquiry.customerPhone

                    ?

                    `

                    <a
                        href="https://wa.me/${enquiry.customerPhone.replace(/^0/, "254")}"
                        target="_blank"
                        class="btn-whatsapp">

                        WhatsApp

                    </a>

                    `

                    :

                    ""

                }

            </div>

        </article>

    `;

}


/* ==========================================================
                    STATUS CLASS
========================================================== */

function getStatusClass(status){

    return (

        status || "New"

    )

    .toLowerCase()

    .replace(/\s+/g, "-");

}


/* ==========================================================
                    DATE
========================================================== */

function formatDate(timestamp){

    if(!timestamp){

        return "Unknown date";

    }

    return new Date(timestamp)
        .toLocaleString();

}