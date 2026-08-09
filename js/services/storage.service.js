/* ==========================================================
                    STORAGE SERVICE
========================================================== */

import {

    CLOUDINARY

} from "../config/cloudinary.js";


const StorageService = {


    /* ======================================================
                        UPLOAD
    ====================================================== */

    async upload(file) {


        const formData =
            new FormData();


        formData.append(
            "file",
            file
        );


        formData.append(
            "upload_preset",
            CLOUDINARY.uploadPreset
        );


        const response =
            await fetch(

                CLOUDINARY.uploadUrl,

                {

                    method:"POST",

                    body:formData

                }

            );


        if(!response.ok){

            throw new Error(
                "Image upload failed."
            );

        }


        const data =
            await response.json();


        return {

            url:data.secure_url,

            publicId:data.public_id

        };


    },


    /* ======================================================
                        DELETE
    ====================================================== */

    async delete(publicId) {


        console.log(
            "Delete request:",
            publicId
        );


        // Will connect to backend later
        // because Cloudinary delete requires API secret


    }


};


export default StorageService;