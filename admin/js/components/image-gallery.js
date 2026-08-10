/* ==========================================================
                    IMAGE GALLERY
========================================================== */
import {

    getCloudinaryPublicId

} from "../utils/cloudinary.js";

import PropertyManager
from "../managers/property-manager.js";

import {

    renderImageCaptionDatalist

} from "./image-caption-datalist.js";

import {

    renderImageCard

} from "./image-card.js";

/* ======================================================
                    REPLACE IMAGE
====================================================== */

import StorageService
from "../../../js/services/storage.service.js";

import Confirm from "./confirm.js";

let propertyImages = [];
let replacingImageId = null;
let deletedImages = [];

/* ======================================================
                    GET IMAGES
====================================================== */

export function getPropertyImages() {

    return propertyImages;

}

export function getDeletedImages(){

    return deletedImages;

}


/* ======================================================
                    ADD IMAGES
====================================================== */

export function addPropertyImages(images) {

    console.log("Incoming images:", images);

    if (!Array.isArray(images)) {

        console.error(
            "Images is not an array",
            images
        );

        return;

    }


    const startOrder =
    propertyImages.length > 0
        ? Math.max(
            ...propertyImages.map(
                img => img.order
            )
          )
        : 0;


    images.forEach(

        (image, index) => {

            image.order =
                startOrder +
                index +
                1;


            if (
                  propertyImages.length === 0 &&
                   index === 0 &&
                   !images.some(img => img.isCover)
                   ) {

                         image.isCover = true;

                        }

        }

    );


    propertyImages = [

        ...propertyImages,

        ...images

    ];


    PropertyManager.set({

        images: propertyImages

    });


    renderGallery();

}

/* ======================================================
                    REMOVE IMAGE
====================================================== */

export function removePropertyImage(id) {


    console.log(
        "Deleting image id:",
        id
    );


    // First capture deleted image

    const deletedImage =

        propertyImages.find(

            image =>
            image.id === id

        );


    console.log(
        "Found deleted image:",
        deletedImage
    );


    if(deletedImage){


    if(
        !deletedImage.publicId &&
        deletedImage.url
    ){

        deletedImage.publicId =
            getCloudinaryPublicId(
                deletedImage.url
            );

    }


    deletedImages.push(
        deletedImage
    );

     }


    console.log(
        "Deleted images JSON:",
        JSON.stringify(
            deletedImages,
            null,
            2
        )
    );


    // Now remove image

    propertyImages = propertyImages.filter(

        image =>
        image.id !== id

    );


    // Reorder

    propertyImages.forEach(

        (image,index)=>{

            image.order = index + 1;

        }

    );


    // Ensure cover exists

    const hasCover =

        propertyImages.some(

            image =>
            image.isCover

        );


    if(
        propertyImages.length > 0 &&
        !hasCover
    ){

        propertyImages[0].isCover = true;

    }


    PropertyManager.set({

        images: propertyImages,

        deletedImages

    });


    renderGallery();

}

/* ======================================================
                    RENDER
====================================================== */

export function renderGallery() {

    console.log("Gallery data:", propertyImages);
    console.log("Is array:", Array.isArray(propertyImages));

    const gallery =
        document.getElementById(
            "imagePreview"
        );

    if (!gallery) return;

    gallery.innerHTML =

    propertyImages

        .map(

            renderImageCard

        )

        .join("")

    +

    renderImageCaptionDatalist();

    initializeGallery();

}

/* ======================================================
                    INITIALIZE
====================================================== */

function initializeGallery() {

    initializeCaptions();

    initializeCoverImages();

    initializeDeleteImages();

    initializeReplaceImages();

    initializeReorderImages();

}

/* ======================================================
                    CAPTIONS
====================================================== */

function initializeCaptions() {

    document

        .querySelectorAll(
            ".image-caption"
        )

        .forEach(input => {

            input.addEventListener(

                "input",

                event => {

                    const image =

                        propertyImages.find(

                            img =>

                                img.id ===

                                event.target.dataset.id

                        );

                    if (!image) return;

                    image.caption =

                        event.target.value;

                }

            );

        });

}


/* ======================================================
                    COVER IMAGE
====================================================== */

