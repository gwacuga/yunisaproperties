/* ==========================================================
                FEATURED LOCATIONS
========================================================== */

export function renderFeaturedLocations(){

    return `

<section class="featured-locations">

    <div class="section-heading">

        <span>EXPLORE KENYA</span>

        <h2>Featured Locations</h2>

        <p>

            Discover quality homes, land and commercial
            properties in Kenya's most popular locations.

        </p>

    </div>

    <div class="locations-grid">

        <a href="properties.html?county=Nairobi" class="location-card">

            <img
            src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=80"
            alt="Nairobi">

            <div class="location-overlay">

                <h3>Nairobi</h3>

                <p>

                   View Listings

                 <i class="fas fa-arrow-right"></i>

                </p>

            </div>

        </a>

        <a href="properties.html?county=Nyeri" class="location-card">

            <img
            src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=80"
            alt="Kiambu">

            <div class="location-overlay">

                <h3>Kiambu</h3>

                <p>

                  View Listings

                  <i class="fas fa-arrow-right"></i>

                </p>

            </div>

        </a>

        <a href="properties.html?county=Nakuru" class="location-card">

            <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"
            alt="Nakuru">

            <div class="location-overlay">

                <h3>Nakuru</h3>

                <p>

                    View Listings

                 <i class="fas fa-arrow-right"></i>

                </p>

            </div>

        </a>

        <a href="properties.html?county=Mombasa" class="location-card">

            <img
            src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80"
            alt="Mombasa">

            <div class="location-overlay">

                <h3>Mombasa</h3>

                <p>

                   View Listings

                 <i class="fas fa-arrow-right"></i>

                 </p>

            </div>

        </a>

    </div>

</section>

`;

}