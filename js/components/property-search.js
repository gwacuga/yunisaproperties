/* ==========================================================
                PROPERTY SEARCH
========================================================== */


import PropertiesService from "../services/properties.service.js";


import {

    renderPropertyCard

}

from "./property-card.js";





export function initializePropertySearch(){



const button =


document.querySelector(
    ".property-search button"
);




if(!button){

    return;

}





button.addEventListener(

"click",

async ()=>{





const type =


document.getElementById(
    "searchType"
)
.value;





const location =


document.getElementById(
    "searchLocation"
)
.value

.toLowerCase();






const minPrice =


Number(

document.getElementById(
    "minPrice"
)
.value

)

||0;






const maxPrice =


Number(

document.getElementById(
    "maxPrice"
)
.value

)

||Infinity;






const bedrooms =


Number(

document.getElementById(
    "searchBedrooms"
)

?.value

||0

);






const properties =


await PropertiesService.getAll();







const results =


properties.filter(property=>{





const matchType =


!type

||

property.type === type;







const matchLocation =


!location

||

property.location

?.toLowerCase()

.includes(location);







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

matchType

&&

matchLocation

&&

matchPrice

&&

matchBedrooms

);



});







console.log(

"Search results:",

results

);








const grid =



document.querySelector(
    ".properties-grid"
);





if(!grid){

    return;

}





grid.innerHTML =




results.length



?


results

.map(renderPropertyCard)

.join("")





:


`

<p>

No matching properties found.

</p>

`;





}


);


}