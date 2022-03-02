import { app, _app } from "./index.js";

import {
    getFirestore,
    getDocs,
    collection,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

const root_posts = document.getElementById("root-posts");

const db = getFirestore();

if (root_posts) {
    window.addEventListener("DOMContentLoaded", () => {
        const posts = [];
        getDocs(collection(db, "posts")).then((snapshot) => {
            snapshot.forEach((doc) => {
                const { name, title, body, date } = doc.data();

                const post = document.createElement("div");

                //variable inject
                post.innerHTML = `
                    <div id=${doc.id}>
                    <h3>${name}</h3>
                    <h4>${title}</h4>
                    <p>${body}</p>
                    <p>${date}</p>
                    </div>
                    `;

                //addchild element
                if (root_posts) {
                    root_posts.appendChild(post);
                }
            });
        });
        console.log("====================================");
        console.log(posts);
        console.log("====================================");
    });
}
