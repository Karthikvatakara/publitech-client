
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyDiZZXw5svy5VjBQL1Lrx2RXgaGEOgnNZc",
//   authDomain: "publitech-66d43.firebaseapp.com",
//   projectId: "publitech-66d43",
//   storageBucket: "publitech-66d43.appspot.com",
//   messagingSenderId: "572556231152",
//   appId: "1:572556231152:web:c82cb0c52497f090b15d35"
// };

const firebaseConfig = {
    apiKey: "AIzaSyAUgSpyYnZ3FAkDQyA5OWCgYzSkkjpRE94",
    authDomain: "publitech-62bf2.firebaseapp.com",
    projectId: "publitech-62bf2",
    storageBucket: "publitech-62bf2.appspot.com",
    messagingSenderId: "513919339822",
    appId: "1:513919339822:web:05317cc787c675dcf7febf",
    measurementId: "G-TYEV5TN1MG"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

const id = import.meta.env.VITE_REACT_APP_FIREBASE_KEY;


export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log("🚀 ~ generateToken ~ permission:", permission);
    if(permission === 'granted') {
        const token = await getToken(messaging, {
            vapidKey: id 
        });

        console.log(token,"11111111111111114421111111");
        return token;
    }
}