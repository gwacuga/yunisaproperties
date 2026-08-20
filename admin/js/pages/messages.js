/* ==========================================================
                    MESSAGES PAGE
========================================================== */

import MessagesService
from "../services/messages.service.js";


/* ==========================================================
                    RENDER PAGE
========================================================== */

export function renderMessagesPage(){

    return `

        <section class="admin-page">

            <div class="page-header">

                <div>

                    <h2>
                        Messages
                    </h2>

                    <p>
                        Messages received from the website contact form.
                    </p>

                </div>

                <div
                    class="messages-count"
                    id="messagesCount">

                    Loading...

                </div>

            </div>


            <div
                id="messagesContainer"
                class="messages-container">

                <p>
                    Loading messages...
                </p>

            </div>

        </section>

    `;

}


/* ==========================================================
                    INITIALIZE MESSAGES
========================================================== */

export async function initializeMessagesPage(){

    const container =
        document.getElementById(
            "messagesContainer"
        );

    const count =
        document.getElementById(
            "messagesCount"
        );


    if(!container){

        return;

    }


    try{

        const messages =
            await MessagesService.getAll();


        if(count){

            count.textContent =
                `${messages.length} Message${messages.length === 1 ? "" : "s"}`;

        }


        if(!messages.length){

            container.innerHTML = `

                <div class="empty-state">

                    <div class="empty-icon">

                        <i class="fa-regular fa-envelope"></i>

                    </div>

                    <h3>
                        No messages yet
                    </h3>

                    <p>
                        Messages sent through the website contact form
                        will appear here.
                    </p>

                </div>

            `;

            return;

        }


        container.innerHTML = messages

            .sort(
                (a,b) =>
                    (b.createdAt || 0) -
                    (a.createdAt || 0)
            )

            .map(
                renderMessage
            )

            .join("");

    }

    catch(error){

        console.error(
            "Failed to load messages:",
            error
        );

        container.innerHTML = `

            <div class="error-state">

                <i class="fa-solid fa-triangle-exclamation"></i>

                <p>
                    Failed to load messages.
                </p>

            </div>

        `;

    }

}


/* ==========================================================
                    MESSAGE CARD
========================================================== */

function renderMessage(message){

    const phone =
        message.phone || "";

    const whatsappNumber =
        phone
            .replace(/\s+/g, "")
            .replace(/^0/, "254");


    return `

        <article
            class="message-card">


            <!-- HEADER -->

            <div class="message-card-header">

                <div class="message-sender">

                    <div class="message-avatar">

                        <i class="fa-solid fa-user"></i>

                    </div>

                    <div>

                        <h3>

                            ${escapeHTML(
                                message.name ||
                                "Unknown Visitor"
                            )}

                        </h3>

                        <span>

                            ${escapeHTML(
                                message.email ||
                                "No email"
                            )}

                        </span>

                    </div>

                </div>


                <div class="message-meta">

                    <span
                        class="message-status ${getStatusClass(message.status)}">

                        ${message.status || "New"}

                    </span>

                    <small>

                        ${formatDate(
                            message.createdAt
                        )}

                    </small>

                </div>

            </div>


            <!-- CONTACT INFORMATION -->

            <div class="message-contact">

                <div>

                    <i class="fa-solid fa-phone"></i>

                    <span>

                        ${escapeHTML(
                            message.phone ||
                            "No phone"
                        )}

                    </span>

                </div>


                <div>

                    <i class="fa-solid fa-envelope"></i>

                    <span>

                        ${escapeHTML(
                            message.email ||
                            "No email"
                        )}

                    </span>

                </div>

            </div>


            <!-- SUBJECT -->

            <div class="message-subject">

                <span>
                    Subject
                </span>

                <h4>

                    ${escapeHTML(
                        message.subject ||
                        "No subject"
                    )}

                </h4>

            </div>


            <!-- MESSAGE -->

            <div class="message-body">

                <span>
                    Message
                </span>

                <p>

                    ${escapeHTML(
                        message.message ||
                        "No message"
                    )}

                </p>

            </div>


            <!-- SOURCE -->

            <div class="message-source">

                <i class="fa-solid fa-globe"></i>

                <span>

                    ${escapeHTML(
                        message.source ||
                        "Website"
                    )}

                </span>

            </div>


            <!-- ACTIONS -->

            <div class="message-actions">


                ${
                    phone

                    ?

                    `

                    <a
                        href="tel:${phone}"
                        class="btn-primary">

                        <i class="fa-solid fa-phone"></i>

                        Call

                    </a>

                    `

                    :

                    ""

                }


                ${
                    phone

                    ?

                    `

                    <a
                        href="https://wa.me/${whatsappNumber}"
                        target="_blank"
                        rel="noopener"
                        class="btn-whatsapp">

                        <i class="fa-brands fa-whatsapp"></i>

                        WhatsApp

                    </a>

                    `

                    :

                    ""

                }


                ${
                    message.email

                    ?

                    `

                    <a
                        href="mailto:${message.email}"
                        class="btn-secondary">

                        <i class="fa-solid fa-envelope"></i>

                        Email

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
        .toLocaleString(
            "en-KE",
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        );

}


/* ==========================================================
                    ESCAPE HTML
========================================================== */

function escapeHTML(value){

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}