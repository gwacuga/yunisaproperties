/* ==========================================================
                    AIRBNB FIELDS
========================================================== */

export function renderAirbnbFields(property = {}) {

    return `

        <div class="form-section">

            <h3>
                Airbnb Details
            </h3>


            <div class="form-grid">


                <!-- AIRBNB TYPE -->

                <div class="form-group">

                    <label>
                        Airbnb Type
                    </label>

                    <select id="airbnbType">

                        <option
                            value="Apartment"
                            ${property.airbnbType === "Apartment" ? "selected" : ""}>
                            Apartment
                        </option>

                        <option
                            value="Villa"
                            ${property.airbnbType === "Villa" ? "selected" : ""}>
                            Villa
                        </option>

                        <option
                            value="Cottage"
                            ${property.airbnbType === "Cottage" ? "selected" : ""}>
                            Cottage
                        </option>

                        <option
                            value="Guest House"
                            ${property.airbnbType === "Guest House" ? "selected" : ""}>
                            Guest House
                        </option>

                        <option
                            value="Private Room"
                            ${property.airbnbType === "Private Room" ? "selected" : ""}>
                            Private Room
                        </option>

                    </select>

                </div>


                <!-- BEDROOMS -->

                <div class="form-group">

                    <label>
                        Bedrooms
                    </label>

                    <input
                        type="number"
                        id="bedrooms"
                        placeholder="2"
                        value="${property.bedrooms || ""}">

                </div>


                <!-- BATHROOMS -->

                <div class="form-group">

                    <label>
                        Bathrooms
                    </label>

                    <input
                        type="number"
                        id="bathrooms"
                        placeholder="2"
                        value="${property.bathrooms || ""}">

                </div>


                <!-- GUEST CAPACITY -->

                <div class="form-group">

                    <label>
                        Guest Capacity
                    </label>

                    <input
                        type="number"
                        id="guestCapacity"
                        placeholder="6"
                        value="${property.guestCapacity || ""}">

                </div>


                <!-- NIGHTLY PRICE -->

                <div class="form-group">

                    <label>
                        Price Per Night
                    </label>

                    <input
                        type="number"
                        id="nightlyPrice"
                        placeholder="5000"
                        value="${property.nightlyPrice || ""}">

                </div>


                <!-- MINIMUM STAY -->

                <div class="form-group">

                    <label>
                        Minimum Stay
                    </label>

                    <input
                        type="number"
                        id="minimumStay"
                        placeholder="2"
                        value="${property.minimumStay || ""}">

                </div>


                <!-- FURNISHING -->

                <div class="form-group">

                    <label>
                        Furnishing
                    </label>

                    <select id="furnishing">

                        <option
                            value="Furnished"
                            ${property.furnishing === "Furnished" ? "selected" : ""}>
                            Furnished
                        </option>

                        <option
                            value="Semi Furnished"
                            ${property.furnishing === "Semi Furnished" ? "selected" : ""}>
                            Semi Furnished
                        </option>

                        <option
                            value="Unfurnished"
                            ${property.furnishing === "Unfurnished" ? "selected" : ""}>
                            Unfurnished
                        </option>

                    </select>

                </div>


                <!-- AVAILABILITY -->

                <div class="form-group">

                    <label>
                        Availability
                    </label>

                    <select id="availability">

                        <option
                            value="Available"
                            ${property.availability === "Available" ? "selected" : ""}>
                            Available
                        </option>

                        <option
                            value="Not Available"
                            ${property.availability === "Not Available" ? "selected" : ""}>
                            Not Available
                        </option>

                    </select>

                </div>


                <!-- AMENITIES -->

                <div class="form-group">

                    <label>
                        Amenities
                    </label>

                    <input
                        type="text"
                        id="amenities"
                        placeholder="WiFi, Pool, Parking"
                        value="${property.amenities || ""}">

                </div>


            </div>


        </div>

    `;

}