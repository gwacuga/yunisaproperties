/* ==========================================================
                    BLOGS PAGE
========================================================== */

import {
    renderBlogForm,
    initializeBlogForm
} from "./blog-form.js";

import Drawer
from "../components/drawer.js";

import BlogsService
from "../../../js/services/blogs.service.js";


/* ==========================================================
                    RENDER BLOGS PAGE
========================================================== */

export function renderBlogsPage() {

    return `

        <section class="admin-page">

            <div class="page-header">

                <div>

                    <h2>
                        Blogs
                    </h2>

                    <p>
                        Manage your website blog posts.
                    </p>

                </div>


                <button
                    type="button"
                    class="btn-primary"
                    id="addBlogButton">

                    <i class="fa-solid fa-plus"></i>

                    Add Blog

                </button>

            </div>


            <div
                id="blogsContainer"
                class="blogs-container">

                <div class="loading-state">

                    <i class="fa-solid fa-spinner fa-spin"></i>

                    <p>
                        Loading blogs...
                    </p>

                </div>

            </div>

        </section>

    `;

}


/* ==========================================================
                    INITIALIZE BLOGS
========================================================== */

export async function initializeBlogsPage() {

    const button =
        document.getElementById(
            "addBlogButton"
        );


    /* ======================================================
                        ADD BLOG
    ====================================================== */

    if (button) {

        button.addEventListener(

            "click",

            function() {

                openBlogForm();

            }

        );

    }


    /* ======================================================
                        LOAD BLOGS
    ====================================================== */

    await loadBlogs();

}


/* ==========================================================
                    LOAD BLOGS
========================================================== */

async function loadBlogs() {

    const container =
        document.getElementById(
            "blogsContainer"
        );


    if (!container) {

        return;

    }


    try {

        const blogs =
            await BlogsService.getAll();


        console.log(
            "Blogs loaded:",
            blogs
        );


        /* ==================================================
                        NO BLOGS
        ================================================== */

        if (!blogs.length) {

            container.innerHTML = `

                <div class="empty-state">

                    <i class="fa-solid fa-newspaper"></i>

                    <h3>
                        No blog posts yet
                    </h3>

                    <p>
                        Create your first blog post.
                    </p>

                </div>

            `;

            return;

        }


        /* ==================================================
                        SORT BLOGS
        ================================================== */

        blogs.sort(

            function(a, b) {

                return (

                    (b.createdAt || 0) -

                    (a.createdAt || 0)

                );

            }

        );


        /* ==================================================
                        RENDER BLOGS
        ================================================== */

        container.innerHTML =

            blogs

                .map(
                    renderBlogCard
                )

                .join("");


        initializeBlogActions();

    }

    catch (error) {

        console.error(
            "Failed to load blogs:",
            error
        );


        container.innerHTML = `

            <div class="error-state">

                <i class="fa-solid fa-triangle-exclamation"></i>

                <h3>
                    Failed to load blogs
                </h3>

                <p>
                    Please try again.
                </p>

            </div>

        `;

    }

}


/* ==========================================================
                    BLOG CARD
========================================================== */

function renderBlogCard(blog) {

    const image =

        blog.image ||

        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80";


    const title =

        escapeHTML(
            blog.title ||
            "Untitled Blog"
        );


    const excerpt =

        escapeHTML(
            blog.excerpt ||
            "No description available."
        );


    const author =

        escapeHTML(
            blog.author ||
            "Yunisa Real Estate"
        );


    const status =

        blog.status ||
        "Draft";


    const statusClass =

        status

            .toLowerCase()

            .replace(
                /\s+/g,
                "-"
            );


    return `

        <article
            class="blog-card"
            data-blog-id="${blog.id}">


            <!-- =========================================
                            IMAGE
            ========================================== -->

            <div class="blog-card-image">

                <img
                    src="${image}"
                    alt="${title}"
                    loading="lazy">


                <span
                    class="blog-status ${statusClass}">

                    ${escapeHTML(status)}

                </span>

            </div>


            <!-- =========================================
                            CONTENT
            ========================================== -->

            <div class="blog-card-content">


                <h3>

                    ${title}

                </h3>


                <p class="blog-excerpt">

                    ${excerpt}

                </p>


                <div class="blog-meta">

                    <span>

                        <i class="fa-solid fa-user"></i>

                        ${author}

                    </span>


                    <span>

                        <i class="fa-regular fa-calendar"></i>

                        ${formatDate(
                            blog.createdAt
                        )}

                    </span>

                </div>


                <!-- =====================================
                            ACTIONS
                ====================================== -->

                <div class="blog-card-actions">

                    <button
                        type="button"
                        class="btn-secondary edit-blog"
                        data-id="${blog.id}">

                        <i class="fa-solid fa-pen"></i>

                        Edit

                    </button>


                    <button
                        type="button"
                        class="btn-danger delete-blog"
                        data-id="${blog.id}">

                        <i class="fa-solid fa-trash"></i>

                        Delete

                    </button>

                </div>


            </div>

        </article>

    `;

}


/* ==========================================================
                    BLOG ACTIONS
========================================================== */

function initializeBlogActions() {


    /* ======================================================
                        DELETE
    ====================================================== */

    const deleteButtons =

        document.querySelectorAll(
            ".delete-blog"
        );


    deleteButtons.forEach(

        function(button) {

            button.addEventListener(

                "click",

                async function() {

                    const id =
                        button.dataset.id;


                    if (!id) {

                        return;

                    }


                    const confirmed =
                        confirm(
                            "Are you sure you want to delete this blog?"
                        );


                    if (!confirmed) {

                        return;

                    }


                    try {

                        button.disabled =
                            true;


                        button.innerHTML = `

                            <i class="fa-solid fa-spinner fa-spin"></i>

                            Deleting...

                        `;


                        await BlogsService.delete(
                            id
                        );


                        await loadBlogs();

                    }

                    catch (error) {

                        console.error(
                            "Failed to delete blog:",
                            error
                        );


                        alert(
                            "Failed to delete blog."
                        );


                        button.disabled =
                            false;

                    }

                }

            );

        }

    );


    /* ======================================================
                        EDIT
    ====================================================== */

    const editButtons =

        document.querySelectorAll(
            ".edit-blog"
        );


    editButtons.forEach(

        function(button) {

            button.addEventListener(

                "click",

                async function() {

                    const id =
                        button.dataset.id;


                    if (!id) {

                        return;

                    }


                    try {

                        const blog =
                            await BlogsService.get(
                                id
                            );


                        if (!blog) {

                            alert(
                                "Blog not found."
                            );

                            return;

                        }


                        openBlogForm(
                            blog
                        );

                    }

                    catch (error) {

                        console.error(
                            "Failed to load blog:",
                            error
                        );

                    }

                }

            );

        }

    );

}


/* ==========================================================
                    OPEN BLOG FORM
========================================================== */

function openBlogForm(
    blog = null
) {

    Drawer.open(

        blog
            ? "Edit Blog"
            : "Add Blog",

        renderBlogForm(
            blog
        ),

        function() {

            initializeBlogForm(
                blog
            );

        }

    );

}


/* ==========================================================
                    FORMAT DATE
========================================================== */

function formatDate(timestamp) {

    if (!timestamp) {

        return "Unknown date";

    }


    return new Date(
        timestamp
    ).toLocaleDateString(
        "en-KE",
        {

            year: "numeric",

            month: "short",

            day: "numeric"

        }
    );

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