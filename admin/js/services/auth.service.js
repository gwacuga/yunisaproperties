/* ==========================================================
                    AUTH SERVICE
========================================================== */

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    auth
}
from "../../../js/firebase.js";


const AuthService = {

    /* ======================================================
                        LOGIN
    ====================================================== */

    async login(email, password) {

        return await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

    },


    /* ======================================================
                        LOGOUT
    ====================================================== */

    async logout() {

        await signOut(auth);

        window.location.href =
            "./login.html";

    },


    /* ======================================================
                    CURRENT USER
    ====================================================== */

    getCurrentUser() {

        return auth.currentUser;

    },


    /* ======================================================
                    AUTH STATE
    ====================================================== */

    onAuthStateChanged(callback) {

        return onAuthStateChanged(
            auth,
            callback
        );

    }

};


export default AuthService;