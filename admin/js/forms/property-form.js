import {

    renderImageUpload,

    initializeImageUpload

} from "../components/image-upload.js";

import {

    counties

} from "../../../js/data/counties.js";

import PropertyManager
from "../managers/property-manager.js";

import {

    renderPropertyFields

} from "./property-fields.js";

import PropertiesService
from "../services/properties.service.js";

import {

    resetPropertyImages,

    getDeletedImages,

    getPropertyImages

} from "../components/image-gallery.js";

import Drawer
from "../components/drawer.js";

/* ==========================================================
                    PROPERTY FORM
========================================================== */

export function renderPropertyForm(property = null) {

    const countyOptions =

    counties.map(

        county =>

            `
            <option
                value="${county}"
                ${property?.county === county ? "selected" : ""}>

                ${county}

            </option>
            `

    ).join("");

    return `

        <form
            id="propertyForm"
            class="admin-form">

            <!-- BASIC INFORMATION -->

            <div class="form-section">

                <h3>

                    Basic Information

                </h3>

                <div class="form-group">

                    <label>

                        Property Title

                    </label>

                    <input
                       type="text"
                       id="title"
                       value="${property?.title || ""}"
                       placeholder="Luxury Villa in Karen"
                       required>

                </div>

                <div class="form-group">

                    <label>

                        Description

                    </label>

                    <textarea
                     id="description"
                     rows="5"
                     placeholder="Describe the property...">${property?.description || ""}</textarea>
                </div>

            </div>

            <!-- LOCATION -->

            <div class="form-section">

                <h3>

                    Location

                </h3>

                <div class="form-grid">

                    <div class="form-group">

                        <label>

                            County

                        </label>

                        <select
                          id="county"
                          required>

                         <option value="">

                         Select County

                        </option>

                            ${countyOptions}

                        </select>

                    </div>

                    <div class="form-group">

                        <label>

                            Location

                        </label>

                        <input
                         type="text"
                         id="location"
                         value="${property?.location || ""}"
                         placeholder="Karen">

                    </div>

                </div>

            </div>

            <!-- PRICING -->

            <div class="form-section">

                <h3>

                    Pricing

                </h3>

                <div class="form-grid">

                    <div class="form-group">

                        <label>

                            Price

                        </label>

                        <input
                         type="number"
                         id="price"
                         value="${property?.price || ""}"
                         placeholder="45000000">

                    </div>



                    <div class="form-group">

                        <label>

                            Property Type

                        </label>

                        <div class="property-types">

                            <div
                                 class="property-type-card ${property?.type === "House" || !property ? "active" : ""}"
                                 data-type="House">
                                🏠

                                <span>

                                    House

                                </span>

                            </div>

                            <div
                                class="property-type-card ${property?.type === "Apartment" ? "active" : ""}"
                                data-type="Apartment">

                                🏢

                                <span>

                                    Apartment

                                </span>

                            </div>

                            <div
                               class="property-type-card ${property?.type === "Land" ? "active" : ""}"
                               data-type="Land">

                                🌍

                                <span>

                                    Land

                                </span>

                            </div>

                            <div
                               class="property-type-card ${property?.type === "Commercial" ? "active" : ""}"
                               data-type="Commercial">
                                🏬

                                <span>

                                    Commercial

                                </span>

                            </div>

                            <div
                                class="property-type-card ${property?.type === "Airbnb" ? "active" : ""}"
                                data-type="Airbnb">

                                🏖

                                <span>

                                    Airbnb

                                </span>

                            </div>

                        </div>

                        <input
                         type="hidden"
                         id="propertyType"
                         value="${property?.type || "House"}">

                    </div>

                </div>

            </div>

            <!-- PROPERTY STATUS -->

<div class="form-section">

    <h3>

        Listing Status

    </h3>

    <div class="form-grid">

        <div class="form-group">

            <label>

                Status

            </label>

           <select id="status">

    <option value="For Sale"
        ${property?.status === "For Sale" ? "selected" : ""}>
        For Sale
    </option>

    <option value="For Rent"
        ${property?.status === "For Rent" ? "selected" : ""}>
        For Rent
    </option>

    <option value="For Lease"
        ${property?.status === "For Lease" ? "selected" : ""}>
        For Lease
    </option>

    <option value="Reserved"
        ${property?.status === "Reserved" ? "selected" : ""}>
        Reserved
    </option>

    <option value="Sold"
        ${property?.status === "Sold" ? "selected" : ""}>
        Sold
    </option>

</select>

        </div>

    </div>

</div>


<!-- FEATURED PROPERTY -->

<div class="form-section">

    <h3>

        Homepage Display

    </h3>

    <div class="form-group">

        <label class="checkbox-label">

            <input
                type="checkbox"
                id="featured"
                ${property?.featured ? "checked" : ""}>

            Show this property on Homepage

        </label>

    </div>

</div>

            <!-- DYNAMIC PROPERTY FIELDS -->

            <div id="dynamicPropertyFields">

              ${renderPropertyFields(

              property?.type || "House",

               property || {}

             )}

            </div>
            <!-- PROPERTY IMAGES -->

            <div class="form-section">

                <h3>

                    Property Images

                </h3>

                ${renderImageUpload()}

            </div>

            <input
              type="hidden"
              id="propertyId"
              value="${property?.id || ""}">

            <!-- SAVE BUTTON -->

            <button
                class="btn-primary"
                type="submit">

                ${property ? "Update Property" : "Save Property"}

            </button>

        </form>

    `;

}

