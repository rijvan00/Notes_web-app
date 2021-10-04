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
  
  
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      window.location.replace("save.html");
    } else {
      
      // User is signed out
      // ...
     // window.location.replace("signin.html");
    }
  });
  
  function signIn() {
  
  
    var email = document.getElementById("email_field").value;
    var password = document.getElementById("password_field").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    console.log(userCredential);    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Error:" + errorMessage);
  });
  
   
}
  
