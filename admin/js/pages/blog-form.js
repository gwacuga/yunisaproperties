/* ==========================================================
                    BLOG FORM
========================================================== */

import StorageService
from "../../../js/services/storage.service.js";

import BlogsService
from "../../../js/services/blogs.service.js";


/* ==========================================================
                    RENDER BLOG FORM
========================================================== */

export function renderBlogForm(blog = null) {

    const isEditing =
        Boolean(blog);


    return `

        <section class="blog-form-page">

            <form
                id="blogForm"
                class="blog-form">


                <!-- =========================================
                            TITLE
                ========================================== -->

                <div class="form-group">

                    <label for="blogTitle">
                        Blog Title
                    </label>

                    <input
                        type="text"
                        id="blogTitle"
                        name="title"
                        placeholder="Enter blog title"
                        value="${escapeHTML(
                            blog?.title || ""
                        )}"
                        required>

                </div>


                <!-- =========================================
                            IMAGE
                ========================================== -->

                <div class="form-group">

                    <label>
                        Featured Image
                    </label>


                    <div
                        class="blog-image-upload"
                        id="blogImageUpload">


                        ${
                            blog?.image

                            ?

                            `

                            <div
                                class="blog-current-image">

                                <img
                                    src="${blog.image}"
                                    alt="Current blog image"
                                    id="blogImagePreview">

                            </div>

                            `

                            :

                            `

                            <div
                                class="blog-image-placeholder"
                                id="blogImagePlaceholder">

                                <i class="fa-solid fa-image"></i>

                                <p>
                                    No image selected
                                </p>

                            </div>

                            `

                        }


                        <button
                            type="button"
                            class="btn-secondary"
                            id="blogImageButton">

                            <i class="fa-solid fa-cloud-arrow-up"></i>

                            ${
                                blog?.image
                                ? "Change Image"
                                : "Upload Image"
                            }

                        </button>


                        <input
                            type="file"
                            id="blogImageInput"
                            accept="image/*"
                            hidden>


                        <input
                            type="hidden"
                            id="blogImage"
                            name="image"
                            value="${escapeHTML(
                                blog?.image || ""
                            )}">


                        <input
                            type="hidden"
                            id="blogImagePublicId"
                            name="imagePublicId"
                            value="${escapeHTML(
                                blog?.imagePublicId || ""
                            )}">

                    </div>

                </div>


                <!-- =========================================
                            EXCERPT
                ========================================== -->

                <div class="form-group">

                    <label for="blogExcerpt">
                        Short Description
                    </label>

                    <textarea
                        id="blogExcerpt"
                        name="excerpt"
                        rows="4"
                        placeholder="Write a short description...">${escapeHTML(
                            blog?.excerpt || ""
                        )}</textarea>

                </div>


                <!-- =========================================
                            CONTENT
                ========================================== -->

                <div class="form-group">

                    <label for="blogContent">
                        Blog Content
                    </label>

                    <textarea
                        id="blogContent"
                        name="content"
                        rows="14"
                        placeholder="Write your blog content here..."
                        required>${escapeHTML(
                            blog?.content || ""
                        )}</textarea>

                </div>


                <!-- =========================================
                            AUTHOR
                ========================================== -->

                <div class="form-group">

                    <label for="blogAuthor">
                        Author
                    </label>

                    <input
                        type="text"
                        id="blogAuthor"
                        name="author"
                        placeholder="Author name"
                        value="${escapeHTML(
                            blog?.author || ""
                        )}">

                </div>


                <!-- =========================================
                            STATUS
                ========================================== -->

                <div class="form-group">

                    <label for="blogStatus">
                        Status
                    </label>

                    <select
                        id="blogStatus"
                        name="status">

                        <option
                            value="Draft"
                            ${
                                blog?.status === "Draft"
                                ? "selected"
                                : ""
                            }>

                            Draft

                        </option>


                        <option
                            value="Published"
                            ${
                                blog?.status === "Published"
                                ? "selected"
                                : ""
                            }>

                            Published

                        </option>

                    </select>

                </div>


                <!-- =========================================
                            ACTIONS
                ========================================== -->

                <div class="blog-form-actions">

                    <button
                        type="button"
                        class="btn-secondary"
                        id="cancelBlog">

                        Cancel

                    </button>


                    <button
                        type="submit"
                        class="btn-primary"
                        id="saveBlogButton">

                        <i class="fa-solid fa-floppy-disk"></i>

                        ${
                            isEditing
                            ? "Update Blog"
                            : "Save Blog"
                        }

                    </button>

                </div>


                <p
                    id="blogFormStatus"
                    class="blog-form-status">
                </p>

            </form>

        </section>

    `;

}


/* ==========================================================
                    INITIALIZE BLOG FORM
========================================================== */

