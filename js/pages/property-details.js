/* ==========================================================
                PROPERTY DETAILS PAGE
========================================================== */
import CONFIG
from "../config.js";

import PropertiesService
from "../services/properties.service.js";


import {

    renderHeader,

    initializeHeader

}
from "../components/header.js";


import {

    renderFooter

}
from "../components/footer.js";

import {

    renderPropertyCard

}

from "../components/property-card.js";

import EnquiriesService
from "../services/enquiries.service.js";





/* ==========================================================
                IMAGE GALLERY
========================================================== */


function initializeGallery(){


    const mainImage =

        document.getElementById(
            "mainPropertyImage"
        );


    const mainCaption =

        document.getElementById(
            "mainImageCaption"
        );



    const thumbnails =

        document.querySelectorAll(
            ".gallery-thumb"
        );



    if(
        !mainImage ||
        !mainCaption
    ){

        return;

    }



    thumbnails.forEach(image => {


        image.addEventListener(

            "click",

            ()=>{


                mainImage.src =

                    image.dataset.image;



                mainCaption.textContent =

                    image.dataset.caption;



                thumbnails.forEach(img =>

                    img.classList.remove(
                        "active"
                    )

                );



                image.classList.add(
                    "active"
                );


            }

        );


    });


}

/* ==========================================================
                SIMILAR PROPERTIES
========================================================== */

function renderSimilarProperties(currentProperty, properties){

    const similar = properties
        .filter(property =>

            property.id !== currentProperty.id &&

            property.type === currentProperty.type

        )
        .slice(0,4);

    if(!similar.length){

        return "";

    }

    return `

<section class="similar-properties">

    <div class="section-heading">

        <h2>

            Similar Properties

        </h2>

        <p>

            You may also like these listings.

        </p>

    </div>

    <div class="properties-grid">

        ${similar.map(renderPropertyCard).join("")}

    </div>

</section>

`;

}


/* ==========================================================
                INITIALIZE ENQUIRY FORM
========================================================== */

function initializeEnquiryForm(property){

    const form =
        document.getElementById(
            "propertyEnquiryForm"
        );

    if(!form){

        return;

    }

    form.addEventListener(

        "submit",

        async(event)=>{

            event.preventDefault();

            try{

                const enquiry = {

                    propertyId:
                        property.id,

                    propertyTitle:
                        property.title,

                    propertyType:
                        property.type,

                    propertyStatus:
                        property.status,

                    customerName:
                        document.getElementById(
                            "customerName"
                        ).value.trim(),

                    customerPhone:
                        document.getElementById(
                            "customerPhone"
                        ).value.trim(),

                    customerEmail:
                        document.getElementById(
                            "customerEmail"
                        ).value.trim(),

                    message:
                        document.getElementById(
                            "customerMessage"
                        ).value.trim(),

                    status:
                        "New"

                };

                console.log(
                    "Saving enquiry:",
                    enquiry
                );

                await EnquiriesService.add(
                    enquiry
                );

                alert(
                    "Thank you! Your enquiry has been sent."
                );

                form.reset();

            }

            catch(error){

                console.error(error);

                alert(
                    "Failed to send enquiry."
                );

            }

        }

    );

}



/* ==========================================================
                LOAD PROPERTY
========================================================== */


