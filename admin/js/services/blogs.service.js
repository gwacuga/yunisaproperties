/* ==========================================================
                    BLOGS SERVICE
========================================================== */

import {
    ref,
    push,
    set,
    update,
    remove,
    get
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

import {
    db
} from "../../../js/firebase.js";


/* ==========================================================
                    BLOGS PATH
========================================================== */

const BLOGS_PATH = "blogs";


/* ==========================================================
                    ADD BLOG
========================================================== */

async function add(blog) {

    const blogRef =
        push(
            ref(db, BLOGS_PATH)
        );

    const blogData = {

        ...blog,

        createdAt:
            Date.now(),

        updatedAt:
            Date.now()

    };

    await set(
        blogRef,
        blogData
    );

    return {

        id:
            blogRef.key,

        ...blogData

    };

}


/* ==========================================================
                    GET ALL BLOGS
========================================================== */

async function getAll() {

    const snapshot =
        await get(
            ref(db, BLOGS_PATH)
        );

    if (!snapshot.exists()) {

        return [];

    }

    const data =
        snapshot.val();

    return Object.entries(data)
        .map(
            ([id, blog]) => ({

                id,

                ...blog

            })
        );

}


/* ==========================================================
                    GET BLOG
========================================================== */

async function getById(id) {

    if (!id) {

        return null;

    }

    const snapshot =
        await get(
            ref(
                db,
                `${BLOGS_PATH}/${id}`
            )
        );

    if (!snapshot.exists()) {

        return null;

    }

    return {

        id,

        ...snapshot.val()

    };

}


/* ==========================================================
                    UPDATE BLOG
========================================================== */

async function updateBlog(
    id,
    data
) {

    if (!id) {

        throw new Error(
            "Blog ID is required."
        );

    }

    await update(

        ref(
            db,
            `${BLOGS_PATH}/${id}`
        ),

        {

            ...data,

            updatedAt:
                Date.now()

        }

    );

}


/* ==========================================================
                    DELETE BLOG
========================================================== */

async function deleteBlog(id) {

    if (!id) {

        throw new Error(
            "Blog ID is required."
        );

    }

    await remove(

        ref(
            db,
            `${BLOGS_PATH}/${id}`
        )

    );

}


/* ==========================================================
                    EXPORT SERVICE
========================================================== */

const BlogsService = {

    add,

    getAll,

    getById,

    update:
        updateBlog,

    delete:
        deleteBlog

};

export default BlogsService;