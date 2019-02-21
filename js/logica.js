firebase.initializeApp({
  apiKey: "AIzaSyCrrASgB21Xwu1HKPkEMxyJRtSsrgGyr1g",
  authDomain: "myleague-5a9c8.firebaseapp.com",
  projectId: "myleague-5a9c8"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

function head() {
  var head = document.getElementById('head');
  head.innerHTML = `<meta charset="utf-8"> 
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>SB Admin - Dashboard</title>
    <!-- Custom fonts for this template-->
    <link href="../vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <!-- Page level plugin CSS-->
    <link href="../vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet"> 
    <!-- Custom styles for this template-->
    <link href="../css/sb-admin.css" rel="stylesheet"></link>`;
}

function script() {
  var script = document.getElementById('script');
  script.innerHTML = `<script src="https://www.gstatic.com/firebasejs/5.8.2/firebase.js"></script>
  <script src="../js/conexion.js"></script>
  <script src = "../js/logica.js"></script>

  <!-- Bootstrap core JavaScript-->
  <script src="../vendor/jquery/jquery.min.js"></script>
  <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

  <!-- Core plugin JavaScript-->
  <script src="../vendor/jquery-easing/jquery.easing.min.js"></script>

  <!-- Page level plugin JavaScript-->
  <script src="../vendor/chart.js/Chart.min.js"></script>
  <script src="../vendor/datatables/jquery.dataTables.js"></script>
  <script src="../vendor/datatables/dataTables.bootstrap4.js"></script>

  <!-- Custom scripts for all pages-->
  <script src="../js/sb-admin.min.js"></script>

  <!-- Demo scripts for this page-->
  <script src="../js/demo/datatables-demo.js"></script>
  <script src="../js/demo/chart-area-demo.js"></script>`;
}

function registrar() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  console.log(email);
  console.log(password);

  firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
    verificar();
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
}

function acceder() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
}

function observador() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log("Existe usuario")

      // ...
    } else {
      // User is signed out.
      // ...
      console.log("No existe usuario")
    }
  });
}

observador();

function logout() {
  firebase.auth().signOut().then(() => {
    console.log('saliendo');
  }).catch((error) => {
    console.log(error);
  });
}

function verificar() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then(function () {
    // Email sent.
    console.log('enviando correo');
  }).catch(function (error) {
    // An error happened.
    console.log('error al enviar correo');
    console.log(error);
  });
}

function storage() {

}

function crearLiga() {
  var nomLiga = document.getElementById('nomLiga').value;
  var nomDueno = document.getElementById('nomDueno').value;
  var desc = document.getElementById('descripcion').value;
  db.collection("ligas").add({
    nombreLiga: nomLiga,
    nombreDueno: nomDueno,
    descripcion: desc
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

function leerLigas() {
  var tabla = document.getElementById('tabla');
  tabla.innerHTML = '';
  db.collection("ligas").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
      
      tabla.innerHTML += `
        <tr>
          <th scope="row">${doc.id}</th>
          <td>${doc.data().nombreLiga}</td>
          <td>${doc.data().nombreDueno}</td>
          <td>${doc.data().descripcion}</td>
          <td><button class="btn btn-warning" id="boton" onclick="editarLiga('${doc.id}')">Editar</button></td>
          <td><button class="btn btn-danger" id="boton" onclick="eliminarLiga('${doc.id}')">Eliminar</button></td>
        </tr>
        `;
    });
  });
}

leerLigas();

function editarLiga(id) {

}

function eliminarLiga(id) {
  db.collection("ligas").doc(id).delete().then(function () {
    console.log("Document successfully deleted!");
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}