async function loadProperty(){



    const params =

        new URLSearchParams(
            window.location.search
        );



    const id =

        params.get("id");



    console.log(
        "Property ID:",
        id
    );



    if(!id){

        console.error(
            "No property ID"
        );

        return;

    }




    const property =

        await PropertiesService.get(id);

    const allProperties =

    await PropertiesService.getAll();



    console.log(
        "Loaded property:",
        property
    );



    if(!property){

        console.error(
            "Property not found"
        );

        return;

    }

    /* ======================================================
                PROPERTY FEATURES
====================================================== */

const detailFeatures = [];

// Property Type
detailFeatures.push(`
<div>
🏠
${property.type || "Property"}
</div>
`);

// Bedrooms
if (property.bedrooms) {

    detailFeatures.push(`
    <div>
    🛏
    ${property.bedrooms} Bedrooms
    </div>
    `);

}

// Bathrooms
if (property.bathrooms) {

    detailFeatures.push(`
    <div>
    🚿
    ${property.bathrooms} Bathrooms
    </div>
    `);

}

// Parking
if (property.parking) {

    detailFeatures.push(`
    <div>
    🚗
    ${property.parking} Parking
    </div>
    `);

}

// House Size
if (property.size) {

    detailFeatures.push(`
    <div>
    📐
    ${property.size}
    </div>
    `);

}

// Compound Size
if (property.compoundSize) {

    detailFeatures.push(`
    <div>
    🌳
    ${property.compoundSize}
    </div>
    `);

}

// Land Size
if (property.landSize) {

    detailFeatures.push(`
    <div>
    🌍
    ${property.landSize}
    </div>
    `);

}

// Floors
if (property.floors) {

    detailFeatures.push(`
    <div>
    🏢
    ${property.floors} Floors
    </div>
    `);

}

/* ======================================================
                PROPERTY DETAILS LIST
====================================================== */

const propertyDetails = [];

// House Type
if (property.houseType) {

    propertyDetails.push(`
        <div class="detail-row">
            <span>House Type</span>
            <strong>${property.houseType}</strong>
        </div>
    `);

}

// Furnishing
if (property.furnishing) {

    propertyDetails.push(`
        <div class="detail-row">
            <span>Furnishing</span>
            <strong>${property.furnishing}</strong>
        </div>
    `);

}

// Land Size
if (property.landSize) {

    propertyDetails.push(`
        <div class="detail-row">
            <span>Land Size</span>
            <strong>${property.landSize}</strong>
        </div>
    `);

}

// Commercial Type
if (property.commercialType) {

    propertyDetails.push(`
        <div class="detail-row">
            <span>Commercial Type</span>
            <strong>${property.commercialType}</strong>
        </div>
    `);

}

// Bedrooms
if (property.bedrooms) {

    propertyDetails.push(`
        <div class="detail-row">
            <span>Bedrooms</span>
            <strong>${property.bedrooms}</strong>
        </div>
    `);

}

// Bathrooms
if (property.bathrooms) {

    propertyDetails.push(`
        <div class="detail-row">
            <span>Bathrooms</span>
            <strong>${property.bathrooms}</strong>
        </div>
    `);

}


    const app =

        document.getElementById(
            "app"
        );





    app.innerHTML =



        renderHeader()



        +



        `


<main class="property-details-page">



<section class="details-gallery">



    <!-- MAIN COVER IMAGE -->

    <div class="main-image">


<img

id="mainPropertyImage"

src="${
property.images?.[0]?.url || ""
}"

alt="${property.title}">



<p

id="mainImageCaption">


${
property.images?.[0]?.caption || ""

}


</p>


</div>




    <!-- THUMBNAILS -->


    <div class="image-thumbnails">



    ${
        property.images && property.images.length


        ?


        property.images.map(

            (image,index)=>


            `


            <img

class="gallery-thumb ${
index === 0 ? "active" : ""
}"

src="${image.url}"

data-image="${image.url}"

data-caption="${image.caption || ""}"

alt="${property.title}">

            `


        ).join("")


        :


        `

        <p>
            No images available
        </p>

        `


    }



    </div>



</section>







<section class="details-content">



<span class="property-type">


${property.type || "Property"}


</span>





<h1>

${property.title || ""}

</h1>





<h2>

KES ${property.price || 0}

</h2>





<p>

📍 

${property.location || ""},

${property.county || ""}


</p>





<p>

${property.description || ""}


</p>








<div class="details-features">

    ${detailFeatures.join("")}

</div>








<div class="extra-details">

    <h3>

        Property Details

    </h3>

    ${propertyDetails.join("")}

</div>





<a

class="whatsapp-btn"

href="https://wa.me/${CONFIG.COMPANY.PHONE.replace('+','')}?text=Hello, I am interested in ${property.title}"

target="_blank">


💬 Chat on WhatsApp


</a>


<div class="property-enquiry">

    <h2>

        Enquire About ${property.title}

    </h2>

    <p>

        Interested in this property? Fill in the form below and our property consultant will get back to you as soon as possible.

    </p>

    <form
        id="propertyEnquiryForm"
        class="enquiry-form">

        <div class="enquiry-grid">

            <div class="form-group">

                <label>

                    Full Name

                </label>

                <input
                    type="text"
                    id="customerName"
                    placeholder="Enter your full name"
                    required>

            </div>

            <div class="form-group">

                <label>

                    Phone Number

                </label>

                <input
                    type="tel"
                    id="customerPhone"
                    placeholder="+254 7XX XXX XXX"
                    required>

            </div>

        </div>

        <div class="form-group">

            <label>

                Email Address

            </label>

            <input
                type="email"
                id="customerEmail"
                placeholder="example@email.com">

        </div>

        <div class="form-group">

            <label>

                Your Message

            </label>

            <textarea
                id="customerMessage"
                rows="6"
                placeholder="Hello, I'm interested in ${property.title}. Kindly contact me with more information."
                required></textarea>

        </div>

        <button
          type="submit">

              Send Enquiry

        </button>

    </form>

</div>




</section>





</main>


${renderSimilarProperties(
    property,
    allProperties
)}


`


+

renderFooter();





    // Activate components after HTML exists

    initializeHeader();


    initializeGallery();

    initializeEnquiryForm(
            property
           );

}




loadProperty();
