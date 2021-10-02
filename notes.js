const firebaseConfig = {
  apiKey: "AIzaSyAky4ntPyKom6rn82GvO1Wo8KFlsCGYaD8",
  authDomain: "notes-4d772.firebaseapp.com",
  projectId: "notes-4d772",
  storageBucket: "notes-4d772.appspot.com",
  messagingSenderId: "162933757507",
  appId: "1:162933757507:web:179ed060041b590d6ca6f6"
};

firebase.initializeApp(firebaseConfig);

// grab html elements
const titleField = document.getElementById("title");
const dataField = document.getElementById("addTxt");


const db = firebase.firestore();
let docID;
db.settings({ timestampsInSnapshots: true });
firebase.auth().onAuthStateChanged((user) => {

  if (user) {

    uid = user.uid;
    getNoteDoc(docID);
    // ...
  } else {

    window.location.replace("./index.html");
  }
});

window.onload = () => {
  //console.log(window.location.search);
  const url = window.location.href;
  const data = parseURLParams(url);
  docID = data.document[0];
  console.log(docID);
}

function parseURLParams(url) {
  var queryStart = url.indexOf("?") + 1,
    queryEnd = url.indexOf("#") + 1 || url.length + 1,
    query = url.slice(queryStart, queryEnd - 1),
    pairs = query.replace(/\+/g, " ").split("&"),
    parms = {}, i, n, v, nv;

  if (query === url || query === "") return;

  for (i = 0; i < pairs.length; i++) {
    nv = pairs[i].split("=", 2);
    n = decodeURIComponent(nv[0]);
    v = decodeURIComponent(nv[1]);

    if (!parms.hasOwnProperty(n)) parms[n] = [];
    parms[n].push(nv.length === 2 ? v : null);
  }
  return parms;
}


const saveNote = () => {
  const title = titleField.value;
  const data = dataField.value;

  const obj = {
    title: title,
    data: data,
    date:firebase.firestore.FieldValue.serverTimestamp(),
  }
  db.collection("user").doc(uid).collection("notes").add(obj).then((docRef) => {
    window.location.replace("save.html");
  })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

document.getElementById("addBtn").addEventListener("click", function () {
  if (docID === undefined) {
    saveNote();
  }
  else {
    updatenote();
  }
})


function getNoteDoc(docId) {
  db.collection("user").doc(uid).collection("notes").doc(docId).get().then((val) => {
    console.log(val.data());
    titleField.value = val.data().title;
    dataField.value = val.data().data;
  });
}

var timestamp = firebase.firestore.timestamp;
let currentDate = new Date(timestamp);

// const monthNames = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

// let Day = currentDate.getDate();
// let Month = currentDate.getMonth() + 1;
// let Year = currentDate.getFullYear();



// var creationdate = Day + "-" + monthNames[currentDate.getMonth()] + "-" + Year;




function updatenote() {

  console.log("update called");
  const title = titleField.value;
  const data = dataField.value;

  console.log(docID);
  console.log(uid);

  const obj = {
    title: title,
    data: data,
    date: new Date()
  }
  db.collection("user").doc(uid).collection("notes").doc(docID).set(obj).then((docRef) => {
    window.location.replace("save.html");
  })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

}


function deletenote(){
  db.collection("user").doc(uid).collection("notes").doc(docID).delete().then(() => {
    console.log("Document successfully deleted!");
    window.location.replace("save.html");


}).catch((error) => {
    console.error("Error removing document: ", error);
});
}




