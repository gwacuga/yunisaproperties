/* ==========================================================
                    ADMIN LOGIN PAGE
========================================================== */

import AuthService
from "../services/auth.service.js";


/* ==========================================================
                    RENDER LOGIN
========================================================== */

export function renderLoginPage() {

    const app =
        document.getElementById("app");

    if (!app) {

        return;

    }

    app.innerHTML = `

        <section class="admin-login-page">

            <div class="login-card">

                <div class="login-header">

                    <h1>
                        Yunisa Properties
                    </h1>

                    <p>
                        Admin Portal
                    </p>

                </div>


                <form
                    id="adminLoginForm"
                    class="admin-login-form">

                    <div class="form-group">

                        <label for="adminEmail">
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="adminEmail"
                            placeholder="Enter admin email"
                            required>

                    </div>


                    <div class="form-group">

                        <label for="adminPassword">
                            Password
                        </label>

                        <input
                            type="password"
                            id="adminPassword"
                            placeholder="Enter password"
                            required>

                    </div>


                    <p
                        id="loginError"
                        class="login-error">
                    </p>


                    <button
                        type="submit"
                        class="btn-primary"
                        id="loginButton">

                        <i class="fa-solid fa-right-to-bracket"></i>

                        Sign In

                    </button>

                </form>

            </div>

        </section>

    `;

}


/* ==========================================================
                INITIALIZE LOGIN
========================================================== */

export function initializeLoginPage() {

    const form =
        document.getElementById(
            "adminLoginForm"
        );

    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        handleLogin
    );

}


/* ==========================================================
                    HANDLE LOGIN
========================================================== */

async function handleLogin(event) {

    event.preventDefault();


    const email =
        document.getElementById(
            "adminEmail"
        ).value.trim();


    const password =
        document.getElementById(
            "adminPassword"
        ).value;


    const errorElement =
        document.getElementById(
            "loginError"
        );


    const button =
        document.getElementById(
            "loginButton"
        );


    try {

        errorElement.textContent = "";


        button.disabled = true;

        button.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Signing in...
        `;


        await AuthService.login(
            email,
            password
        );


       window.location.href = "./dashboard.html";


    }

    catch(error) {

        console.error(
            "Login failed:",
            error
        );


        errorElement.textContent =
            "Invalid email or password.";


        button.disabled = false;

        button.innerHTML = `
            <i class="fa-solid fa-right-to-bracket"></i>
            Sign In
        `;

    }

}