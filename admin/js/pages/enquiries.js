/* ==========================================================
                    ENQUIRIES PAGE
========================================================== */

import EnquiriesService
from "../../../js/services/enquiries.service.js";


/* ==========================================================
                    STATE
========================================================== */

let enquiries = [];

let currentFilter = "inbox";

let selectedEnquiry = null;


/* ==========================================================
                    RENDER PAGE
========================================================== */

export async function renderEnquiriesPage() {

    return `

    <section class="enquiries-page">

        <!-- ================================================
                            HEADER
        ================================================= -->

        <div class="page-header">

            <div>

                <h1>

                    Enquiries

                </h1>

                <p>

                    Manage customer property enquiries.

                </p>

            </div>

        </div>


        <!-- ================================================
                            INBOX LAYOUT
        ================================================= -->

        <div class="enquiries-layout">


            <!-- ============================================
                            SIDEBAR
            ============================================= -->

            <aside class="enquiries-sidebar">


                <button
                    class="enquiry-folder active"
                    data-filter="inbox">

                    <span>

                        <i class="fa-solid fa-inbox"></i>

                        Inbox

                    </span>

                    <strong id="inboxCount">

                        0

                    </strong>

                </button>


                <button
                    class="enquiry-folder"
                    data-filter="unread">

                    <span>

                        <i class="fa-solid fa-envelope"></i>

                        Unread

                    </span>

                    <strong id="unreadCount">

                        0

                    </strong>

                </button>


                <button
                    class="enquiry-folder"
                    data-filter="read">

                    <span>

                        <i class="fa-solid fa-envelope-open"></i>

                        Read

                    </span>

                    <strong id="readCount">

                        0

                    </strong>

                </button>


                <button
                    class="enquiry-folder"
                    data-filter="all">

                    <span>

                        <i class="fa-solid fa-layer-group"></i>

                        All Enquiries

                    </span>

                    <strong id="allCount">

                        0

                    </strong>

                </button>


            </aside>


            <!-- ============================================
                        MESSAGE LIST
            ============================================= -->

            <section class="enquiries-list-section">


                <div class="enquiries-list-header">

                    <h2 id="enquiriesListTitle">

                        Inbox

                    </h2>

                </div>


                <div
                    id="enquiriesList"
                    class="enquiries-list">

                    <p class="enquiries-loading">

                        Loading enquiries...

                    </p>

                </div>


            </section>


            <!-- ============================================
                        MESSAGE DETAIL
            ============================================= -->

            <section
                id="enquiryDetails"
                class="enquiry-details">

                <div class="empty-enquiry">

                    <i class="fa-regular fa-envelope"></i>

                    <h3>

                        Select an enquiry

                    </h3>

                    <p>

                        Select a message from the inbox
                        to view the full enquiry.

                    </p>

                </div>

            </section>


        </div>

    </section>

    `;

}


/* ==========================================================
                    INITIALIZE PAGE
========================================================== */

export async function initializeEnquiriesPage() {

    await loadEnquiries();

    initializeFilters();

}


/* ==========================================================
                    LOAD ENQUIRIES
========================================================== */

async function loadEnquiries() {

    const container =
        document.getElementById(
            "enquiriesList"
        );

    if (!container) {

        return;

    }


    try {

        enquiries =
            await EnquiriesService.getAll();


        /*
        Sort newest first
        */

        enquiries.sort(
            (a, b) =>
                (b.createdAt || 0) -
                (a.createdAt || 0)
        );


        updateCounts();

        renderEnquiryList();

    }

    catch (error) {

        console.error(
            "Failed to load enquiries:",
            error
        );


        container.innerHTML = `

            <div class="enquiries-error">

                <i class="fa-solid fa-triangle-exclamation"></i>

                <p>

                    Failed to load enquiries.

                </p>

            </div>

        `;

    }

}


/* ==========================================================
                    COUNTS
========================================================== */

function updateCounts() {

    const inboxCount =
        document.getElementById(
            "inboxCount"
        );

    const unreadCount =
        document.getElementById(
            "unreadCount"
        );

    const readCount =
        document.getElementById(
            "readCount"
        );

    const allCount =
        document.getElementById(
            "allCount"
        );


    const unread =
        enquiries.filter(
            enquiry =>
                enquiry.status === "New"
        );


    const read =
        enquiries.filter(
            enquiry =>
                enquiry.status === "Read"
        );


    if (inboxCount) {

        inboxCount.textContent =
            unread.length;

    }


    if (unreadCount) {

        unreadCount.textContent =
            unread.length;

    }


    if (readCount) {

        readCount.textContent =
            read.length;

    }


    if (allCount) {

        allCount.textContent =
            enquiries.length;

    }

}


