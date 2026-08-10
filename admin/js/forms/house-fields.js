/* ==========================================================
                    HOUSE FIELDS
========================================================== */

export function renderHouseFields(property = {}) {

    return `

        <div class="form-section">

            <h3>
                House Details
            </h3>


            <div class="form-grid">


                <!-- HOUSE TYPE -->

                <div class="form-group">

                    <label>
                        House Type
                    </label>

                    <select id="houseType">

                        <option value="Bungalow"
                        ${property.houseType === "Bungalow" ? "selected" : ""}>
                            Bungalow
                        </option>

                        <option value="Maisonette"
                        ${property.houseType === "Maisonette" ? "selected" : ""}>
                            Maisonette
                        </option>

                        <option value="Villa"
                        ${property.houseType === "Villa" ? "selected" : ""}>
                            Villa
                        </option>

                        <option value="Townhouse"
                        ${property.houseType === "Townhouse" ? "selected" : ""}>
                            Townhouse
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
                        value="${property.bedrooms || ""}"
                        placeholder="4">

                </div>


                <!-- BATHROOMS -->

                <div class="form-group">

                    <label>
                        Bathrooms
                    </label>

                    <input
                        type="number"
                        id="bathrooms"
                        value="${property.bathrooms || ""}"
                        placeholder="3">

                </div>


                <!-- FLOORS -->

                <div class="form-group">

                    <label>
                        Floors
                    </label>

                    <input
                        type="number"
                        id="floors"
                        value="${property.floors || ""}"
                        placeholder="2">

                </div>


                <!-- PARKING -->

                <div class="form-group">

                    <label>
                        Parking Spaces
                    </label>

                    <input
                        type="number"
                        id="parking"
                        value="${property.parking || ""}"
                        placeholder="2">

                </div>


                <!-- FURNISHING -->

                <div class="form-group">

                    <label>
                        Furnishing
                    </label>

                    <select id="furnishing">

                        <option value="Unfurnished"
                        ${property.furnishing === "Unfurnished" ? "selected" : ""}>
                            Unfurnished
                        </option>

                        <option value="Semi Furnished"
                        ${property.furnishing === "Semi Furnished" ? "selected" : ""}>
                            Semi Furnished
                        </option>

                        <option value="Furnished"
                        ${property.furnishing === "Furnished" ? "selected" : ""}>
                            Furnished
                        </option>

                    </select>

                </div>


                <!-- SIZE -->

                <div class="form-group">

                    <label>
                        House Size
                    </label>

                    <input
                        type="text"
                        id="size"
                        value="${property.size || ""}"
                        placeholder="e.g. 50 x 100 ft or 1/2 acre">

                </div>


                <!-- COMPOUND SIZE -->

                <div class="form-group">

                    <label>
                        Compound Size
                    </label>

                    <input
                        type="text"
                        id="compoundSize"
                        value="${property.compoundSize || ""}"
                        placeholder="e.g. 50 x 100 ft or 1/2 acre">

                </div>


            </div>


        </div>

    `;

}