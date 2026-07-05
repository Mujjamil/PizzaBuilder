import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDgtu4Tr9Cnu2oa9-LmwuFTUUFKCQVnMqI",
    authDomain: "firstcup-33486.firebaseapp.com",
    projectId: "firstcup-33486",
    storageBucket: "firstcup-33486.firebasestorage.app",
    messagingSenderId: "589865396548",
    appId: "1:589865396548:web:03c116e7670be4355d8f11",
    measurementId: "G-BPWF4WTJLV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export let analytics = null;
isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(app);
    }
}).catch((err) => {
    console.warn("Firebase Analytics is not supported in this environment:", err);
});