/* ==========================================================
                    FILTERS
========================================================== */

function initializeFilters() {

    const buttons =
        document.querySelectorAll(
            ".enquiry-folder"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter;


                renderEnquiryList();

            }
        );

    });

}


/* ==========================================================
                    FILTER DATA
========================================================== */

function getFilteredEnquiries() {

    if (
        currentFilter === "unread" ||
        currentFilter === "inbox"
    ) {

        return enquiries.filter(
            enquiry =>
                enquiry.status === "New"
        );

    }


    if (currentFilter === "read") {

        return enquiries.filter(
            enquiry =>
                enquiry.status === "Read"
        );

    }


    return enquiries;

}


/* ==========================================================
                    LIST TITLE
========================================================== */

function getFilterTitle() {

    switch (currentFilter) {

        case "unread":

            return "Unread";


        case "read":

            return "Read";


        case "all":

            return "All Enquiries";


        default:

            return "Inbox";

    }

}


/* ==========================================================
                    RENDER LIST
========================================================== */

function renderEnquiryList() {

    const container =
        document.getElementById(
            "enquiriesList"
        );


    const title =
        document.getElementById(
            "enquiriesListTitle"
        );


    if (!container) {

        return;

    }


    if (title) {

        title.textContent =
            getFilterTitle();

    }


    const filtered =
        getFilteredEnquiries();


    if (!filtered.length) {

        container.innerHTML = `

            <div class="empty-enquiries">

                <i class="fa-regular fa-envelope-open"></i>

                <h3>

                    No enquiries here

                </h3>

                <p>

                    There are no enquiries in this folder.

                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =

        filtered
            .map(
                renderEnquiryItem
            )
            .join("");


    initializeEnquiryItems();

}


/* ==========================================================
                    MESSAGE ITEM
========================================================== */

function renderEnquiryItem(enquiry) {

    const unread =
        enquiry.status === "New";


    const date =
        formatDate(
            enquiry.createdAt
        );


    const preview =
        enquiry.message
            ? enquiry.message.substring(
                0,
                90
            )
            : "No message";


    return `

        <button
            class="
                enquiry-item
                ${unread ? "unread" : ""}
                ${selectedEnquiry?.id === enquiry.id ? "selected" : ""}
            "
            data-id="${enquiry.id}">


            <div class="enquiry-avatar">

                ${
                    (enquiry.customerName || "?")
                        .charAt(0)
                        .toUpperCase()
                }

            </div>


            <div class="enquiry-item-content">


                <div class="enquiry-item-top">

                    <strong>

                        ${escapeHtml(
                            enquiry.customerName ||
                            "Unknown Customer"
                        )}

                    </strong>


                    <span>

                        ${date}

                    </span>

                </div>


                <div class="enquiry-property">

                    ${escapeHtml(
                        enquiry.propertyTitle ||
                        "Property enquiry"
                    )}

                </div>


                <p>

                    ${escapeHtml(
                        preview
                    )}

                </p>


            </div>


            ${
                unread

                    ? `

                        <span class="unread-dot"></span>

                      `

                    : ""

            }


        </button>

    `;

}


/* ==========================================================
                    INITIALIZE ITEMS
========================================================== */

function initializeEnquiryItems() {

    const items =
        document.querySelectorAll(
            ".enquiry-item"
        );


    items.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const id =
                    item.dataset.id;


                const enquiry =
                    enquiries.find(
                        record =>
                            record.id === id
                    );


                if (!enquiry) {

                    return;

                }


                openEnquiry(
                    enquiry
                );

            }
        );

    });

}


/* ==========================================================
                    OPEN ENQUIRY
========================================================== */

async function openEnquiry(enquiry) {

    selectedEnquiry =
        enquiry;


    renderEnquiryList();

    renderEnquiryDetails(
        enquiry
    );


    /*
    Automatically mark unread
    enquiry as read.
    */

    if (
        enquiry.status === "New"
    ) {

        try {

            await EnquiriesService.update(
                enquiry.id,
                {
                    status: "Read"
                }
            );


            enquiry.status =
                "Read";


            updateCounts();

            renderEnquiryList();

            renderEnquiryDetails(
                enquiry
            );

        }

        catch (error) {

            console.error(
                "Failed to mark enquiry as read:",
                error
            );

        }

    }

}


/* ==========================================================
                    DETAILS
========================================================== */

function renderEnquiryDetails(enquiry) {

    const container =
        document.getElementById(
            "enquiryDetails"
        );


    if (!container) {

        return;

    }


    container.innerHTML = `

        <div class="enquiry-detail-header">


            <div>

                <span class="detail-label">

                    PROPERTY ENQUIRY

                </span>


                <h2>

                    ${escapeHtml(
                        enquiry.propertyTitle ||
                        "Property"
                    )}

                </h2>

            </div>


            <span class="
                enquiry-status
                ${enquiry.status === "New"
                    ? "status-new"
                    : "status-read"}
            ">

                ${
                    enquiry.status === "New"
                        ? "Unread"
                        : "Read"
                }

            </span>


        </div>


        <div class="customer-profile">

            <div class="customer-avatar">

                ${
                    (enquiry.customerName || "?")
                        .charAt(0)
                        .toUpperCase()
                }

            </div>


            <div>

                <h3>

                    ${escapeHtml(
                        enquiry.customerName ||
                        "Unknown Customer"
                    )}

                </h3>


                <p>

                    ${escapeHtml(
                        enquiry.customerEmail ||
                        "No email provided"
                    )}

                </p>

            </div>

        </div>


        <div class="customer-contact">

            <a
                href="tel:${escapeHtml(
                    enquiry.customerPhone || ""
                )}">

                <i class="fa-solid fa-phone"></i>

                ${escapeHtml(
                    enquiry.customerPhone ||
                    "No phone"
                )}

            </a>


            ${
                enquiry.customerEmail

                    ? `

                    <a
                        href="mailto:${escapeHtml(
                            enquiry.customerEmail
                        )}">

                        <i class="fa-solid fa-envelope"></i>

                        Email Customer

                    </a>

                    `

                    : ""

            }

        </div>


        <div class="enquiry-message">

            <span>

                MESSAGE

            </span>

            <p>

                ${escapeHtml(
                    enquiry.message ||
                    "No message provided."
                )}

            </p>

        </div>


        <div class="property-reference">

            <span>

                PROPERTY

            </span>

            <strong>

                ${escapeHtml(
                    enquiry.propertyTitle ||
                    "Property"
                )}

            </strong>

            <small>

                ${escapeHtml(
                    enquiry.propertyType ||
                    ""
                )}

                ${
                    enquiry.propertyStatus
                        ? ` • ${escapeHtml(
                            enquiry.propertyStatus
                        )}`
                        : ""
                }

            </small>

        </div>


        <div class="enquiry-actions">


            <a
                class="enquiry-action primary"
                href="https://wa.me/${cleanPhone(
                    enquiry.customerPhone
                )}"
                target="_blank">

                <i class="fa-brands fa-whatsapp"></i>

                WhatsApp

            </a>


            ${
                enquiry.customerEmail

                    ? `

                    <a
                        class="enquiry-action"
                        href="mailto:${escapeHtml(
                            enquiry.customerEmail
                        )}">

                        <i class="fa-solid fa-reply"></i>

                        Reply by Email

                    </a>

                    `

                    : ""

            }


        </div>


        <div class="enquiry-meta">

            Received:

            ${formatDateTime(
                enquiry.createdAt
            )}

        </div>

    `;

}


/* ==========================================================
                    HELPERS
========================================================== */

function formatDate(timestamp) {

    if (!timestamp) {

        return "";

    }


    return new Date(
        timestamp
    ).toLocaleDateString(
        "en-KE",
        {
            day: "numeric",
            month: "short"
        }
    );

}


function formatDateTime(timestamp) {

    if (!timestamp) {

        return "";

    }


    return new Date(
        timestamp
    ).toLocaleString(
        "en-KE",
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );

}


function cleanPhone(phone = "") {

    return phone
        .replace(/\D/g, "")
        .replace(/^0/, "254");

}


function escapeHtml(value = "") {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}