export function initializeBlogForm(
    blog = null
) {

    const form =
        document.getElementById(
            "blogForm"
        );


    if (!form) {

        return;

    }


    const cancelButton =
        document.getElementById(
            "cancelBlog"
        );


    const imageButton =
        document.getElementById(
            "blogImageButton"
        );


    const imageInput =
        document.getElementById(
            "blogImageInput"
        );


    const imageField =
        document.getElementById(
            "blogImage"
        );


    const publicIdField =
        document.getElementById(
            "blogImagePublicId"
        );


    const imageUpload =
        document.getElementById(
            "blogImageUpload"
        );


    const status =
        document.getElementById(
            "blogFormStatus"
        );


    const saveButton =
        document.getElementById(
            "saveBlogButton"
        );


    /* ======================================================
                    CANCEL
    ====================================================== */

    cancelButton?.addEventListener(

        "click",

        function() {

            closeBlogDrawer();

        }

    );


    /* ======================================================
                    IMAGE BUTTON
    ====================================================== */

    imageButton?.addEventListener(

        "click",

        function() {

            imageInput?.click();

        }

    );


    /* ======================================================
                    IMAGE UPLOAD
    ====================================================== */

    imageInput?.addEventListener(

        "change",

        async function() {

            const file =
                imageInput.files?.[0];


            if (!file) {

                return;

            }


            try {

                imageButton.disabled =
                    true;


                imageButton.innerHTML = `

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    Uploading...

                `;


                const uploaded =
                    await StorageService.upload(
                        file
                    );


                console.log(
                    "Blog image uploaded:",
                    uploaded
                );


                imageField.value =
                    uploaded.url;


                if (
                    publicIdField &&
                    uploaded.publicId
                ) {

                    publicIdField.value =
                        uploaded.publicId;

                }


                imageUpload.innerHTML = `

                    <div class="blog-current-image">

                        <img
                            src="${uploaded.url}"
                            alt="Blog image preview">

                    </div>


                    <button
                        type="button"
                        class="btn-secondary"
                        id="blogImageButton">

                        <i class="fa-solid fa-cloud-arrow-up"></i>

                        Change Image

                    </button>

                `;


                /*
                    Re-bind the button because
                    innerHTML replaced it.
                */

                const newButton =
                    document.getElementById(
                        "blogImageButton"
                    );


                newButton?.addEventListener(

                    "click",

                    function() {

                        imageInput.click();

                    }

                );

            }

            catch (error) {

                console.error(
                    "Blog image upload failed:",
                    error
                );


                if (status) {

                    status.textContent =
                        "Image upload failed.";

                }

            }

            finally {

                imageButton.disabled =
                    false;

            }

        }

    );


    /* ======================================================
                    FORM SUBMIT
    ====================================================== */

    form.addEventListener(

        "submit",

        async function(event) {

            event.preventDefault();


            try {

                saveButton.disabled =
                    true;


                status.textContent =
                    blog
                    ? "Updating blog..."
                    : "Saving blog...";


                const blogData = {

                    title:
                        document
                            .getElementById(
                                "blogTitle"
                            )
                            .value
                            .trim(),


                    image:
                        imageField.value
                            .trim(),


                    imagePublicId:
                        publicIdField.value
                            .trim(),


                    excerpt:
                        document
                            .getElementById(
                                "blogExcerpt"
                            )
                            .value
                            .trim(),


                    content:
                        document
                            .getElementById(
                                "blogContent"
                            )
                            .value
                            .trim(),


                    author:
                        document
                            .getElementById(
                                "blogAuthor"
                            )
                            .value
                            .trim(),


                    status:
                        document
                            .getElementById(
                                "blogStatus"
                            )
                            .value

                };


                /* =========================================
                        UPDATE EXISTING BLOG
                ========================================== */

                if (blog) {

                    await BlogsService.update(

                        blog.id,

                        blogData

                    );


                    status.textContent =
                        "Blog updated successfully.";

                }


                /* =========================================
                        CREATE NEW BLOG
                ========================================== */

                else {

                    await BlogsService.add({

                        ...blogData,

                        createdAt:
                            Date.now()

                    });


                    status.textContent =
                        "Blog saved successfully.";

                }


                setTimeout(

                    function() {

                        closeBlogDrawer();

                    },

                    800

                );

            }

            catch (error) {

                console.error(
                    "Failed to save blog:",
                    error
                );


                status.textContent =
                    "Failed to save blog.";


                saveButton.disabled =
                    false;

            }

        }

    );

}


/* ==========================================================
                    CLOSE DRAWER
========================================================== */

function closeBlogDrawer() {

    /*
        Try common drawer close methods.
        Your existing Drawer component controls
        the actual drawer.
    */

    const closeButton =
        document.querySelector(
            ".drawer-close"
        );


    if (closeButton) {

        closeButton.click();

        return;

    }


    const drawer =
        document.querySelector(
            ".drawer"
        );


    if (drawer) {

        drawer.classList.remove(
            "show"
        );

    }

}


/* ==========================================================
                    ESCAPE HTML
========================================================== */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}