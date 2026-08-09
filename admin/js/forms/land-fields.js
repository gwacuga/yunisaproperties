/* ==========================================================
                    LAND FIELDS
========================================================== */

export function renderLandFields(property = {}) {

    return `

        <div class="form-section">

            <h3>
                Land Details
            </h3>

            <div class="form-grid">


                <!-- LAND SIZE -->

                <div class="form-group">

                    <label>
                        Land Size
                    </label>

                    <input
                        type="text"
                        id="landSize"
                        placeholder="e.g. 50 x 100 ft, 2 acres"
                        value="${property.landSize || ""}">

                </div>


                <!-- LAND TYPE -->

                <div class="form-group">

                    <label>
                        Land Type
                    </label>

                    <select id="landType">

                        <option
                            value="Residential"
                            ${property.landType === "Residential" ? "selected" : ""}>
                            Residential
                        </option>

                        <option
                            value="Agricultural"
                            ${property.landType === "Agricultural" ? "selected" : ""}>
                            Agricultural
                        </option>

                        <option
                            value="Commercial"
                            ${property.landType === "Commercial" ? "selected" : ""}>
                            Commercial
                        </option>

                    </select>

                </div>


                <!-- OWNERSHIP -->

                <div class="form-group">

                    <label>
                        Ownership Type
                    </label>

                    <select id="ownershipType">

                        <option
                            value="Freehold"
                            ${property.ownershipType === "Freehold" ? "selected" : ""}>
                            Freehold
                        </option>

                        <option
                            value="Leasehold"
                            ${property.ownershipType === "Leasehold" ? "selected" : ""}>
                            Leasehold
                        </option>

                    </select>

                </div>


                <!-- ROAD ACCESS -->

                <div class="form-group">

                    <label>
                        Road Access
                    </label>

                    <select id="roadAccess">

                        <option
                            value="Tarmac"
                            ${property.roadAccess === "Tarmac" ? "selected" : ""}>
                            Tarmac
                        </option>

                        <option
                            value="Murram"
                            ${property.roadAccess === "Murram" ? "selected" : ""}>
                            Murram
                        </option>

                        <option
                            value="Earth Road"
                            ${property.roadAccess === "Earth Road" ? "selected" : ""}>
                            Earth Road
                        </option>

                    </select>

                </div>

            </div>

        </div>

    `;

}