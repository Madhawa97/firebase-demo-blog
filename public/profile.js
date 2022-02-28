import { app,_app } from "./index.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-storage.js";

const upd_profile = document.getElementById('upd_profile');

if (upd_profile) {
    upd_profile.onsubmit = e => {
        e.preventDefault();
        const formData = new FormData(upd_profile);
        for (let [key,value] of formData) console.log(`${key}==${value}`);
    }
}
