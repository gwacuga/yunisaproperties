/* ==========================================================
                    PROPERTIES SERVICE
========================================================== */

import DatabaseService
from "./database.service.js";


const PATH = "properties";


const PropertiesService = {


    /* ======================================================
                    GET PROPERTY
    ====================================================== */

    async get(id) {

        return await DatabaseService.get(
            PATH,
            id
        );

    },


    /* ======================================================
                    GET ALL
====================================================== */

async getAll() {

    /* -----------------------------
            CHECK CACHE
    ----------------------------- */

    const cached =

        sessionStorage.getItem(
            "yunisa_properties"
        );



    if(cached){

        console.log(
            "Loaded properties from cache"
        );

        return JSON.parse(
            cached
        );

    }



    /* -----------------------------
            DATABASE
    ----------------------------- */

    const properties =

        await DatabaseService.getAll(
            PATH
        );



    /* -----------------------------
            SAVE CACHE
    ----------------------------- */

    sessionStorage.setItem(

        "yunisa_properties",

        JSON.stringify(
            properties
        )

    );



    return properties;

},


   /* ======================================================
                ADD PROPERTY
====================================================== */

async add(data) {

    const id =

        await DatabaseService.add(
            PATH,
            data
        );



    sessionStorage.removeItem(
        "yunisa_properties"
    );



    return id;

},

   /* ======================================================
                UPDATE
====================================================== */

async update(id, data) {

    const result =

        await DatabaseService.update(
            PATH,
            id,
            data
        );



    sessionStorage.removeItem(
        "yunisa_properties"
    );



    return result;

},

  /* ======================================================
                DELETE
====================================================== */

async delete(id) {

    const result =

        await DatabaseService.delete(
            PATH,
            id
        );



    sessionStorage.removeItem(
        "yunisa_properties"
    );



    return result;

}

};


export default PropertiesService;