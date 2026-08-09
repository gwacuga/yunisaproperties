/* ==========================================================
                CONTACT APPLICATION
========================================================== */


import {
    renderHeader
}
from "./components/header.js";


import {
    renderFooter
}
from "./components/footer.js";


import {
    renderFloatingContact
}
from "./components/floating-contact.js";


import {
    renderContact
}
from "./pages/contact.js";





async function initializeContact(){


const app =

document.getElementById(
    "app"
);



app.innerHTML =


renderHeader()


+

renderContact()


+

renderFooter()


+

renderFloatingContact();



}



initializeContact();