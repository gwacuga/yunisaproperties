/* ==========================================================
                PUBLIC PROPERTY CARD
========================================================== */

export function renderPropertyCard(property) {

    console.log(
        "Card ID:",
        property.id,
        property
    );
    const status = property.status || "For Sale";
    console.log(
    "STATUS:",
    property.title,
    property.status
);

    const coverImage =

        property.images?.find(
            image => image.isCover
        )?.url

        ||

        property.images?.[0]?.url

        ||

        "https://placehold.co/600x400?text=No+Image";


    /* ======================================================
                    PROPERTY FEATURES
    ====================================================== */

    const features = [];

    // Bedrooms
    if (property.bedrooms) {

        features.push(`
            <div>
                <i class="fas fa-bed"></i>
                <span>${property.bedrooms} Beds</span>
            </div>
        `);

    }

    // Bathrooms
    if (property.bathrooms) {

        features.push(`
            <div>
                <i class="fas fa-bath"></i>
                <span>${property.bathrooms} Baths</span>
            </div>
        `);

    }

    // House Size
    if (property.size) {

        features.push(`
            <div>
                <i class="fas fa-ruler-combined"></i>
                <span>${property.size}</span>
            </div>
        `);

    }

    // Land Size
    if (property.landSize) {

        features.push(`
            <div>
                <i class="fas fa-vector-square"></i>
                <span>${property.landSize}</span>
            </div>
        `);

    }

    // Floors
    if (property.floors) {

        features.push(`
            <div>
                <i class="fas fa-building"></i>
                <span>${property.floors} Floors</span>
            </div>
        `);

    }

    // Parking
    if (property.parking) {

        features.push(`
            <div>
                <i class="fas fa-car"></i>
                <span>${property.parking} Parking</span>
            </div>
        `);

    }

    // Furnishing
    if (property.furnishing) {

        features.push(`
            <div>
                <i class="fas fa-couch"></i>
                <span>${property.furnishing}</span>
            </div>
        `);

    }

    return `

        <div class="property-card">

            <div class="property-image">

               <span class="property-status">

             ${status}

               </span>

           <img
              src="${coverImage}"
              alt="${property.title}"
             >

           <span class="property-type">

              ${property.type}

            </span>

            </div>

            <div class="property-content">

                <h3>

                    ${property.title}

                </h3>

                <h2 class="property-price">

                    Ksh ${Number(property.price).toLocaleString()}

                </h2>

                <p class="property-location">

                    <i class="fas fa-location-dot"></i>

                    ${property.location || ""}

                    ${property.location && property.county ? "," : ""}

                    ${property.county || ""}

                </p>

                <div class="property-features">

                    ${features.join("")}

                </div>

                <a
                    href="property-details.html?id=${property.id}"
                    class="btn-primary"
                >

                    View Details

                    <i class="fas fa-arrow-right"></i>

                </a>

            </div>

        </div>

    `;

}