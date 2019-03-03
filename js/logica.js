/*firebase.initializeApp({
  apiKey: "AIzaSyCrrASgB21Xwu1HKPkEMxyJRtSsrgGyr1g",
  authDomain: "myleague-5a9c8.firebaseapp.com",
  databaseURL: "https://myleague-5a9c8.firebaseio.com",
  projectId: "myleague-5a9c8",
  storageBucket: 'gs://myleague-5a9c8.appspot.com/',
  messagingSenderId: "167455229801"
});*/

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

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

function registrar() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    console.log(email);
    console.log(password);

    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        verificar();
    }).catch(function(error) {
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
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });
}

function observador() {
    firebase.auth().onAuthStateChanged(function(user) {
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
    user.sendEmailVerification().then(function() {
        // Email sent.
        console.log('enviando correo');
    }).catch(function(error) {
        // An error happened.
        console.log('error al enviar correo');
        console.log(error);
    });
}

function crearLiga() {
    var nomLiga = document.getElementById('nomLiga').value;
    var nomDueno = document.getElementById('nomDueno').value;
    var desc = document.getElementById('descripcion').value;
    var img = ($('#foto'))[0].files[0];
    var downloadURL;

    var storageRef = storage.ref('ligas/' + img.name);
    storageRef.put(img).then((data) => {
        console.log("then");
        console.log(data);
        storage.ref('ligas/' + img.name).getDownloadURL().then((url) => {
            console.log("url");
            console.log(url);
            downloadURL = url;
            console.log("downloadURL");
            console.log(downloadURL);

            db.collection("ligas").add({
                    nombreLiga: nomLiga,
                    nombreDueno: nomDueno,
                    descripcion: desc,
                    foto: downloadURL
                }).then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                    var washingtonRef = db.collection("ligas").doc(docRef.id);
                    return washingtonRef.update({
                            id: docRef.id
                        })
                        .then(function() {
                            console.log("Document successfully updated!");
                            document.getElementById('nomLiga').value = '';
                            document.getElementById('nomDueno').value = '';
                            document.getElementById('descripcion').value = '';
                            //window.location = "../index.html";
                        })
                        .catch(function(error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });

                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
        }).catch((error) => {
            console.log("url error");
            console.log(error);
        });

    }).catch((error) => {
        console.log("error");
        console.log(error);
    });
    /*.catch((error) => {
      console.log("error");
      console.log(error);
    });*/
    /*uploadTask.on('state_changed', (snapshot) => {
        console.log("snapshot:");
        console.log(snapshot);
        
      },function(error){
        console.log("error storage");
        console.log(error);
      }, function(){
        downloadURL = uploadTask.snapshot.downloadURL;
      });*/
}

function leerLigas() {
    var tabla = document.getElementById('tabla');
    console.log(tabla);
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
          <td><button class="btn btn-warning" id="boton" onclick="actualizarLiga('${doc.id}','${doc.data().nombreLiga}',
          '${doc.data().nombreDueno}','${doc.data().descripcion}','${doc.data().foto}')">Editar</button></td>
          <td><button class="btn red accent-4" id="boton" onclick="eliminarLiga('${doc.id}')">Eliminar</button></td>
        </tr>
        `;
        });
    });
}

leerLigas();

function eliminarLiga(id) {
    db.collection("ligas").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

function actualizarLiga(id, nomLiga, nomDueno, desc, foto) {

    document.getElementById('nomLiga').value = nomLiga;
    document.getElementById('nomDueno').value = nomDueno;
    document.getElementById('descripcion').value = desc;
    document.getElementById('foto').value = foto;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function() {
        var washingtonRef = db.collection("ligas").doc(id);

        var nomLiga = document.getElementById('nomLiga').value;
        var nomDueno = document.getElementById('nomDueno').value;
        var desc = document.getElementById('descripcion').value;

        return washingtonRef.update({
                nombreLiga: nomLiga,
                nombreDueno: nomDueno,
                descripcion: desc
            })
            .then(function() {
                console.log("Document successfully updated!");
                document.getElementById('nomLiga').value = '';
                document.getElementById('nomDueno').value = '';
                document.getElementById('descripcion').value = '';
                boton.innerHTML = 'Guardar';
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
}