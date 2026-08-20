/* ==========================================================
                    BLOG FORM
========================================================== */

import BlogsService
from "./services/blogs.service.js";


/* ==========================================================
                    ELEMENTS
========================================================== */

const form =
    document.getElementById(
        "blogForm"
    );

const imageInput =
    document.getElementById(
        "blogImage"
    );

const imagePreview =
    document.getElementById(
        "imagePreview"
    );

const statusMessage =
    document.getElementById(
        "blogFormStatus"
    );

const saveButton =
    document.getElementById(
        "saveBlogButton"
    );

const formTitle =
    document.getElementById(
        "formTitle"
    );


/* ==========================================================
                    BLOG ID
========================================================== */

const params =
    new URLSearchParams(
        window.location.search
    );

const blogId =
    params.get("id");


/* ==========================================================
                    EDIT MODE
========================================================== */

let editingBlog = null;


async function initializeForm() {

    if (!blogId) {

        return;

    }


    try {

        editingBlog =
            await BlogsService.getById(
                blogId
            );


        if (!editingBlog) {

            alert(
                "Blog not found."
            );

            window.location.href =
                "admin.html";

            return;

        }


        formTitle.textContent =
            "Edit Blog";


        document.title =
            "Edit Blog | Yunisa CMS";


        document.getElementById(
            "blogTitle"
        ).value =
            editingBlog.title || "";


        document.getElementById(
            "blogCategory"
        ).value =
            editingBlog.category || "";


        document.getElementById(
            "blogAuthor"
        ).value =
            editingBlog.author || "";


        document.getElementById(
            "blogImage"
        ).value =
            editingBlog.image || "";


        document.getElementById(
            "blogExcerpt"
        ).value =
            editingBlog.excerpt || "";


        document.getElementById(
            "blogContent"
        ).value =
            editingBlog.content || "";


        const status =
            editingBlog.status || "Draft";


        const statusInput =
            document.querySelector(
                `input[name="blogStatus"][value="${status}"]`
            );


        if (statusInput) {

            statusInput.checked =
                true;

        }


        updateImagePreview(
            editingBlog.image
        );

    }

    catch (error) {

        console.error(
            "Failed to load blog:",
            error
        );

        alert(
            "Failed to load blog."
        );

    }

}


/* ==========================================================
                    IMAGE PREVIEW
========================================================== */

function updateImagePreview(url) {

    if (!imagePreview) {

        return;

    }


    if (!url) {

        imagePreview.innerHTML = `

            <div>

                <i class="fa-regular fa-image"></i>

                <span>
                    Image preview
                </span>

            </div>

        `;

        return;

    }


    imagePreview.innerHTML = `

        <img
            src="${url}"
            alt="Blog image preview"
            onerror="this.parentElement.innerHTML = '<div><i class=&quot;fa-solid fa-triangle-exclamation&quot;></i><span>Unable to load image</span></div>'">

    `;

}


/* ==========================================================
                    IMAGE LISTENER
========================================================== */

if (imageInput) {

    imageInput.addEventListener(

        "input",

        function() {

            updateImagePreview(
                imageInput.value.trim()
            );

        }

    );

}


/* ==========================================================
                    SAVE BLOG
========================================================== */

if (form) {

    form.addEventListener(

        "submit",

        async function(event) {

            event.preventDefault();


            const title =
                document.getElementById(
                    "blogTitle"
                ).value.trim();


            const category =
                document.getElementById(
                    "blogCategory"
                ).value;


            const author =
                document.getElementById(
                    "blogAuthor"
                ).value.trim();


            const image =
                document.getElementById(
                    "blogImage"
                ).value.trim();


            const excerpt =
                document.getElementById(
                    "blogExcerpt"
                ).value.trim();


            const content =
                document.getElementById(
                    "blogContent"
                ).value.trim();


            const statusInput =
                document.querySelector(
                    'input[name="blogStatus"]:checked'
                );


            const status =
                statusInput
                    ? statusInput.value
                    : "Draft";


            if (!title ||
                !category ||
                !author ||
                !excerpt ||
                !content
            ) {

                showStatus(
                    "Please fill in all required fields.",
                    "error"
                );

                return;

            }


            try {

                saveButton.disabled =
                    true;


                saveButton.innerHTML = `

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    Saving...

                `;


                const blogData = {

                    title,

                    category,

                    author,

                    image,

                    excerpt,

                    content,

                    status

                };


                if (editingBlog) {

                    await BlogsService.update(

                        blogId,

                        blogData

                    );

                }

                else {

                    await BlogsService.add(
                        blogData
                    );

                }


                showStatus(
                    "Blog saved successfully!",
                    "success"
                );


                setTimeout(

                    function() {

                        window.location.href =
                            "admin.html";

                    },

                    1000

                );

            }

            catch (error) {

                console.error(
                    "Failed to save blog:",
                    error
                );


                showStatus(
                    "Failed to save blog. Please try again.",
                    "error"
                );


                saveButton.disabled =
                    false;


                saveButton.innerHTML = `

                    <i class="fa-solid fa-cloud-arrow-up"></i>

                    Save Blog

                `;

            }

        }

    );

}


/* ==========================================================
                    STATUS MESSAGE
========================================================== */

function showStatus(
    message,
    type
) {

    if (!statusMessage) {

        return;

    }


    statusMessage.textContent =
        message;


    statusMessage.className =
        `blog-form-status ${type}`;

}


/* ==========================================================
                    START
========================================================== */

initializeForm();