import * as firebase from 'firebase';


const settings = {};

const config = {
    apiKey: "AIzaSyCiaq_CRLT5Z8rEnZZN_3S1tiaTNptx8DU",
    authDomain: "manager-4d5d8.firebaseapp.com",
    databaseURL: "https://manager-4d5d8.firebaseio.com",
    projectId: "manager-4d5d8",
    storageBucket: "manager-4d5d8.appspot.com",
    messagingSenderId: "967831460414"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;