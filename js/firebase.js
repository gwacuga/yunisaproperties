/* ==========================================================
                    FIREBASE
========================================================== */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

const firebaseConfig = {

    apiKey:
        "AIzaSyCdOI4M-HG0qwRi58Kd6rfpIcmop3uB8go",

    authDomain:
        "yunisa-1d1d8.firebaseapp.com",

    databaseURL:
        "https://yunisa-1d1d8-default-rtdb.firebaseio.com/",

    projectId:
        "yunisa-1d1d8",

    storageBucket:
        "yunisa-1d1d8.firebasestorage.app",

    messagingSenderId:
        "991364860669",

    appId:
        "1:991364860669:web:c2bd934f754ec772a34c94"

};

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

const db =
getDatabase(app);

export {

    app,

    auth,

    db

};