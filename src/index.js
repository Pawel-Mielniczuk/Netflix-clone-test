var firebase = require('firebase/app');
var firebaseAuth = require('firebase/auth');

var app = firebase.initializeApp({
  apiKey: "AIzaSyCQ3DyRCszDOBFNA5eD_1juUz1BF2yVU-M",
  authDomain: "netflix-clone-dd491.firebaseapp.com",
  databaseURL: "https://netflix-clone-dd491.firebaseio.com",
  projectId: "netflix-clone-dd491",
  appId: "1:598474789893:web:d257106d24056e2c2e386c"
});

const auth = firebase.auth()

function redirect(path) {
  var baseURL = window.location.protocol + '//' + window.location.host;
  var hasSlash = path.charAt(0) == '/';

  if (path == '/') {
    path = baseURL;
  }

  if (!hasSlash) {
    path = '/' + path;
  }

  var onThisPage = (window.location.href.indexOf(baseURL + path) > -1);

  if (!onThisPage) {
    //redirect them to login page for message
    location = path;
  }
}

// console.log(firebase.auth.Auth.Persistence.SESSION);

auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user log in', user)
  } else {
    console.log('user log out')
  }
})

// var firebaseConfig = {
// apiKey: "AIzaSyCQ3DyRCszDOBFNA5eD_1juUz1BF2yVU-M",
// authDomain: "netflix-clone-dd491.firebaseapp.com",
// databaseURL: "https://netflix-clone-dd491.firebaseio.com",
// projectId: "netflix-clone-dd491",
// appId: "1:598474789893:web:d257106d24056e2c2e386c"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

//make auth and firestore references
// const auth = firebase.auth();
// const db = firebase.firestore();


export { auth, firebaseAuth }