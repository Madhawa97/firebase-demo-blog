export let app = firebase.app();
const cred = app._delegate._options;

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

export const _app = initializeApp(cred);
// console.log(_app);

const auth = getAuth();




const login_form = document.getElementById('signin');

if (login_form) {
    login_form.onsubmit = e => {
        e.preventDefault();
        document.getElementById('signin-status').innerHTML = " ";
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then(cred => {
                document.getElementById("id02").style.display = "none";
            })
            .catch(err => {
                document.getElementById("signin-status").innerHTML = err.code;
                // console.log('====================================');
                // console.log(err.message,err.code);
                // console.log('====================================');
            })
    }
}


const signup_form = document.getElementById('signup')

if (signup_form) {
    signup_form.onsubmit = (e) => {
        e.preventDefault();
        document.getElementById("signup-status").innerHTML = " ";
        const email = e.target.email.value;
        const password = e.target.password.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                document.getElementById("id01").style.display = "none";
            })
            .catch((err) => {
                document.getElementById("signup-status").innerHTML = err.code;
                // console.log("====================================");
                // console.log(err.message, err.code);
                // console.log("====================================");
            });
    };
}

const signout_button = document.getElementById("signout");
signout_button.onclick = () => {
    signOut(auth)
        .then(() => {
            // Sign-out successful.
            console.log("signout");
        })
        .catch((error) => {
            // An error happened.
            console.log("error:signout");
        });
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);
    } else {
        // User is signed out
        console.log('====================================');
        console.log("User not found");
        console.log('====================================');
    }
});