export function initializePropertyForm(property = null) {

    if (!property) {

        resetPropertyImages();

    }

    if (property) {

        PropertyManager.set(property);

    }

    const form = document.getElementById(
        "propertyForm"
    );

    form.addEventListener(
        "submit",
        saveProperty
    );

    const cards = document.querySelectorAll(
        ".property-type-card"
    );

    const input = document.getElementById(
        "propertyType"
    );

    cards.forEach(card => {

        card.addEventListener("click", () => {

            cards.forEach(c =>
                c.classList.remove("active")
            );

            card.classList.add("active");

            const type = card.dataset.type;

            input.value = type;

            PropertyManager.set({
                type
            });

            document.getElementById(
                "dynamicPropertyFields"
            ).innerHTML =

                renderPropertyFields(
                    type,
                    PropertyManager.get()
                );

            bindPropertyForm();

            initializeImageUpload();

        });

    });

    initializeImageUpload();

    const featured = document.getElementById(
        "featured"
    );

    if(featured){

        featured.checked =
            property?.featured || false;

    }

    bindPropertyForm();

}

/* ==========================================================
                BIND PROPERTY FORM
========================================================== */


function bindPropertyForm() {

    const fields = [

        "title",
        "description",
        "county",
        "location",
        "price",
        "size",

        "houseType",
        "floors",
        "compoundSize",

        "apartmentType",
        "floorNumber",
        "totalFloors",
        "liftAvailable",
        "serviceCharge",

        "landSize",
        "landUnit",
        "landType",
        "ownershipType",
        "roadAccess",

        "commercialType",
        "washrooms",
        "loadingArea",
        "powerSupply",
        "businessReady",

        "airbnbType",
        "guestCapacity",
        "nightlyPrice",
        "minimumStay",
        "availability",
        "amenities",

        "bedrooms",
        "bathrooms",
        "parking",
        "furnishing",
        "status"

    ];

    fields.forEach(id => {

        const element = document.getElementById(id);

        if(!element) return;

        const eventType =

            element.tagName === "SELECT"

                ? "change"

                : "input";

        element.addEventListener(

            eventType,

            event => {

                let value;

                if(event.target.type === "checkbox"){

                    value = event.target.checked;

                }

                else if(event.target.type === "number"){

                    value =

                        event.target.value === ""

                        ? 0

                        : Number(event.target.value);

                }

                else{

                    value = event.target.value;

                }

                PropertyManager.set({

                    [id]: value

                });

            }

        );

    });

    /* ==============================================
                FEATURED PROPERTY
    ============================================== */

    const featured = document.getElementById(
        "featured"
    );

    if(featured){

        featured.addEventListener(

            "change",

            event => {

                PropertyManager.set({

                    featured: event.target.checked

                });

            }

        );

    }

}


/* ==========================================================
                    SAVE PROPERTY
========================================================== */

async function saveProperty(event) {

    event.preventDefault();

    try {

        const property = {

    status:"For Sale",

    featured:false,

    ...PropertyManager.get()

      };

        property.images = getPropertyImages();

        property.deletedImages = getDeletedImages();

        const editingId =
               document.getElementById(
        "propertyId"
            ).value || property.id;

             // Keep the id even if PropertyManager loses it
                 property.id =
                  editingId || property.id;

               console.log(
                     "Saving Property:",
                    JSON.stringify(property, null, 2)
             );

        let savedProperty;

        if (editingId) {

            property.id = editingId;

            savedProperty =
                await PropertiesService.updateProperty(
                    editingId,
                    property
                );

        } else {

            savedProperty =
                await PropertiesService.addProperty(
                    property
                );

            // Keep the generated id in the manager
            PropertyManager.set(savedProperty);

        }

        console.log(
            "Saved:",
            savedProperty
        );

        PropertyManager.reset();

        document
            .getElementById("propertyForm")
            .reset();

        resetPropertyImages();

        document
            .getElementById("dynamicPropertyFields")
            .innerHTML =
            renderPropertyFields("House");

        document
            .querySelectorAll(".property-type-card")
            .forEach(card =>
                card.classList.remove("active")
            );

        document
            .querySelector(
                '.property-type-card[data-type="House"]'
            )
            .classList.add("active");

        document
            .getElementById("propertyType")
            .value = "House";

        bindPropertyForm();

        alert(
            "Property saved successfully!"
        );

        Drawer.close();

    }

    catch (error) {

        console.error(error);

        alert(
            "Failed to save property."
        );

    }

}