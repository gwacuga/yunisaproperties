/* ==========================================================
                IMAGE CAPTION DATALIST
========================================================== */

import {

    imageCaptions

} from "../data/image-captions.js";

import PropertyManager
from "../managers/property-manager.js";


export function renderImageCaptionDatalist() {


    const type =

        PropertyManager.get().type;


    const captions =

        imageCaptions[type] || [];


    return `

        <datalist id="propertyImageCaptions">

            ${
                captions

                    .map(

                        caption =>

                            `

                            <option value="${caption}">

                            `

                    )

                    .join("")

            }

        </datalist>

    `;

}