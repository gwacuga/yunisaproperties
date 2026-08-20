/* ==========================================================
                    LATEST BLOGS
========================================================== */

import CONFIG from "../config.js";

import {
    ref,
    get
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

import {
    db
} from "../firebase.js";


/* ==========================================================
                    RENDER SECTION
========================================================== */

export function renderLatestBlogs() {

    return `

        <section
            class="latest-blogs-section"
            id="latestBlogsSection">

            <div class="latest-blogs-container">


                <!-- ==========================================
                            SECTION HEADER
                =========================================== -->

                <div class="latest-blogs-header">

                    <div>

                        <span class="section-label">
                            FROM OUR BLOG
                        </span>

                        <h2>
                            Latest From Our Blog
                        </h2>

                        <p>
                            Stay informed with property tips,
                            market insights and real estate news.
                        </p>

                    </div>


                    <a
                        href="blog.html"
                        class="latest-blogs-view-all">

                        View All Blogs

                        <i
                            class="fa-solid fa-arrow-right">
                        </i>

                    </a>

                </div>


                <!-- ==========================================
                            BLOGS
                =========================================== -->

                <div
                    id="latestBlogsContainer"
                    class="latest-blogs-grid">

                    <div class="latest-blogs-loading">

                        <i
                            class="fa-solid fa-spinner fa-spin">
                        </i>

                        <p>
                            Loading latest blogs...
                        </p>

                    </div>

                </div>

            </div>

        </section>

    `;

}


/* ==========================================================
                    INITIALIZE
========================================================== */

export async function initializeLatestBlogs() {

    const container =
        document.getElementById(
            "latestBlogsContainer"
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


        if (!snapshot.exists()) {

            showEmptyState(
                container
            );

            return;

        }


        const data =
            snapshot.val();


        const blogs =

            Object.entries(data)

                .map(

                    ([id, blog]) => ({

                        id,

                        ...blog

                    })

                )

                /* ONLY PUBLISHED */

                .filter(

                    blog =>

                        String(
                            blog.status || ""
                        ).toLowerCase() ===
                        "published"

                )

                /* NEWEST FIRST */

                .sort(

                    (a, b) =>

                        (b.createdAt || 0) -
                        (a.createdAt || 0)

                )

                /* ONLY THREE */

                .slice(
                    0,
                    3
                );


        if (!blogs.length) {

            showEmptyState(
                container
            );

            return;

        }


        container.innerHTML =

            blogs

                .map(
                    renderLatestBlogCard
                )

                .join("");


    }

    catch(error) {

        console.error(
            "Failed to load latest blogs:",
            error
        );


        showErrorState(
            container
        );

    }

}


/* ==========================================================
                    BLOG CARD
========================================================== */

function renderLatestBlogCard(
    blog
) {

    const image =

        blog.image ||

        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80";


    return `

        <article
            class="latest-blog-card">


            <!-- ==========================================
                            IMAGE
            =========================================== -->

            <div class="latest-blog-image">

                <img
                    src="${image}"
                    alt="${escapeHTML(
                        blog.title ||
                        "Yunisa Real Estate Blog"
                    )}"
                    loading="lazy">

            </div>


            <!-- ==========================================
                            CONTENT
            =========================================== -->

            <div class="latest-blog-content">


                <div class="latest-blog-meta">

                    <span>

                        <i
                            class="fa-regular fa-calendar">
                        </i>

                        ${formatDate(
                            blog.createdAt
                        )}

                    </span>


                    <span>

                        <i
                            class="fa-solid fa-user">
                        </i>

                        ${escapeHTML(
                            blog.author ||
                            CONFIG.COMPANY.NAME
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


                <a
                    href="blog.html"
                    class="latest-blog-read-more">

                    Read More

                    <i
                        class="fa-solid fa-arrow-right">
                    </i>

                </a>

            </div>

        </article>

    `;

}


/* ==========================================================
                    EMPTY STATE
========================================================== */

function showEmptyState(
    container
) {

    container.innerHTML = `

        <div class="latest-blogs-empty">

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
                    ERROR STATE
========================================================== */

function showErrorState(
    container
) {

    container.innerHTML = `

        <div class="latest-blogs-empty">

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