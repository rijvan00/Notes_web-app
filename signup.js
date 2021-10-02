const firebaseConfig = {
  apiKey: "AIzaSyAky4ntPyKom6rn82GvO1Wo8KFlsCGYaD8",
  authDomain: "notes-4d772.firebaseapp.com",
  projectId: "notes-4d772",
  storageBucket: "notes-4d772.appspot.com",
  messagingSenderId: "162933757507",
  appId: "1:162933757507:web:179ed060041b590d6ca6f6"
};

firebase.initializeApp(firebaseConfig);

const db= firebase.firestore();
db.settings({timestampsInSnapshots: true});



function signUp() {


  var email = document.getElementById("email_field").value;
  var password = document.getElementById("password_field").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    window.location.replace("save.html");

    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Error:" + errorMessage)
    // ..
  });
}

firebase.auth().onAuthStateChanged((user) => {

  if (user) {

    window.location.replace("save.html");
    var uid = user.uid;
    // ...
  } else {
  
  }
});
