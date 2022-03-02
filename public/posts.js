import { app, _app } from "./index.js";

import {
    getFirestore,
    getDocs,
    collection,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

const root_posts = document.getElementById("root-posts");

const db = getFirestore();

const comments = [];
getDocs(collection(db, "comments")).then((snapshot) => {
    snapshot.forEach((comment) => {
        comments.push({
            id: comment.id,
            ...comment.data(),
        });
    });
});

if (root_posts) {
    window.addEventListener("DOMContentLoaded", () => {
        // for posts
        getDocs(collection(db, "posts")).then((snapshot) => {
            snapshot.forEach((post) => {
                //define postId
                const id = post.id;
                const { userId, title, body } = post.data();

                const required = [];
                comments.forEach((comment) => {
                    const { postId, name, email, body } = comment;
                    if (postId == id) {
                        required.push({
                            id: comment.id,
                            postId,
                            name,
                            email,
                            body,
                        });
                    }
                });

                const post_div = document.createElement("div");

                post_div.id = id;
                post_div.className = "w3-card-4 w3-light-grey w3-text-blue w3-margin";
                post_div.style.width= "50%"
                post_div.style.position = "relative";
                post_div.style.transform = "translateX(50%)";
                post_div.style.padding = "1vw";
                //variable inject
                post_div.innerHTML = `
                    <h4>${title}</h4>
                    <p>${body}</p>`;

                required.forEach(({ id, postId, name, email, body }) => {
                    const comment_div = document.createElement("div");
                    comment_div.id = id;
                    comment_div.className = "w3-card-4";
                    comment_div.style.padding = "1vw";
                    comment_div.innerHTML = `
                            <h3>${name}</h3>
                            <p>${email}</p>
                            <p>${body}</p>
                        `;
                    comment_div.style.marginLeft = "5vw";
                    post_div.appendChild(comment_div);
                });

                //addchild element
                if (root_posts) {
                    root_posts.appendChild(post_div);
                }
            });
        });
    });
}
