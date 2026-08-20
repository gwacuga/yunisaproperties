/* ==========================================================
                    CONTACT PAGE
========================================================== */

import CONFIG from "../config.js";


/* ==========================================================
                    RENDER CONTACT PAGE
========================================================== */

export function renderContact() {

    const company =
        CONFIG.COMPANY;

    const phone =
        company.PHONE;

    const email =
        company.EMAIL;

    const address =
        company.ADDRESS;

    const whatsappNumber =
        phone.replace(/\D/g, "");


    return `

<main class="contact-page">


    <!-- ==================================================
                        CONTACT HERO
    ================================================== -->

    <section class="contact-hero">

        <div class="contact-hero-overlay"></div>

        <div class="contact-hero-content">

            <span class="contact-label">

                CONTACT US

            </span>

            <h1>

                Let's Talk About Your Property Needs

            </h1>

            <p>

                Whether you are buying, selling or looking
                for a rental, ${company.NAME} is ready to help.

            </p>

        </div>

    </section>



    <!-- ==================================================
                        CONTACT CARDS
    ================================================== -->

    <section class="contact-cards">


        <!-- PHONE -->

        <div class="contact-card">

            <div class="contact-icon">

                <i class="fa-solid fa-phone"></i>

            </div>

            <h3>

                Call Us

            </h3>

            <p>

                ${phone}

            </p>

            <a
                href="tel:${phone}">

                Call Now

            </a>

        </div>



        <!-- EMAIL -->

        <div class="contact-card">

            <div class="contact-icon">

                <i class="fa-solid fa-envelope"></i>

            </div>

            <h3>

                Email Us

            </h3>

            <p>

                ${email}

            </p>

            <a
                href="mailto:${email}">

                Send Email

            </a>

        </div>



        <!-- LOCATION -->

        <div class="contact-card">

            <div class="contact-icon">

                <i class="fa-solid fa-location-dot"></i>

            </div>

            <h3>

                Our Location

            </h3>

            <p>

                ${address}

            </p>

        </div>


    </section>



    <!-- ==================================================
                        CONTACT CONTENT
    ================================================== -->

    <section class="contact-main">


        <!-- LEFT SIDE -->

        <div class="contact-info">

            <span class="section-label">

                GET IN TOUCH

            </span>

            <h2>

                We're Here To Help

            </h2>

            <p>

                Looking for your next property?

                Have a property you would like to sell?

                Our team is ready to help you find the
                right solution.

            </p>


            <div class="contact-info-item">

                <i class="fa-solid fa-phone"></i>

                <div>

                    <strong>

                        Phone

                    </strong>

                    <span>

                        ${phone}

                    </span>

                </div>

            </div>


            <div class="contact-info-item">

                <i class="fa-solid fa-envelope"></i>

                <div>

                    <strong>

                        Email

                    </strong>

                    <span>

                        ${email}

                    </span>

                </div>

            </div>


            <div class="contact-info-item">

                <i class="fa-solid fa-location-dot"></i>

                <div>

                    <strong>

                        Location

                    </strong>

                    <span>

                        ${address}

                    </span>

                </div>

            </div>


            <!-- WHATSAPP -->

            <a
                class="contact-whatsapp"
                href="https://wa.me/${whatsappNumber}"
                target="_blank"
                rel="noopener">

                <i class="fa-brands fa-whatsapp"></i>

                Chat With Us On WhatsApp

            </a>

        </div>



        <!-- RIGHT SIDE -->

        <div class="contact-form-wrapper">

            <h2>

                Send Us A Message

            </h2>

            <p>

                Fill in the form below and our team
                will get back to you.

            </p>


            <form
                id="contactForm"
                class="contact-form">


                <div class="form-row">


                    <div class="form-group">

                        <label for="contactName">

                            Full Name

                        </label>

                        <input
                            type="text"
                            id="contactName"
                            name="name"
                            placeholder="Your full name"
                            required>

                    </div>


                    <div class="form-group">

                        <label for="contactPhone">

                            Phone Number

                        </label>

                        <input
                            type="tel"
                            id="contactPhone"
                            name="phone"
                            placeholder="+254 7XX XXX XXX"
                            required>

                    </div>


                </div>



                <div class="form-group">

                    <label for="contactEmail">

                        Email Address

                    </label>

                    <input
                        type="email"
                        id="contactEmail"
                        name="email"
                        placeholder="your@email.com"
                        required>

                </div>



                <div class="form-group">

                    <label for="contactSubject">

                        Subject

                    </label>

                    <input
                        type="text"
                        id="contactSubject"
                        name="subject"
                        placeholder="What can we help you with?">

                </div>



                <div class="form-group">

                    <label for="contactMessage">

                        Message

                    </label>

                    <textarea
                        id="contactMessage"
                        name="message"
                        rows="6"
                        placeholder="Tell us how we can help..."
                        required></textarea>

                </div>



                <button
                    type="submit"
                    class="contact-submit">

                    <i class="fa-solid fa-paper-plane"></i>

                    Send Message

                </button>


                <p
                    id="contactFormStatus"
                    class="contact-form-status">
                </p>


            </form>

        </div>


    </section>



    <!-- ==================================================
                        MAP
    ================================================== -->

    <section class="contact-map">

        <iframe
            src="https://www.google.com/maps?q=Kenya&output=embed"
            loading="lazy"
            allowfullscreen>
        </iframe>

    </section>


</main>

    `;

}