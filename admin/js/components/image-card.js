/* ==========================================================
                    IMAGE CARD
========================================================== */

export function renderImageCard(image) {

    return `

        <div
            class="image-card"
            data-id="${image.id}">

            <!-- HEADER -->

            <div class="image-header">

                <h4>

                    ${image.caption || `Image ${image.order}`}

                </h4>

            </div>

            <!-- IMAGE -->

            <div class="image-wrapper">

                <img
                    src="${image.url}"
                    alt="Property Image">

                ${
                    image.isCover

                    ? `

                        <span class="cover-badge">

                            ⭐ Cover

                        </span>

                    `

                    : ""

                }

            </div>

            <!-- DETAILS -->

            <div class="image-details">

                <label>

                    Image Caption

                    <small>(Optional)</small>

                </label>

                <input
                    type="text"
                    class="image-caption"
                    data-id="${image.id}"
                    value="${image.caption}"
                    placeholder="Leave blank if not needed"
                    list="propertyImageCaptions">

                <label class="cover-option">

                    <input
                        type="radio"
                        class="cover-image"
                        name="coverImage"
                        data-id="${image.id}"
                        ${image.isCover ? "checked" : ""}>

                    ⭐ Use as Cover Image

                </label>

                <div class="image-actions">

                    <button
                        type="button"
                        class="move-up"
                        title="Move Up"
                        data-id="${image.id}">

                        <i class="fa-solid fa-arrow-up"></i>

                    </button>

                    <button
                        type="button"
                        class="move-down"
                        title="Move Down"
                        data-id="${image.id}">

                        <i class="fa-solid fa-arrow-down"></i>

                    </button>

                    <button
                      type="button"
                      class="replace-image"
                      title="Replace Image"
                      data-id="${image.id}">

                       <i class="fa-solid fa-rotate"></i>

                    </button>

                    <button
                        type="button"
                        class="delete-image danger"
                        title="Delete Image"
                        data-id="${image.id}">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </div>

        </div>

    `;

}