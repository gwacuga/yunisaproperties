/* ==========================================================
            FLOATING CONTACT BUTTONS
========================================================== */


import CONFIG

from "../config.js";



export function renderFloatingContact(){


    return `


    <div class="floating-contact">


        <!-- WHATSAPP -->


        <a

        href="https://wa.me/${CONFIG.COMPANY.PHONE.replace("+","")}"

        target="_blank"

        class="floating-whatsapp"

        aria-label="WhatsApp">


            <i class="fa-brands fa-whatsapp"></i>


        </a>





        <!-- PHONE CALL -->


        <a

        href="tel:${CONFIG.COMPANY.PHONE}"

        class="floating-call"

        aria-label="Call">


            <i class="fa-solid fa-phone"></i>


        </a>



    </div>


    `;


}