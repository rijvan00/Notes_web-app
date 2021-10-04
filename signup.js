const firebaseConfig = {
  apiKey: "AIzaSyAky4ntPyKom6rn82GvO1Wo8KFlsCGYaD8",
  authDomain: "notes-4d772.firebaseapp.com",
  projectId: "notes-4d772",
  storageBucket: "notes-4d772.appspot.com",
  messagingSenderId: "162933757507",
  appId: "1:162933757507:web:179ed060041b590d6ca6f6"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });



function signUp() {


  var email = document.getElementById("email_field").value;
  var password = document.getElementById("password_field").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      add_data();
      
      


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
    uid = user.uid;

    // ...     

  } else {

  }
});



function add_data(uid) {

  const usernamefield = document.getElementById("username_field");
  const emailfield = document.getElementById("email_field");
  const PhoneNumberfield = document.getElementById("Number_field");

  const username = usernamefield.value;
  const email = emailfield.value;
  const Phone = PhoneNumberfield.value;
  
  const data = {
    username: username,
    email: email,
    Phone: Phone
  }
  db.collection("user").doc(uid).set(data).then(() => {
      console.log("Document successfully written!");
      window.location.replace("save.html");
    })
    
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}