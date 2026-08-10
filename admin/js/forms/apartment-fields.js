/* ==========================================================
                    APARTMENT FIELDS
========================================================== */

/* ==========================================================
                    APARTMENT FIELDS
========================================================== */

export function renderApartmentFields(property = {}) {

    return `

        <div class="form-section">

            <h3>
                Apartment Details
            </h3>

            <div class="form-grid">

                <!-- APARTMENT TYPE -->

                <div class="form-group">

                    <label>
                        Apartment Type
                    </label>

                    <select id="apartmentType">

                        <option
                            value="Bedsitter"
                            ${property.apartmentType === "Bedsitter" ? "selected" : ""}>
                            Bedsitter
                        </option>

                        <option
                            value="Studio"
                            ${property.apartmentType === "Studio" ? "selected" : ""}>
                            Studio
                        </option>

                        <option
                            value="1 Bedroom"
                            ${property.apartmentType === "1 Bedroom" ? "selected" : ""}>
                            1 Bedroom
                        </option>

                        <option
                            value="2 Bedroom"
                            ${property.apartmentType === "2 Bedroom" ? "selected" : ""}>
                            2 Bedroom
                        </option>

                        <option
                            value="3 Bedroom"
                            ${property.apartmentType === "3 Bedroom" ? "selected" : ""}>
                            3 Bedroom
                        </option>

                        <option
                            value="Penthouse"
                            ${property.apartmentType === "Penthouse" ? "selected" : ""}>
                            Penthouse
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
                        placeholder="2">

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
                        placeholder="2">

                </div>


                <!-- FLOOR NUMBER -->

                <div class="form-group">

                    <label>
                        Floor Number
                    </label>

                    <input
                        type="number"
                        id="floorNumber"
                        value="${property.floorNumber || ""}"
                        placeholder="5">

                </div>


                <!-- TOTAL FLOORS -->

                <div class="form-group">

                    <label>
                        Total Floors
                    </label>

                    <input
                        type="number"
                        id="totalFloors"
                        value="${property.totalFloors || ""}"
                        placeholder="10">

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
                        placeholder="1">

                </div>


                <!-- LIFT -->

                <div class="form-group">

                    <label>
                        Lift Available
                    </label>

                    <select id="liftAvailable">

                        <option
                            value="Yes"
                            ${property.liftAvailable === "Yes" ? "selected" : ""}>
                            Yes
                        </option>

                        <option
                            value="No"
                            ${property.liftAvailable === "No" ? "selected" : ""}>
                            No
                        </option>

                    </select>

                </div>


                <!-- FURNISHING -->

                <div class="form-group">

                    <label>
                        Furnishing
                    </label>

                    <select id="furnishing">

                        <option
                            value="Unfurnished"
                            ${property.furnishing === "Unfurnished" ? "selected" : ""}>
                            Unfurnished
                        </option>

                        <option
                            value="Semi Furnished"
                            ${property.furnishing === "Semi Furnished" ? "selected" : ""}>
                            Semi Furnished
                        </option>

                        <option
                            value="Furnished"
                            ${property.furnishing === "Furnished" ? "selected" : ""}>
                            Furnished
                        </option>

                    </select>

                </div>


                <!-- SERVICE CHARGE -->

                <div class="form-group">

                    <label>
                        Service Charge
                    </label>

                    <input
                        type="text"
                        id="serviceCharge"
                        value="${property.serviceCharge || ""}"
                        placeholder="e.g. 5000 per month">

                </div>


                <!-- SIZE -->

                <div class="form-group">

                    <label>
                        Apartment Size
                    </label>

                    <input
                        type="text"
                        id="size"
                        value="${property.size || ""}"
                        placeholder="e.g. 900 sq ft">

                </div>

            </div>

        </div>

    `;

}