/* ==========================================================
                    ENQUIRIES SERVICE
========================================================== */

import DatabaseService
from "./database.service.js";

const PATH = "enquiries";

const EnquiriesService = {

    /* ======================================================
                        ADD
    ====================================================== */

    async add(data){

        return await DatabaseService.add(
            PATH,
            data
        );

    },

    /* ======================================================
                        GET ALL
    ====================================================== */

    async getAll(){

        return await DatabaseService.getAll(
            PATH
        );

    },

    /* ======================================================
                        GET
    ====================================================== */

    async get(id){

        return await DatabaseService.get(
            PATH,
            id
        );

    },

    /* ==========================================================
                        UPDATE
    ========================================================== */

    async update(id, data) {

    return await DatabaseService.update(
        PATH,
        id,
        data
    );

    }

};

export default EnquiriesService;