function initializeCoverImages() {

    document
        .querySelectorAll(".cover-image")
        .forEach(radio => {

            radio.addEventListener(
                "change",

                event => {


                    propertyImages.forEach(

                        image => {

                            image.isCover = false;

                        }

                    );


                    const selectedImage =

                        propertyImages.find(

                            img =>

                            img.id ===
                            event.target.dataset.id

                        );


                    if(selectedImage){

                        selectedImage.isCover = true;

                    }


                    // Update manager
                    PropertyManager.set({

                        images: propertyImages

                    });


                    console.log(
                        "Updated Cover:",
                        propertyImages
                    );


                    renderGallery();


                }

            );

        });

}

/* ======================================================
                    REPLACE IMAGE
====================================================== */

function initializeReplaceImages(){

    document
        .querySelectorAll(".replace-image")
        .forEach(button => {


            button.addEventListener(

                "click",

                () => {


                    const imageId =
                        button.dataset.id;


                    const input =
                        document.createElement(
                            "input"
                        );


                    input.type = "file";

                    input.accept = "image/*";


                    input.click();


                    input.onchange = async event => {


                        const file =
                            event.target.files[0];


                        if(!file) return;


                        try {


                            console.log(
                                "Replacing:",
                                imageId,
                                file
                            );


                            // Upload new image

                            const newImage =
                                await StorageService.upload(
                                    file
                                );


                            // Find old image

                            const image =
                                propertyImages.find(

                                    img =>
                                    img.id === imageId

                                );


                            if(!image){

                                console.error(
                                    "Image not found"
                                );

                                return;

                            }
                             
                            // Store old image before replacing

                              image.oldPublicId =
                              image.publicId;

                            // Replace image data

                            image.url =
                                newImage.url;


                            image.publicId =
                                newImage.publicId;


                            // Update manager

                            PropertyManager.set({

                                images:
                                propertyImages

                            });


                            console.log(
                                "Image replaced:",
                                image
                            );


                            renderGallery();


                        }

                        catch(error){

                            console.error(
                                "Replace failed:",
                                error
                            );

                        }


                    };


                }

            );


        });


}

/* ======================================================
                    DELETE IMAGE
====================================================== */

function initializeDeleteImages() {

    document

        .querySelectorAll(
            ".delete-image"
        )

        .forEach(button => {


            button.addEventListener(

                "click",

                async event => {


                    const id =
                        event.currentTarget.dataset.id;


                    const image =
                        propertyImages.find(

                            img =>
                            img.id === id

                        );


                    const confirmed =
                        await Confirm.show({

                            title:
                            "Delete Image",

                            message:
                            `Are you sure you want to delete this image?`,

                            confirmText:
                            "Delete",

                            cancelText:
                            "Cancel"

                        });


                    if(!confirmed) return;


                    removePropertyImage(id);


                }

            );


        });

}

/* ======================================================
                    REORDER IMAGES
====================================================== */

function initializeReorderImages() {


    document
        .querySelectorAll(".move-up")
        .forEach(button => {


            button.addEventListener(

                "click",

                () => {


                    const id =
                        button.dataset.id;


                    const index =
                        propertyImages.findIndex(

                            image =>
                            image.id === id

                        );


                    if(index <= 0) return;


                    [
                        propertyImages[index - 1],
                        propertyImages[index]
                    ] =
                    [
                        propertyImages[index],
                        propertyImages[index - 1]
                    ];


                    updateImageOrders();


                }

            );


        });



    document
        .querySelectorAll(".move-down")
        .forEach(button => {


            button.addEventListener(

                "click",

                () => {


                    const id =
                        button.dataset.id;


                    const index =
                        propertyImages.findIndex(

                            image =>
                            image.id === id

                        );


                    if(
                        index === -1 ||
                        index === propertyImages.length - 1
                    ) return;



                    [
                        propertyImages[index],
                        propertyImages[index + 1]
                    ] =
                    [
                        propertyImages[index + 1],
                        propertyImages[index]
                    ];


                    updateImageOrders();


                }

            );


        });


}

/* ======================================================
                    UPDATE IMAGE ORDERS
====================================================== */

function updateImageOrders(){


    propertyImages.forEach(

        (image,index)=>{

            image.order =
                index + 1;

        }

    );


    PropertyManager.set({

        images:
        propertyImages

    });


    console.log(
        "New image order:",
        propertyImages
    );


    renderGallery();


}

/* ======================================================
                    RESET IMAGES
====================================================== */

export function resetPropertyImages(){

    propertyImages = [];

    deletedImages = [];

    const gallery =
        document.getElementById(
            "imagePreview"
        );

    if(gallery){

        gallery.innerHTML = "";

    }

}