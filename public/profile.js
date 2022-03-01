import { app, _app } from "./index.js";

import {
    getFirestore,
    doc,
    setDoc,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js";

const storage = getStorage();

const db = getFirestore();

const upd_profile = document.getElementById("upd_profile");


if (localStorage.getItem('user')){
    const user = JSON.parse(localStorage.getItem('user'));

    document.querySelector("input[name= username]").placeholder = user["username"];
    document.querySelector("input[name= address]").placeholder = user["address"];
    document.querySelector("input[name= phone]").placeholder = user["phone"];
    document.querySelector("input[name= website]").placeholder = user["website"];
    document.getElementById('show-img').src = user['url'];
    document.getElementById("profile-info-address").innerHTML = user["address"];
}


if (upd_profile) {
    upd_profile.onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(upd_profile);
        const data = {};
        for (let [key, value] of formData) data[key] = value;
        // data['profile']

        const fileName = `${Date.now()}-${data["pro_file"]["name"]}`;

        const storageRef = ref(storage, fileName);

        //send image to db>
        uploadBytes(storageRef, data['pro_file']).then((snapshot) => {
            console.log("Uploaded a blob or file!");
            getDownloadURL(storageRef).then((url) => {
                delete data['pro_file'];
                data["url"] = url;

                const id = localStorage.getItem('uid');
                console.log(data);
                setDoc(doc(db, "user", id), data)
                    .then(() => {
                        const user = JSON.stringify(data);
                        localStorage.setItem("user", user);
                        location.reload();
                        console.log("====================================");
                        console.log("Successfully upload");
                        console.log("====================================");
                    })
                    .catch(() => {
                        console.log("Upload failed");
                    });
            });
        });
        // get download url
        // > send it to firestore
    };
}
