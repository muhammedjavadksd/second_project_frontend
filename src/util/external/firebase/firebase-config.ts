import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: "life-link-b1675.firebaseapp.com",
    projectId: "life-link-b1675",
    storageBucket: "life-link-b1675.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_ID,
    appId: "1:339220195231:web:1d6b6b2edea7ba650dffaa",
    measurementId: "G-MZZP0CVN06"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const firebaseNotification = getMessaging(firebaseApp)
// firebaseNotification.usePublicVapidKey(process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY)


export { firebaseNotification }
export default firebaseApp