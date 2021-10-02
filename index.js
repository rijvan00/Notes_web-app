
const firebaseConfig = {
  apiKey: "AIzaSyAky4ntPyKom6rn82GvO1Wo8KFlsCGYaD8",
  authDomain: "notes-4d772.firebaseapp.com",
  projectId: "notes-4d772",
  storageBucket: "notes-4d772.appspot.com",
  messagingSenderId: "162933757507",
  appId: "1:162933757507:web:179ed060041b590d6ca6f6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db= firebase.firestore();
db.settings({timestampsInSnapshots: true});
