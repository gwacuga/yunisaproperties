/* ==========================================================
                PROPERTIES PAGE
========================================================== */


import CONFIG from "../config.js";


import PropertiesService from "../services/properties.service.js";


import {

    renderPropertyCard

}

from "../components/property-card.js";



let allProperties = [];



/* ==========================================================
                FILTER PROPERTIES
========================================================== */


export function filterProperties(){

    const keyword =

        document.getElementById(
            "propertyKeyword"
        )
        .value
        .toLowerCase();



    const type =

        document.getElementById(
            "propertyType"
        )
        .value;



    const minPrice =

        Number(
            document.getElementById(
                "minPrice"
            )
            .value
            || 0
        );



    const maxPrice =

        Number(
            document.getElementById(
                "maxPrice"
            )
            .value
            || 999999999
        );



    const bedrooms =

        Number(
            document.getElementById(
                "bedrooms"
            )
            .value
            || 0
        );



    const filtered =

        allProperties.filter(property=>{


            const matchKeyword =

                !keyword ||

                (
                    property.title
                    ?.toLowerCase()
                    .includes(keyword)

                    ||

                    property.location
                    ?.toLowerCase()
                    .includes(keyword)

                    ||

                    property.county
                    ?.toLowerCase()
                    .includes(keyword)

                    ||

                    property.description
                    ?.toLowerCase()
                    .includes(keyword)
                );



            const matchType =

                !type ||

                property.type === type;



            const matchPrice =

                Number(property.price || 0)

                >=

                minPrice

                &&

                Number(property.price || 0)

                <=

                maxPrice;



            const matchBedrooms =

                Number(property.bedrooms || 0)

                >=

                bedrooms;



            return (

                matchKeyword

                &&

                matchType

                &&

                matchPrice

                &&

                matchBedrooms

            );


        });



    const result =

        document.getElementById(
            "propertiesResult"
        );


    const heading =

    document.getElementById(
        "propertiesHeading"
    );

const count =

    document.getElementById(
        "propertiesCount"
    );

if(type){

    heading.textContent = `${type} Properties`;

}

else{

    heading.textContent = "All Properties";

}

count.textContent =

`${filtered.length} ${filtered.length === 1 ? "Property" : "Properties"} Found`;


    result.innerHTML =

        filtered.length

        ?

        filtered
        .map(renderPropertyCard)
        .join("")

        :

        `

        <p>

        No matching properties found.

        </p>

        `;

}




/* ==========================================================
                RENDER PAGE
========================================================== */


export async function renderProperties(){



return `



<main class="properties-page">





<section class="page-banner">


<h1>

${CONFIG.COMPANY.NAME}

</h1>


<p>

${CONFIG.COMPANY.TAGLINE}

</p>


</section>







<section class="property-filter">





<input

id="propertyKeyword"

placeholder="Search property..."

>







<select id="propertyType">


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

id="minPrice"

type="number"

placeholder="Min Price"

>






<input

id="maxPrice"

type="number"

placeholder="Max Price"

>







<select id="bedrooms">


<option value="0">

Bedrooms

</option>


<option value="1">

1+

</option>


<option value="2">

2+

</option>


<option value="3">

3+

</option>


<option value="4">

4+

</option>


</select>








<button

id="searchProperties">

Search

</button>





</section>







<section class="all-properties">

<div class="section-heading">

    <h2 id="propertiesHeading">

        All Properties

    </h2>

    <p id="propertiesCount">

        Loading...

    </p>

</div>


<div

id="propertiesResult"

class="properties-grid">


<p>

Loading properties...

</p>


</div>



</section>





</main>



`;



}







/* ==========================================================
                LOAD DATABASE DATA
========================================================== */

export async function loadProperties(){

    const result =

        document.getElementById(
            "propertiesResult"
        );



    try{

        allProperties =

            await PropertiesService.getAll();



        if(!allProperties.length){

            result.innerHTML =

            `

            <p>

            No properties available.

            </p>

            `;

            return;

        }



       const params =

       new URLSearchParams(
        window.location.search
        );

const type =

    params.get("type");

if(type){

    document.getElementById(
        "propertyType"
    ).value = type;

}

filterProperties();

    }

    catch(error){

        console.error(

            "Loading properties failed:",

            error

        );



        result.innerHTML =

        `

        <p>

        Failed to load properties.

        </p>

        `;

    }

}




/* ==========================================================
                INITIALIZE SEARCH
========================================================== */


export function initializePropertyFilters(){



const button =

document.getElementById(
    "searchProperties"
);




if(!button){

    return;

}





button.addEventListener(

    "click",

    filterProperties

);



}