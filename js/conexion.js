//Initialize Firebase
var config = {
    apiKey: "AIzaSyCrrASgB21Xwu1HKPkEMxyJRtSsrgGyr1g",
    authDomain: "myleague-5a9c8.firebaseapp.com",
    databaseURL: "https://myleague-5a9c8.firebaseio.com",
    projectId: "myleague-5a9c8",
    storageBucket: "",
    messagingSenderId: "167455229801"
  };

  firebase.initializeApp(config);

  var app = document.getElementById('app');

  var dbRef = firebase.database();

  var message = dbRef.ref('message');

  message.once('value').then((snap) => {
      app.innerText = snap.val();
  });