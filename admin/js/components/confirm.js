/* ==========================================================
                    CONFIRM DIALOG
========================================================== */

const Confirm = {

    show({

        title = "Confirm",

        message = "Are you sure?",

        confirmText = "Confirm",

        cancelText = "Cancel"

    }) {

        return new Promise(resolve => {

            const overlay = document.createElement("div");

            overlay.className = "confirm-overlay";

            overlay.innerHTML = `

                <div class="confirm-dialog">

                    <h3>

                        ${title}

                    </h3>

                    <p>

                        ${message}

                    </p>

                    <div class="confirm-actions">

                        <button
                            class="btn-secondary confirm-cancel">

                            ${cancelText}

                        </button>

                        <button
                            class="btn-danger confirm-ok">

                            ${confirmText}

                        </button>

                    </div>

                </div>

            `;

            document.body.appendChild(
                overlay
            );

            overlay

                .querySelector(".confirm-cancel")

                .addEventListener(

                    "click",

                    () => {

                        overlay.remove();

                        resolve(false);

                    }

                );

            overlay

                .querySelector(".confirm-ok")

                .addEventListener(

                    "click",

                    () => {

                        overlay.remove();

                        resolve(true);

                    }

                );

        });

    }

};

export default Confirm;