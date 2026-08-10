/* ==========================================================
                CLOUDINARY HELPERS
========================================================== */

export function getCloudinaryPublicId(url) {

    if(!url) return "";

    try {

        const parts =
            url.split("/");

        const uploadIndex =
            parts.indexOf("upload");


        if(uploadIndex === -1){

            return "";

        }


        // Remove version part (v123456789)

        const fileParts =
            parts.slice(
                uploadIndex + 2
            );


        const fileName =
            fileParts.join("/");


        // Remove extension

        return fileName.replace(
            /\.[^/.]+$/,
            ""
        );


    }

    catch(error){

        console.error(
            "Failed extracting public id:",
            error
        );

        return "";

    }

}