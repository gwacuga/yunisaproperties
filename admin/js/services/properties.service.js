/* ==========================================================
                    PROPERTIES SERVICE
========================================================== */

import DatabaseService
from "../../../js/services/database.service.js";

const PropertiesService = {

    /* ======================================================
                        ADD PROPERTY
    ====================================================== */

    async addProperty(data) {

        return await DatabaseService.add(
            "properties",
            data
        );

    },

    /* ======================================================
                        GET ALL
    ====================================================== */

    async getProperties() {

        return await DatabaseService.getAll(
            "properties"
        );

    },

    /* ======================================================
                        GET ONE
    ====================================================== */

    async getProperty(id) {

        return await DatabaseService.get(
            "properties",
            id
        );

    },

    /* ======================================================
                        UPDATE
    ====================================================== */

    async updateProperty(id, data) {

        return await DatabaseService.update(
            "properties",
            id,
            data
        );

    },

    /* ======================================================
                        DELETE
    ====================================================== */

    async deleteProperty(id) {

        return await DatabaseService.delete(
            "properties",
            id
        );

    }

};

export default PropertiesService;