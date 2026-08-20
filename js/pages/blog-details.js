/* ==========================================================
                    BLOG DETAILS PAGE
========================================================== */

export function renderBlogDetails(blog) {

    if (!blog) {

        return `

            <section class="blog-details-error">

                <h2>
                    Blog not found
                </h2>

                <p>
                    The blog post you are looking for
                    could not be found.
                </p>

                <a
                    href="blog.html"
                    class="btn-primary">

                    Back to Blogs

                </a>

            </section>

        `;

    }


    const image =

        blog.image ||

        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80";


    return `

        <article class="blog-details-page">


            <!-- ==================================================
                                HERO
            =================================================== -->

            <section class="blog-details-hero">

                <div class="blog-details-hero-content">

                    <span>
                        YUNISA REAL ESTATE
                    </span>

                    <h1>
                        ${escapeHTML(blog.title)}
                    </h1>


                    <div class="blog-details-meta">

                        <span>

                            <i class="fa-regular fa-calendar"></i>

                            ${formatDate(blog.createdAt)}

                        </span>


                        <span>

                            <i class="fa-solid fa-user"></i>

                            ${escapeHTML(
                                blog.author ||
                                "Yunisa Real Estate"
                            )}

                        </span>

                    </div>

                </div>

            </section>


            <!-- ==================================================
                                CONTENT
            =================================================== -->

            <section class="blog-details-section">

                <div class="blog-details-container">


                    <a
                        href="blog.html"
                        class="blog-back-link">

                        <i class="fa-solid fa-arrow-left"></i>

                        Back to Blogs

                    </a>


                    <div class="blog-details-image">

                        <img
                            src="${image}"
                            alt="${escapeHTML(blog.title)}">

                    </div>


                    <div class="blog-details-content">

                        ${
                            blog.excerpt

                            ?

                            `

                            <div class="blog-details-excerpt">

                                ${escapeHTML(blog.excerpt)}

                            </div>

                            `

                            :

                            ""

                        }


                        <div class="blog-article-content">

                            ${formatContent(blog.content)}

                        </div>

                    </div>

                </div>

            </section>

        </article>

    `;

}


/* ==========================================================
                    FORMAT CONTENT
========================================================== */

function formatContent(content) {

    if (!content) {

        return "<p>No content available.</p>";

    }


    return escapeHTML(content)

        .split(/\n\s*\n/)

        .map(

            paragraph => `

                <p>
                    ${paragraph.replace(/\n/g, "<br>")}
                </p>

            `

        )

        .join("");

}


/* ==========================================================
                    DATE
========================================================== */

function formatDate(timestamp) {

    if (!timestamp) {

        return "";

    }


    return new Date(timestamp)
        .toLocaleDateString(

            "en-KE",

            {

                year: "numeric",

                month: "long",

                day: "numeric"

            }

        );

}


/* ==========================================================
                    ESCAPE HTML
========================================================== */

function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}