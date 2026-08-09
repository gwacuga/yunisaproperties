/* ==========================================================
                    PROPERTIES PAGE
========================================================== */

import Drawer from "../components/drawer.js";

import {
    renderPropertyForm,
    initializePropertyForm
} from "../forms/property-form.js";

import Confirm from "../components/confirm.js";

import {
    renderPropertyCard
} from "../components/property-card.js";

import PropertiesService
from "../services/properties.service.js";

import {
    addPropertyImages,
    resetPropertyImages
} from "../components/image-gallery.js";

import PropertyManager
from "../managers/property-manager.js";

/* ==========================================================
                    RENDER PAGE
========================================================== */

export async function renderPropertiesPage() {

    const properties =
        await PropertiesService.getProperties();

    return `

        <div class="properties-page">

            <div class="page-header">

                <h2>Properties</h2>

                <button
                    id="openPropertyDrawer"
                    class="btn-primary">

                    Add Property

                </button>

            </div>

            <div
                id="propertiesGrid"
                class="properties-grid">

                ${
                    properties.length

                    ? properties
                        .map(renderPropertyCard)
                        .join("")

                    : `

                        <div class="empty-state">

                            No properties found.

                        </div>

                    `
                }

            </div>

        </div>

    `;

}

/* ==========================================================
                    INITIALIZE PAGE
========================================================== */

export function initializePropertiesPage() {

    initializeEditProperties();

    initializeDeleteProperties();

}

/* ==========================================================
                    EDIT PROPERTY
========================================================== */

function initializeEditProperties() {

    document
        .querySelectorAll(".edit-property")
        .forEach(button => {

            button.addEventListener(

                "click",

                async () => {

                    const id =
                        button.dataset.id;

                    const property =
                        await PropertiesService.getProperty(id);

                    if (!property) {

                        console.error(
                            "Property not found:",
                            id
                        );

                        return;

                    }

                    PropertyManager.set(property);

                    resetPropertyImages();

                    Drawer.open(

                        "Edit Property",

                        renderPropertyForm(property),

                        () => {

                            initializePropertyForm(property);

                            if (property.images) {

                                addPropertyImages(
                                    property.images
                                );

                            }

                        }

                    );

                }

            );

        });

}

/* ==========================================================
                    DELETE PROPERTY
========================================================== */

function initializeDeleteProperties() {

    document
        .querySelectorAll(".delete-property")
        .forEach(button => {

            button.addEventListener(

                "click",

                async () => {

                    const id =
                        button.dataset.id;

                    const confirmed =
                        await Confirm.show({

                            title: "Delete Property",

                            message:
                                `Are you sure you want to delete "${button.closest(".property-card").querySelector("h3").textContent}"?`,

                            confirmText: "Delete",

                            cancelText: "Cancel"

                        });

                    if (!confirmed) return;

                    try {

                        await PropertiesService.deleteProperty(id);

                        await refreshProperties();

                    }

                    catch (error) {

                        console.error(error);

                        alert(
                            "Failed to delete property."
                        );

                    }

                }

            );

        });

}

/* ==========================================================
                    REFRESH
========================================================== */

async function refreshProperties() {

    const properties =
        await PropertiesService.getProperties();

    const grid =
        document.getElementById(
            "propertiesGrid"
        );

    if (!grid) return;

    grid.innerHTML =

        properties.length

            ? properties
                .map(renderPropertyCard)
                .join("")

            : `

                <div class="empty-state">

                    No properties found.

                </div>

            `;

    initializeEditProperties();

    initializeDeleteProperties();

}