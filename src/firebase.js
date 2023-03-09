import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAV-GfdPw_w4Op1RtjqdPnXj4eULi6InlU",
    authDomain: "baseballcharts-3fedf.firebaseapp.com",
    projectId: "baseballcharts-3fedf",
    storageBucket: "baseballcharts-3fedf.appspot.com",
    messagingSenderId: "1001245456480",
    appId: "1:1001245456480:web:493c7a0f65b9bcf52aeb05"
};

const firebase = initializeApp(firebaseConfig);
export { firebase };