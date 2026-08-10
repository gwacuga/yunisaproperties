/* ==========================================================
                    DRAWER COMPONENT
========================================================== */

const Drawer = {

    /* ======================================================
                        OPEN
    ====================================================== */

    open(title, content, callback = null) {

        let drawer = document.getElementById(
            "drawer"
        );

        if (!drawer) {

            console.log(content);

            document.body.insertAdjacentHTML(
                "beforeend",

                `
                <div
                    class="drawer-overlay"
                    id="drawerOverlay">

                    <div
                        class="drawer"
                        id="drawer">

                        <div
                            class="drawer-header">

                            <h2 id="drawerTitle">
                                ${title}
                            </h2>

                            <button
                                id="closeDrawer">

                                <i class="fa-solid fa-xmark"></i>

                            </button>

                        </div>

                        <div
                            class="drawer-body"
                            id="drawerBody">

                            ${content}

                        </div>

                    </div>

                </div>
                `
            );

            this.initialize();
            if (callback) {

               callback();

               }
            

        } else {
            console.log(content);

            document.getElementById(
                "drawerTitle"
            ).textContent = title;

            document.getElementById(
                "drawerBody"
            ).innerHTML = content;
            if (callback) {

              callback();

               }

            document.getElementById(
                "drawerOverlay"
            ).classList.add(
                "show"
            );

        }

    },

    /* ======================================================
                        CLOSE
    ====================================================== */

    close() {

        document.getElementById(
            "drawerOverlay"
        )?.classList.remove(
            "show"
        );

    },

    /* ======================================================
                    INITIALIZE
    ====================================================== */

    initialize() {

        const overlay =
            document.getElementById(
                "drawerOverlay"
            );

        overlay.classList.add(
            "show"
        );

        document
        .getElementById(
            "closeDrawer"
        )
        .addEventListener(
            "click",
            () => {

                this.close();

            }
        );

        overlay.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === overlay
                ) {

                    this.close();

                }

            }
        );

    }

};

export default Drawer;