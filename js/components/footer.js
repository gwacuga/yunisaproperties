/* ==========================================================
                    FOOTER COMPONENT
========================================================== */


import CONFIG
from "../config.js";



export function renderFooter(){


return `


<footer class="site-footer">


    <div class="footer-container">



        <!-- COMPANY -->

        <div class="footer-column footer-about">


            <h3>

                ${CONFIG.COMPANY.NAME}

            </h3>



            <p>

                ${CONFIG.COMPANY.TAGLINE}

            </p>



            <div class="footer-social">


                <a href="#">

                    <i class="fab fa-facebook-f"></i>

                </a>



                <a href="#">

                    <i class="fab fa-instagram"></i>

                </a>



                <a href="#">

                    <i class="fab fa-whatsapp"></i>

                </a>



            </div>


        </div>





        <!-- LINKS -->

        <div class="footer-column">


            <h4>

                Quick Links

            </h4>



            <a href="index.html">

                Home

            </a>



            <a href="properties.html">

                Properties

            </a>



            <a href="about.html">

                About Us

            </a>



            <a href="contact.html">

                Contact

            </a>


        </div>





        <!-- SERVICES -->

        <div class="footer-column">


            <h4>

                Property Types

            </h4>



            <a href="#">

                Houses

            </a>



            <a href="#">

                Apartments

            </a>



            <a href="#">

                Land

            </a>



            <a href="#">

                Commercial

            </a>


        </div>






        <!-- CONTACT -->

        <div class="footer-column">


            <h4>

                Contact

            </h4>




            <p>

                <i class="fas fa-phone"></i>

                ${CONFIG.COMPANY.PHONE}

            </p>




            <p>

                <i class="fas fa-envelope"></i>

                ${CONFIG.COMPANY.EMAIL}

            </p>



            <p>

                <i class="fas fa-location-dot"></i>

                Kenya

            </p>


        </div>



    </div>





    <div class="footer-bottom">


        <p>

        © ${new Date().getFullYear()}
        ${CONFIG.COMPANY.NAME}

        . All Rights Reserved.

        </p>


    </div>



</footer>


`;

}