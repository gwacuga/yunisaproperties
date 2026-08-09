/* ==========================================================
                COMMERCIAL FIELDS
========================================================== */

export function renderCommercialFields(property = {}) {

    return `

        <div class="form-section">

            <h3>
                Commercial Details
            </h3>

            <div class="form-grid">


                <!-- COMMERCIAL TYPE -->

                <div class="form-group">

                    <label>
                        Commercial Type
                    </label>

                    <select id="commercialType">

                        <option
                            value="Shop"
                            ${property.commercialType === "Shop" ? "selected" : ""}>
                            Shop
                        </option>

                        <option
                            value="Office"
                            ${property.commercialType === "Office" ? "selected" : ""}>
                            Office
                        </option>

                        <option
                            value="Warehouse"
                            ${property.commercialType === "Warehouse" ? "selected" : ""}>
                            Warehouse
                        </option>

                        <option
                            value="Restaurant"
                            ${property.commercialType === "Restaurant" ? "selected" : ""}>
                            Restaurant
                        </option>

                        <option
                            value="Hotel"
                            ${property.commercialType === "Hotel" ? "selected" : ""}>
                            Hotel
                        </option>

                        <option
                            value="Mall Space"
                            ${property.commercialType === "Mall Space" ? "selected" : ""}>
                            Mall Space
                        </option>

                    </select>

                </div>


                <!-- SIZE -->

                <div class="form-group">

                    <label>
                        Building Size
                    </label>

                    <input
                        type="text"
                        id="size"
                        placeholder="e.g. 5000 sq ft"
                        value="${property.size || ""}">

                </div>


                <!-- FLOORS -->

                <div class="form-group">

                    <label>
                        Floors
                    </label>

                    <input
                        type="number"
                        id="floors"
                        placeholder="3"
                        value="${property.floors || ""}">

                </div>


                <!-- PARKING -->

                <div class="form-group">

                    <label>
                        Parking Spaces
                    </label>

                    <input
                        type="number"
                        id="parking"
                        placeholder="20"
                        value="${property.parking || ""}">

                </div>


                <!-- WASHROOMS -->

                <div class="form-group">

                    <label>
                        Washrooms
                    </label>

                    <input
                        type="number"
                        id="washrooms"
                        placeholder="4"
                        value="${property.washrooms || ""}">

                </div>


                <!-- LOADING AREA -->

                <div class="form-group">

                    <label>
                        Loading Area
                    </label>

                    <select id="loadingArea">

                        <option
                            value="Yes"
                            ${property.loadingArea === "Yes" ? "selected" : ""}>
                            Yes
                        </option>

                        <option
                            value="No"
                            ${property.loadingArea === "No" ? "selected" : ""}>
                            No
                        </option>

                    </select>

                </div>


                <!-- POWER SUPPLY -->

                <div class="form-group">

                    <label>
                        Power Supply
                    </label>

                    <select id="powerSupply">

                        <option
                            value="Single Phase"
                            ${property.powerSupply === "Single Phase" ? "selected" : ""}>
                            Single Phase
                        </option>

                        <option
                            value="Three Phase"
                            ${property.powerSupply === "Three Phase" ? "selected" : ""}>
                            Three Phase
                        </option>

                        <option
                            value="Solar"
                            ${property.powerSupply === "Solar" ? "selected" : ""}>
                            Solar
                        </option>

                    </select>

                </div>


                <!-- READY STATUS -->

                <div class="form-group">

                    <label>
                        Business Ready
                    </label>

                    <select id="businessReady">

                        <option
                            value="Ready"
                            ${property.businessReady === "Ready" ? "selected" : ""}>
                            Ready
                        </option>

                        <option
                            value="Under Construction"
                            ${property.businessReady === "Under Construction" ? "selected" : ""}>
                            Under Construction
                        </option>

                    </select>

                </div>

            </div>

        </div>

    `;

}