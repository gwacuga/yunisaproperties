/* ==========================================================
                    CONTACT APPLICATION
========================================================== */

import {
    renderHeader,
    initializeHeader
} from "./components/header.js";

import {
    renderFooter
} from "./components/footer.js";

import {
    renderFloatingContact
} from "./components/floating-contact.js";

import {
    renderContact
} from "./pages/contact.js";

import {
    db
} from "./firebase.js";

import {
    ref,
    push,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


/* ==========================================================
                    INITIALIZE CONTACT
========================================================== */

function initializeContact() {

    const app =
        document.getElementById("app");

    if (!app) {

        return;

    }


    app.innerHTML =

        renderHeader()

        +

        renderContact()

        +

        renderFooter()

        +

        renderFloatingContact();


    /* Initialize components AFTER rendering */

    initializeHeader();


    /* Initialize contact form */

    initializeContactForm();

}


/* ==========================================================
                    CONTACT FORM
========================================================== */

function initializeContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    if (!form) {

        console.error(
            "Contact form not found."
        );

        return;

    }


    const status =
        document.getElementById(
            "contactFormStatus"
        );


    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            /* ==================================================
                            GET FORM VALUES
            ================================================== */

            const name =
                document.getElementById(
                    "contactName"
                ).value.trim();


            const phone =
                document.getElementById(
                    "contactPhone"
                ).value.trim();


            const email =
                document.getElementById(
                    "contactEmail"
                ).value.trim();


            const subject =
                document.getElementById(
                    "contactSubject"
                ).value.trim();


            const message =
                document.getElementById(
                    "contactMessage"
                ).value.trim();


            /* ==================================================
                            VALIDATION
            ================================================== */

            if (
                !name ||
                !phone ||
                !email ||
                !message
            ) {

                if (status) {

                    status.textContent =
                        "Please fill in all required fields.";

                    status.style.color =
                        "#dc2626";

                }

                return;

            }


            /* ==================================================
                            DISABLE BUTTON
            ================================================== */

            const button =
                form.querySelector(
                    ".contact-submit"
                );


            if (button) {

                button.disabled = true;

                button.innerHTML = `

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    Sending...

                `;

            }


            if (status) {

                status.textContent =
                    "Sending your message...";

                status.style.color =
                    "#64748b";

            }


            /* ==================================================
                            SAVE MESSAGE
            ================================================== */

            try {

                const messagesRef =
                    ref(
                        db,
                        "messages"
                    );


                const messageData = {

                    name:
                        name,

                    phone:
                        phone,

                    email:
                        email,

                    subject:
                        subject || "General Enquiry",

                    message:
                        message,

                    status:
                        "New",

                    source:
                        "Contact Page",

                    createdAt:
                        serverTimestamp()

                };


                const newMessage =
                    await push(
                        messagesRef,
                        messageData
                    );


                console.log(
                    "MESSAGE SAVED:",
                    newMessage.key
                );


                /* ==================================================
                            SUCCESS
                ================================================== */

                if (status) {

                    status.textContent =
                        "Your message has been sent successfully. We will get back to you soon.";

                    status.style.color =
                        "#15803d";

                }


                form.reset();


            }

            catch (error) {

                console.error(
                    "Failed to send message:",
                    error
                );


                if (status) {

                    status.textContent =
                        "Failed to send your message. Please try again.";

                    status.style.color =
                        "#dc2626";

                }

            }


            /* ==================================================
                        RESTORE BUTTON
            ================================================== */

            finally {

                if (button) {

                    button.disabled = false;

                    button.innerHTML = `

                        <i class="fa-solid fa-paper-plane"></i>

                        Send Message

                    `;

                }

            }

        }
    );

}


/* ==========================================================
                    START APPLICATION
========================================================== */

initializeContact();