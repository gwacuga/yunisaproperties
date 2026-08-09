/* ==========================================================
                    IMAGE UPLOAD
========================================================== */
import StorageService
from "../../../js/services/storage.service.js";

import {

    addPropertyImages

} from "./image-gallery.js";


export function renderImageUpload() {

    return `

        <div
            class="image-upload"
            id="imageUpload">

            <i class="fa-solid fa-cloud-arrow-up"></i>

            <h4>

                Upload Property Images

            </h4>

            <p>

                Drag & drop images here

            </p>

            <p>

                or

            </p>

            <button
                type="button"
                class="btn-secondary"
                id="browseImages">

                Browse Images

            </button>

            <input
                type="file"
                id="propertyImages"
                multiple
                accept="image/*"
                hidden>

            <div
                id="imagePreview"
                class="image-preview">

            </div>

        </div>

    `;

}


let imageUploadInitialized = false;

export function initializeImageUpload() {

    if(imageUploadInitialized){
        return;
    }

    imageUploadInitialized = true;

    const browseButton =

        document.getElementById(
            "browseImages"
        );

    const input =

        document.getElementById(
            "propertyImages"
        );

    const preview =

        document.getElementById(
            "imagePreview"
        );

    if (!browseButton || !input) {

        return;

    }

    browseButton.addEventListener(

        "click",

        () => input.click()

    );

    input.addEventListener(

"change",

async () => {

    console.log("Files selected:", input.files);


    const files = [...input.files];

    console.log("Files array:", files);


    try {

       const uploadedImages =

         await Promise.all(

        files.map(file => {

            return StorageService.upload(file);

            })

              );


        console.log(
              "Uploaded Images:",
              uploadedImages
                );


        const images = uploadedImages.map(

            (image,index)=>({

            id: crypto.randomUUID(),

              url:image.url,

              publicId:image.publicId,

               caption:"",

               isCover:index===0,
             
               order:index+1

             })

                );



        console.log(
            "Final images:",
            images
        );
         
        console.log(
    "Images before gallery:",
    images
);

addPropertyImages(images);

        


    }

    catch(error){

        console.error(
            "Upload failed:",
            error
        );

    }

});




}