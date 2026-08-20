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

        <section class="admin-page messages-page">


            <!-- PAGE HEADER -->

            <div class="page-header messages-page-header">

                <div>

                    <span class="messages-eyebrow">

                        CUSTOMER COMMUNICATION

                    </span>

                    <h2>

                        Messages

                    </h2>

                    <p>

                        Messages received from your website
                        contact form.

                    </p>

                </div>


                <div
                    class="messages-total"
                    id="messagesCount">

                    Loading...

                </div>

            </div>



            <!-- MESSAGE STATISTICS -->

            <div class="message-stats">


                <div class="message-stat-card">

                    <div class="message-stat-icon">

                        <i class="fa-solid fa-envelope"></i>

                    </div>

                    <div>

                        <span>
                            Total Messages
                        </span>

                        <strong id="totalMessages">
                            0
                        </strong>

                    </div>

                </div>


                <div class="message-stat-card">

                    <div class="message-stat-icon new">

                        <i class="fa-solid fa-envelope-open"></i>

                    </div>

                    <div>

                        <span>
                            New Messages
                        </span>

                        <strong id="newMessages">
                            0
                        </strong>

                    </div>

                </div>


                <div class="message-stat-card">

                    <div class="message-stat-icon today">

                        <i class="fa-solid fa-calendar-day"></i>

                    </div>

                    <div>

                        <span>
                            Today
                        </span>

                        <strong id="todayMessages">
                            0
                        </strong>

                    </div>

                </div>


            </div>



            <!-- MESSAGES -->

            <div
                id="messagesContainer"
                class="messages-container">

                <div class="messages-loading">

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    <span>
                        Loading messages...
                    </span>

                </div>

            </div>


        </section>

    `;

}


/* ==========================================================
                    INITIALIZE PAGE
========================================================== */

export async function initializeMessagesPage(){

    await loadMessages();

}


/* ==========================================================
                    LOAD MESSAGES
========================================================== */

async function loadMessages(){

    const container =
        document.getElementById(
            "messagesContainer"
        );


    if(!container){

        return;

    }


    try{

        const messages =
            await MessagesService.getAll();


        messages.sort(

            (a,b) =>

                (b.createdAt || 0) -
                (a.createdAt || 0)

        );


        updateStatistics(
            messages
        );


        if(!messages.length){

            container.innerHTML = `

                <div class="messages-empty">

                    <div class="messages-empty-icon">

                        <i class="fa-regular fa-envelope"></i>

                    </div>

                    <h3>
                        No messages yet
                    </h3>

                    <p>

                        Messages sent through the website
                        contact form will appear here.

                    </p>

                </div>

            `;

            return;

        }


        container.innerHTML =

            messages

                .map(
                    renderMessage
                )

                .join("");


        initializeMessageActions();


    }

    catch(error){

        console.error(
            "Failed to load messages:",
            error
        );


        container.innerHTML = `

            <div class="messages-error">

                <i class="fa-solid fa-triangle-exclamation"></i>

                <h3>
                    Unable to load messages
                </h3>

                <p>
                    Please try again.
                </p>

            </div>

        `;

    }

}


/* ==========================================================
                    STATISTICS
========================================================== */

function updateStatistics(messages){

    const total =
        messages.length;


    const newMessages =
        messages.filter(
            message =>
                !message.status ||
                message.status.toLowerCase() === "new"
        ).length;


    const today =
        new Date();


    const todayStart =
        new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ).getTime();


    const todayMessages =
        messages.filter(
            message =>
                message.createdAt &&
                message.createdAt >= todayStart
        ).length;


    const totalElement =
        document.getElementById(
            "totalMessages"
        );


    const newElement =
        document.getElementById(
            "newMessages"
        );


    const todayElement =
        document.getElementById(
            "todayMessages"
        );


    const countElement =
        document.getElementById(
            "messagesCount"
        );


    if(totalElement){

        totalElement.textContent =
            total;

    }


    if(newElement){

        newElement.textContent =
            newMessages;

    }


    if(todayElement){

        todayElement.textContent =
            todayMessages;

    }


    if(countElement){

        countElement.textContent =

            `${total} Message${total === 1 ? "" : "s"}`;

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


    const status =
        message.status || "New";


    return `

        <article
            class="message-card"
            data-message-id="${message.id}">


            <!-- HEADER -->

            <div class="message-card-header">


                <div class="message-sender">


                    <div class="message-avatar">

                        <i class="fa-solid fa-user"></i>

                    </div>


                    <div class="message-sender-info">

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
                        class="message-status ${getStatusClass(status)}">

                        ${escapeHTML(status)}

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
                    SUBJECT
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
                    MESSAGE
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
                        "Contact Page"
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
                        class="message-btn call">

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
                        class="message-btn whatsapp">

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
                        class="message-btn email">

                        <i class="fa-solid fa-envelope"></i>

                        Email

                    </a>

                    `

                    :

                    ""

                }


                <button
                    type="button"
                    class="message-btn delete delete-message"
                    data-id="${message.id}">

                    <i class="fa-solid fa-trash"></i>

                    Delete

                </button>


            </div>


        </article>

    `;

}


/* ==========================================================
                    MESSAGE ACTIONS
========================================================== */

function initializeMessageActions(){

    const deleteButtons =
        document.querySelectorAll(
            ".delete-message"
        );


    deleteButtons.forEach(button => {

        button.addEventListener(

            "click",

            async () => {

                const id =
                    button.dataset.id;


                const confirmed =
                    confirm(
                        "Are you sure you want to permanently delete this message?"
                    );


                if(!confirmed){

                    return;

                }


                try{

                    button.disabled =
                        true;


                    button.innerHTML = `

                        <i class="fa-solid fa-spinner fa-spin"></i>

                        Deleting...

                    `;


                    await MessagesService.delete(
                        id
                    );


                    const card =
                        document.querySelector(
                            `.message-card[data-message-id="${id}"]`
                        );


                    if(card){

                        card.classList.add(
                            "message-removing"
                        );


                        setTimeout(
                            () => {

                                card.remove();

                                loadMessages();

                            },
                            300
                        );

                    }


                }

                catch(error){

                    console.error(
                        "Failed to delete message:",
                        error
                    );


                    alert(
                        "Failed to delete the message. Please try again."
                    );


                    button.disabled =
                        false;


                    button.innerHTML = `

                        <i class="fa-solid fa-trash"></i>

                        Delete

                    `;

                }

            }

        );

    });

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

                dateStyle:
                    "medium",

                timeStyle:
                    "short"

            }

        );

}


/* ==========================================================
                    ESCAPE HTML
========================================================== */

function escapeHTML(value){

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}