/* ==========================================================
                    HOME PAGE
========================================================== */
import {
    renderFeaturedLocations
}
from "../components/featured-locations.js";

import PropertiesService
from "../services/properties.service.js";


import {
    renderPropertyCard
}
from "../components/property-card.js";


import {
    renderHero
}
from "../components/hero.js";

import {

    renderHomeAbout

}
from "../components/home-about.js";



/* ==========================================================
                    PROPERTY CATEGORIES
========================================================== */

const PROPERTY_CATEGORIES = [

{
    type:"House",
    title:"Houses",
    icon:"fa-solid fa-house",
    image:"https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    description:"Family homes and villas"
},

{
    type:"Apartment",
    title:"Apartments",
    icon:"fa-solid fa-building",
    image:"https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
    description:"Modern apartments"
},

{
    type:"Land",
    title:"Land",
    icon:"fa-solid fa-map-location-dot",
    image:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    description:"Prime investment land"
},

{
    type:"Commercial",
    title:"Commercial",
    icon:"fa-solid fa-city",
    image:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    description:"Shops and offices"
},

{
    type:"Airbnb",
    title:"Airbnb",
    icon:"fa-solid fa-key",
    image:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    description:"Holiday stays"
}

];

function renderCategories(){

    return PROPERTY_CATEGORIES.map(category=>`

<div

class="category-card"

style="background-image:url('${category.image}')"

onclick="window.location='properties.html?type=${category.type}'"

>

<div class="category-overlay">

<i class="${category.icon}"></i>

<h3>

${category.title}

</h3>

<p>

${category.description}

</p>

<span

id="count-${category.type}"

class="category-count"

>

Loading...

</span>

</div>

</div>

`).join("");

}


/* ==========================================================
                    RENDER HOME
========================================================== */

export function renderHome(){

    return `

<main class="home-page">


    <!-- HERO -->

    ${renderHero()}



    <!-- SEARCH -->

<section class="property-search-section">

    <div class="search-heading">

        <span>

            YUNISA REAL ESTATE

        </span>

        <h2>

            Find Your Dream Property

        </h2>

        <p>

            Browse verified houses, apartments, land,
            commercial properties and Airbnb listings
            across Kenya. Search by property type,
            location and budget to find the perfect
            place to call home.

        </p>

    </div>

    <div class="property-search">

        <select id="searchType">

            <option value="">

                Property Type

            </option>

            <option value="House">

                House

            </option>

            <option value="Apartment">

                Apartment

            </option>

            <option value="Land">

                Land

            </option>

            <option value="Commercial">

                Commercial

            </option>

            <option value="Airbnb">

                Airbnb

            </option>

        </select>

        <input
            type="text"
            id="searchLocation"
            placeholder="Location">

        <input
            type="number"
            id="minPrice"
            placeholder="Min Price">

        <input
            type="number"
            id="maxPrice"
            placeholder="Max Price">

        <button>

            <i class="fas fa-search"></i>

            Search

        </button>

    </div>

</section>




    <!-- FEATURED -->

    <section class="featured-properties">


        <div class="section-heading">

            <h2>

                Featured Properties

            </h2>


            <p>

                Explore our latest available properties

            </p>

        </div>



        <div

            id="featuredProperties"

            class="properties-grid">


            <p>

                Loading properties...

            </p>


        </div>


    </section>




    <!-- CATEGORIES -->

    <section class="property-categories">


        <h2>

            Explore Categories

        </h2>



        <div class="categories-grid">

        ${renderCategories()}

        </div>


    </section>

${renderHomeAbout()}

${renderFeaturedLocations()}


    <!-- WHY US -->

    <section class="why-us">


        <h2>

            Why Choose Yunisa?

        </h2>


        <p>

            Trusted property solutions,
            quality listings and professional
            real estate services.

        </p>


    </section>


</main>

`;

}

/* ==========================================================
                LOAD FEATURED PROPERTIES
========================================================== */

export async function loadFeaturedProperties(){

    const container =

        document.getElementById(
            "featuredProperties"
        );



    if(!container){

        return;

    }



    try{

        const properties =

            await PropertiesService.getAll();



        let featured =

    properties.filter(

        property => property.featured

    );

          if(featured.length < 6){

    const remaining =

        properties.filter(

            property => !property.featured

        );

    featured = [

        ...featured,

        ...remaining

    ].slice(0,6);

         }



        container.innerHTML =



            featured.length



            ?



            featured

            .map(renderPropertyCard)

            .join("")



            :



            `

            <p>

            No properties available.

            </p>

            `;

    }

    catch(error){

        console.error(error);



        container.innerHTML =

        `

        <p>

        Failed to load properties.

        </p>

        `;

    }

}

/* ==========================================================
            LOAD CATEGORY COUNTS
========================================================== */

export async function loadCategoryCounts(){

    try{

        const properties =

            await PropertiesService.getAll();

        console.log("===== ALL PROPERTIES =====");
console.table(properties);

console.log("===== FEATURED =====");

const featuredOnly = properties.filter(
    property => property.featured === true
);

console.table(featuredOnly);

        const counts = {};

        properties.forEach(property=>{

            const type = property.type;

            counts[type] = (counts[type] || 0) + 1;

        });

        PROPERTY_CATEGORIES.forEach(category=>{

            const badge = document.getElementById(
                `count-${category.type}`
            );

            if(!badge) return;

            const total = counts[category.type] || 0;

            badge.textContent =
                `${total} ${total === 1 ? "Property" : "Properties"}`;

        });

    }

    catch(error){

        console.error(
            "Failed to load category counts",
            error
        );

    }

}
