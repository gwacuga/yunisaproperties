/* ==========================================================
                    DATABASE SERVICE
========================================================== */

import {

    db

} from "../firebase.js";

import {

    ref,

    get,

    set,

    push,

    update,

    remove,

    child

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const DatabaseService = {

    /* ======================================================
                        GENERATE ID
    ====================================================== */

    generateId(path) {

        return push(
            ref(db, path)
        ).key;

    },

    /* ======================================================
                            ADD
    ====================================================== */

    async add(path, data) {

        const id =
            this.generateId(path);

        const record = {

            ...data,

            id,

            createdAt:
                Date.now(),

            updatedAt:
                Date.now(),

            createdBy:
                null,

            updatedBy:
                null,

            

        };

        await set(

            ref(
                db,
                `${path}/${id}`
            ),

            record

        );
        console.log(
    "Record being saved to Firebase:",
    record
);

        return record;

    },

    /* ======================================================
                            GET
    ====================================================== */

    async get(path, id) {

        const snapshot =
            await get(

                child(

                    ref(db),

                    `${path}/${id}`

                )

            );

        if (!snapshot.exists()) {

            return null;

        }

        return snapshot.val();

    },

/* ======================================================
                    GET ALL
====================================================== */

async getAll(path) {

    const snapshot =
        await get(
            ref(db, path)
        );

    if (!snapshot.exists()) {

        return [];

    }

    return Object.values(
        snapshot.val()
    );

},

/* ======================================================
                    UPDATE
====================================================== */

async update(path, id, data) {

    const updates = {

        ...data,

        updatedAt:
            Date.now()

    };

    await update(

        ref(

            db,

            `${path}/${id}`

        ),

        updates

    );

    return true;

},

/* ======================================================
                    DELETE
====================================================== */

async delete(path, id) {

    await remove(

        ref(

            db,

            `${path}/${id}`

        )

    );

    return true;

}

};

export default DatabaseService;