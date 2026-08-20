/* ==========================================================
                    BLOGS SERVICE
========================================================== */

import {
    ref,
    push,
    set,
    get,
    remove,
    update
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


import {
    db
} from "../firebase.js";


/* ==========================================================
                    BLOGS SERVICE
========================================================== */

const BlogsService = {


    /* ======================================================
                        CREATE BLOG
    ====================================================== */

    async add(blog) {

        const blogsRef =
            ref(
                db,
                "blogs"
            );


        const newBlogRef =
            push(
                blogsRef
            );


        const blogData = {

            ...blog,

            id:
                newBlogRef.key,

            createdAt:
                blog.createdAt ||
                Date.now()

        };


        await set(

            newBlogRef,

            blogData

        );


        return {

            id:
                newBlogRef.key,

            ...blogData

        };

    },


    /* ======================================================
                        GET ALL BLOGS
    ====================================================== */

    async getAll() {

        const blogsRef =
            ref(
                db,
                "blogs"
            );


        const snapshot =
            await get(
                blogsRef
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

    },


    /* ======================================================
                        GET SINGLE BLOG
    ====================================================== */

    async get(id) {

        const blogRef =
            ref(
                db,
                `blogs/${id}`
            );


        const snapshot =
            await get(
                blogRef
            );


        if (!snapshot.exists()) {

            return null;

        }


        return {

            id,

            ...snapshot.val()

        };

    },


    /* ======================================================
                        UPDATE BLOG
    ====================================================== */

    async update(id, data) {

        const blogRef =
            ref(
                db,
                `blogs/${id}`
            );


        await update(

            blogRef,

            data

        );


        return true;

    },


    /* ======================================================
                        DELETE BLOG
    ====================================================== */

    async delete(id) {

        const blogRef =
            ref(
                db,
                `blogs/${id}`
            );


        await remove(

            blogRef

        );


        return true;

    }

};


export default BlogsService;