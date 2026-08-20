/* ==========================================================
                    MESSAGES SERVICE
========================================================== */

import {
    ref,
    push,
    set,
    get,
    remove
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

import {
    db
} from "../../../js/firebase.js";


/* ==========================================================
                    ADD MESSAGE
========================================================== */

export async function addMessage(message){

    const messagesRef =
        ref(db, "messages");

    const newMessage =
        push(messagesRef);

    await set(
        newMessage,
        {

            ...message,

            createdAt:
                Date.now(),

            status:
                message.status || "New"

        }
    );

    return newMessage.key;

}


/* ==========================================================
                    GET ALL MESSAGES
========================================================== */

export async function getMessages(){

    const snapshot =
        await get(
            ref(db, "messages")
        );


    if(!snapshot.exists()){

        return [];

    }


    const data =
        snapshot.val();


    return Object.entries(data)

        .map(
            ([id, message]) => ({

                id,

                ...message

            })
        );

}


/* ==========================================================
                    DELETE MESSAGE
========================================================== */

export async function deleteMessage(id){

    if(!id){

        throw new Error(
            "Message ID is required."
        );

    }


    await remove(
        ref(
            db,
            `messages/${id}`
        )
    );


    return true;

}


/* ==========================================================
                    DEFAULT EXPORT
========================================================== */

const MessagesService = {

    add:
        addMessage,

    getAll:
        getMessages,

    delete:
        deleteMessage

};


export default MessagesService;