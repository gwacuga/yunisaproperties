/* ==========================================================
                    PROPERTY CARD
========================================================== */

export function renderPropertyCard(property) {

    console.log(
        "Rendering property:",
        property
    );

    console.log(
        "Property id:",
        property.id
    );

    console.log(
        "########## RENDER PROPERTY CARD ##########",
        property
    );

    /* ======================================================
                    STATUS
    ====================================================== */

    const status =

        property.status || "For Sale";

    /* ======================================================
                    COVER IMAGE
    ====================================================== */

    const coverImage =

        property.images?.find(
            image => image.isCover
        )?.url

        ||

        property.images?.[0]?.url

        ||

        "https://placehold.co/600x400?text=No+Image";

    /* ======================================================
                    CARD
    ====================================================== */

    return `

        <div
            class="property-card"
            data-id="${property.id}">

            <div class="property-image">

                <img
                    src="${coverImage}"
                    alt="${property.title}">

            </div>

            <div class="property-content">

                <h3>

                    ${property.title}

                </h3>

                <span class="property-type">

                    ${property.type}

                </span>

                <p class="property-status">

                    <strong>Status:</strong> ${status}

                </p>

                <h2 class="property-price">

                    Ksh ${Number(property.price).toLocaleString()}

                </h2>

                <p>

                    📍
                    ${property.location || ""}
                    ${property.location && property.county ? "," : ""}
                    ${property.county || ""}

                </p>

                <div class="property-features">

                    ${property.bedrooms || "-"} 🛏

                    ${property.bathrooms || "-"} 🚿

                    ${property.size || property.landSize || "-"} 📐

                </div>

                <div class="property-actions">

                    <button
                        class="btn-secondary edit-property"
                        data-id="${property.id}">

                        Edit

                    </button>

                    <button
                        class="btn-danger delete-property"
                        data-id="${property.id}">

                        Delete

                    </button>

                </div>

            </div>

        </div>

    `;

}