/* ==========================================================
                    BLOG APPLICATION
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
    renderBlog
} from "./pages/blog.js";

import CONFIG from "./config.js";

import {
    ref,
    get
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

import {
    db
} from "./firebase.js";

import {
    renderBlogDetails
} from "./pages/blog-details.js";


/* ==========================================================
                    INITIALIZE BLOG
========================================================== */

async function initializeBlog() {

    const app =
        document.getElementById(
            "app"
        );


    if (!app) {

        return;

    }


    /* ======================================================
                    CHECK FOR BLOG ID
    ====================================================== */

    const params =
        new URLSearchParams(
            window.location.search
        );


    const blogId =
        params.get("id");


    /* ======================================================
                DIRECT BLOG ARTICLE
    ====================================================== */

    if (blogId) {

        await openBlogDetails(
            blogId
        );

        return;

    }


    /* ======================================================
                        PAGE TITLE
    ====================================================== */

    document.title =
        `${CONFIG.COMPANY.NAME} | Blog`;


    /* ======================================================
                        RENDER BLOG PAGE
    ====================================================== */

    app.innerHTML =

        renderHeader()

        +

        renderBlog()

        +

        renderFooter()

        +

        renderFloatingContact();


    initializeHeader();


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
            "publicBlogsContainer"
        );


    if (!container) {

        return;

    }


    try {

        const blogsReference =
            ref(
                db,
                "blogs"
            );


        const snapshot =
            await get(
                blogsReference
            );


        console.log(
            "Blogs snapshot exists:",
            snapshot.exists()
        );


        if (!snapshot.exists()) {

            showNoBlogs(
                container
            );

            return;

        }


        const data =
            snapshot.val();


        console.log(
            "Firebase blogs:",
            data
        );


        const blogs =

            Object.entries(data)

                .map(

                    ([id, blog]) => ({

                        id,

                        ...blog

                    })

                )

                .filter(

                    blog =>

                        String(
                            blog.status || ""
                        ).toLowerCase() ===
                        "published"

                )

                .sort(

                    (a, b) =>

                        (b.createdAt || 0) -
                        (a.createdAt || 0)

                );


        console.log(
            "Published blogs:",
            blogs
        );


        if (!blogs.length) {

            showNoPublishedBlogs(
                container
            );

            return;

        }


        container.innerHTML =

            blogs
                .map(
                    renderBlogCard
                )
                .join("");

                initializeBlogLinks();


    }

    catch (error) {

        console.error(
            "Failed to load blogs:",
            error
        );


        container.innerHTML = `

            <div class="blog-error">

                <i
                    class="fa-solid fa-triangle-exclamation">
                </i>

                <h3>
                    Unable to load blogs
                </h3>

                <p>
                    Please try again later.
                </p>

            </div>

        `;

    }

}

/* ==========================================================
                    BLOG LINKS
========================================================== */

function initializeBlogLinks() {

    const buttons =
        document.querySelectorAll(
            ".blog-read-more"
        );


    buttons.forEach(

        button => {

            button.addEventListener(

                "click",

                function() {

                    const blogId =
                        button.dataset.blogId;


                    openBlogDetails(
                        blogId
                    );

                }

            );

        }

    );

}

/* ==========================================================
                    OPEN BLOG DETAILS
========================================================== */

async function openBlogDetails(blogId) {

    try {

        const blogReference =
            ref(
                db,
                `blogs/${blogId}`
            );


        const snapshot =
            await get(
                blogReference
            );


        if (!snapshot.exists()) {

            alert(
                "Blog post could not be found."
            );

            return;

        }


        const blog = {

            id: blogId,

            ...snapshot.val()

        };


        if (
            String(
                blog.status || ""
            ).toLowerCase() !== "published"
        ) {

            alert(
                "This blog post is not available."
            );

            return;

        }


        const app =
            document.getElementById(
                "app"
            );


        if (!app) {

            return;

        }


        app.innerHTML =

            renderHeader()

            +

            renderBlogDetails(
                blog
            )

            +

            renderFooter()

            +

            renderFloatingContact();


        initializeHeader();


        /* ==================================================
                    LAND ON ARTICLE SECTION
        ================================================== */

        const article =
            document.querySelector(
                ".blog-details-section"
            );


        if (article) {

            article.scrollIntoView({

                behavior: "instant",

                block: "start"

            });

        }


        document.title =

            `${blog.title} | ${CONFIG.COMPANY.NAME}`;


    }

    catch(error) {

        console.error(
            "Failed to load blog:",
            error
        );

    }

}


/* ==========================================================
                    BLOG CARD
========================================================== */

function renderBlogCard(
    blog
) {

    const image =

        blog.image ||

        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80";


    return `

        <article class="public-blog-card">


            <div class="public-blog-image">

                <img
                    src="${image}"
                    alt="${escapeHTML(
                        blog.title || "Blog"
                    )}"
                    loading="lazy">

            </div>


            <div class="public-blog-content">


                <div class="public-blog-meta">

                    <span>

                        <i class="fa-regular fa-calendar"></i>

                        ${formatDate(
                            blog.createdAt
                        )}

                    </span>


                    <span>

                        <i class="fa-solid fa-user"></i>

                        ${escapeHTML(
                            blog.author ||
                            "Yunisa Real Estate"
                        )}

                    </span>

                </div>


                <h3>

                    ${escapeHTML(
                        blog.title ||
                        "Untitled Blog"
                    )}

                </h3>


                <p>

                    ${escapeHTML(
                        blog.excerpt ||
                        ""
                    )}

                </p>


                <button
                    type="button"
                    class="blog-read-more"
                    data-blog-id="${blog.id}">

                    Read More

                    <i
                        class="fa-solid fa-arrow-right">
                    </i>

                </button>


            </div>

        </article>

    `;

}


/* ==========================================================
                    NO BLOGS
========================================================== */

function showNoBlogs(
    container
) {

    container.innerHTML = `

        <div class="blog-empty">

            <i
                class="fa-solid fa-newspaper">
            </i>

            <h3>
                No blog posts yet
            </h3>

            <p>
                Check back soon for our latest
                real estate insights.
            </p>

        </div>

    `;

}


/* ==========================================================
                NO PUBLISHED BLOGS
========================================================== */

function showNoPublishedBlogs(
    container
) {

    container.innerHTML = `

        <div class="blog-empty">

            <i
                class="fa-solid fa-newspaper">
            </i>

            <h3>
                No published blogs yet
            </h3>

            <p>
                Our latest articles will appear here soon.
            </p>

        </div>

    `;

}


/* ==========================================================
                    DATE
========================================================== */

function formatDate(
    timestamp
) {

    if (!timestamp) {

        return "";

    }


    return new Date(
        timestamp
    ).toLocaleDateString(

        "en-KE",

        {

            year:
                "numeric",

            month:
                "short",

            day:
                "numeric"

        }

    );

}


/* ==========================================================
                    ESCAPE HTML
========================================================== */

function escapeHTML(
    value
) {

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


/* ==========================================================
                        START
========================================================== */

initializeBlog();