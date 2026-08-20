/* ==========================================================
                    BLOG PAGE
========================================================== */

export function renderBlog() {

    return `

        <!-- ==================================================
                            BLOG HERO
        =================================================== -->

        <section class="blog-hero">

            <div class="blog-hero-content">

                <span>
                    YUNISA REAL ESTATE
                </span>

                <h1>
                    Our Blog
                </h1>

                <p>
                    Discover property insights, real estate
                    tips, market trends and helpful advice.
                </p>

            </div>

        </section>


        <!-- ==================================================
                            BLOG SECTION
        =================================================== -->

        <section class="public-blog-section">

            <div class="public-blog-container">

                <div class="blog-section-header">

                    <div>

                        <span class="section-label">
                            REAL ESTATE INSIGHTS
                        </span>

                        <h2>
                            Latest From Our Blog
                        </h2>

                        <p>
                            Stay informed with the latest
                            property news and advice.
                        </p>

                    </div>


                    <div class="blog-search">

                        <i
                            class="fa-solid fa-magnifying-glass">
                        </i>

                        <input
                            type="search"
                            id="blogSearch"
                            placeholder="Search blogs...">

                    </div>

                </div>


                <div
                    id="publicBlogsContainer"
                    class="public-blogs-grid">

                    <div class="blog-loading">

                        <i
                            class="fa-solid fa-spinner fa-spin">
                        </i>

                        <p>
                            Loading blogs...
                        </p>

                    </div>

                </div>

            </div>

        </section>

    `;

}