// import * as firebase from "firebase";
// import "firebase/database";

// Firebase for TypeScript support is sucks!
declare namespace firebase {
    function initializeApp(any);
};

const firebaseConfig: object = {
    apiKey: "AIzaSyCJz0Nkfs_PWBZ_UEX4cC24VSe2jryvTwk",
    authDomain: "andra-antariksa-prihadi.firebaseapp.com",
    databaseURL: "https://andra-antariksa-prihadi.firebaseio.com",
    projectId: "andra-antariksa-prihadi",
    storageBucket: "andra-antariksa-prihadi.appspot.com",
    messagingSenderId: "27361101383",
    appId: "1:27361101383:web:18b78239aa03e5e16a1362",
    measurementId: "G-72PBNFLELV"
};

// const firebaseApp: firebase.app.App = firebase.initializeApp(firebaseConfig);
// const firebaseDB: firebase.database.Database = firebaseApp.database();

const firebaseApp: any = firebase.initializeApp(firebaseConfig);
const firebaseDB: any = firebaseApp.database();

export default firebaseDB;