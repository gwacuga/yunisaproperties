/* ==========================================================
                PROPERTY FIELDS
========================================================== */

import {

    renderHouseFields

} from "./house-fields.js";

import {

    renderApartmentFields

} from "./apartment-fields.js";

import {

    renderLandFields

} from "./land-fields.js";

import {

    renderCommercialFields

} from "./commercial-fields.js";

import {

    renderAirbnbFields

} from "./airbnb-fields.js";

export function renderPropertyFields(
    type,
    property = {}
) {

    switch (type) {

        case "House":

            return renderHouseFields(
                property
            );

        case "Apartment":

            return renderApartmentFields(
                property
            );

        case "Land":

            return renderLandFields(
                property
            );

        case "Commercial":

            return renderCommercialFields(
                property
            );

        case "Airbnb":

            return renderAirbnbFields(
                property
            );

        default:

            return renderHouseFields(
                property
            );

    }

}