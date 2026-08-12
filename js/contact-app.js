```javascript
/* ==========================================================
                    CONTACT APPLICATION
========================================================== */

import {
    renderHeader,
    initializeHeader
} from "./components/header.js";

import {
    renderFooter
} from "./components/footer.js";

import {
    renderFloatingContact
} from "./components/floating-contact.js";

import {
    renderContact
} from "./pages/contact.js";


/* ==========================================================
                    INITIALIZE CONTACT
========================================================== */

function initializeContact() {

    const app = document.getElementById("app");

    if (!app) {
        return;
    }

    app.innerHTML =
        renderHeader() +
        renderContact() +
        renderFooter() +
        renderFloatingContact();


    /* Initialize the header AFTER rendering it */
    initializeHeader();

}


/* ==========================================================
                    START APPLICATION
========================================================== */

initializeContact();
```
