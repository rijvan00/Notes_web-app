const firebaseConfig = {
  apiKey: "AIzaSyAky4ntPyKom6rn82GvO1Wo8KFlsCGYaD8",
  authDomain: "notes-4d772.firebaseapp.com",
  projectId: "notes-4d772",
  storageBucket: "notes-4d772.appspot.com",
  messagingSenderId: "162933757507",
  appId: "1:162933757507:web:179ed060041b590d6ca6f6"
};

 firebase.initializeApp(firebaseConfig);



 firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    console.log(uid);
    getNotes();
 
  } else {
   
    window.location.replace("signin.html");
  }
});



const logoutButton = document.getElementById("logout");
logoutButton.onclick = onLogOutClicked;



 const db= firebase.firestore();
 db.settings({timestampsInSnapshots: true});

function rendernotes(doc){

  let li = document.createElement('li');
  let title=document.createElement('h2');
  let data=document.createElement('p');
  let date=document.createElement('span');
  li.setAttribute('id', doc.id);
  title.textContent=doc.data().title;
  data.textContent=doc.data().data;

  const t = firebase.firestore.Timestamp.fromDate(new Date());

  // Timestamp to Date
  const d = t.toDate();

  
  date.textContent=d;

  li.appendChild(title);
  li.appendChild(data);
  li.appendChild(date);
  li.onclick = ()=>{
    onCardClicked(doc.id);
  }
  savednotes.appendChild(li);
}





function getNotes(){
  db.collection("user").doc(uid).collection("notes").get().then((querySnapshot)=>{
    querySnapshot.forEach((doc)=>{
  rendernotes(doc);
     
    })
  })
}



function onLogOutClicked(){
  
  var result = confirm("Do you want to logout!");
  if (result == true) {
    firebase.auth().signOut();
  } else {
      
  }
}
const savednotes = document.querySelector('#saved');


function updatedata(){

}

function onCardClicked(docId){
  window.location.replace("notes.html?document="+docId);
}






