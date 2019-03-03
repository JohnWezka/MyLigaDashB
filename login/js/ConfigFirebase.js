<<<<<<< HEAD
//llave de configuracion de firebase
const varConfig = {
    apiKey: "AIzaSyDu92rdtAJ-mOjDF2IoMua6gM5S_1RaMMU",
    authDomain: "myleague-a4d04.firebaseapp.com",
    databaseURL: "https://myleague-a4d04.firebaseio.com",
    projectId: "myleague-a4d04",
    storageBucket: "myleague-a4d04.appspot.com",
    messagingSenderId: "468908962623"
};
firebase.initializeApp(varConfig);
/*const db = firebase.firestore();
const storage = firebase.storage();*/

function registrar() {
    var email = document.getElementById('emailr').value;
    var password = document.getElementById('passwordr').value;
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
    firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
        location.href = "../pages/crear-Liga.html";
        alert("Bienvenido");
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert("Correo o contraseña incorrectos");
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
        location.href = "redi.html";
    }).catch(function(error) {
        // An error happened.
        console.log('error al enviar correo');
        console.log(error);
    });
}

function Enviarcorreo_rest() {
    var auth = firebase.auth();
    var email = document.getElementById('email').value;
    auth.sendPasswordResetEmail(email).then(function() {
        location.href = "redi.html";
    }).catch(function(error) {
        // An error happened.
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
            location.href = "../login/index.html";
            console.log("No existe usuario")
        }
    });
}

observador();
/*
function datosPersonales() {
    var nombres = document.getElementById('nom').value;
    var appma = document.getElementById('appma').value;
    var apppa = document.getElementById('apppa').value;
    var dicc = document.getElementById('dicc').value;
    var telefono = document.getElementById('tel').value;
    var photo = ($('#foto'))[0].files[0];
    var downloadURL;

    var storageRef = storage.ref('datosAdministrador/' + img.name);
    storageRef.put(photo).then((data) => {
        storage.ref('datosAdministrador/' + photo.name).getDownloadURL().then((url) => {
            downloadURL = url;

            db.collection("datosAdministrador").add({
                nombreLiga: nombres,
                apellidoMaterno: appma,
                apellidoPaterno: apppa,
                direccion: dicc,
                telefono: telefono,
                foto: downloadURL

            }).then(function(docRef) {
                var washingtonRef = db.collection("datosAdministrador").doc(docRef.id);
                return washingtonRef.update({
                    id: docRef.id
                }).then(function() {
                    alert("Perfil Completo");
                    location.href = "../pages/crear-Liga.html"
                    document.getElementById('nom').value = '';
                    document.getElementById('appma').value = '';
                    document.getElementById('apppa').value = '';
                    document.getElementById('dicc').value = '';
                    document.getElementById('tel').value = '';
                }).catch(function(error) {
                    console.error("Error updating document: ", error);
                });
            }).catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }).catch((error) => {
            console.log("url error");
            console.log(error);
        });
    }).catch((error) => {
        console.log("error");
        console.error(error);
    });
}*/
=======
  //llave de configuracion de firebase
  /*const varConfig = {
      apiKey: "AIzaSyDu92rdtAJ-mOjDF2IoMua6gM5S_1RaMMU",
      authDomain: "myleague-a4d04.firebaseapp.com",
      databaseURL: "https://myleague-a4d04.firebaseio.com",
      projectId: "myleague-a4d04",
      storageBucket: "myleague-a4d04.appspot.com",
      messagingSenderId: "468908962623"
  };

  firebase.initializeApp(varConfig);
  /*var db = firebase.firestore();
  var storage = firebase.storage();*/

  function registrar() {
      var email = document.getElementById('emailr').value;
      var password = document.getElementById('passwordr').value;
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
      firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
          location.href = "../pages/crear-Liga.html";
          alert("Bienvenido");
      }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          alert("Correo o contraseña incorrectos");
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
          location.href = "redi.html";
      }).catch(function(error) {
          // An error happened.
          console.log('error al enviar correo');
          console.log(error);
      });
  }

  function Enviarcorreo_rest() {
      var auth = firebase.auth();
      var email = document.getElementById('email').value;
      auth.sendPasswordResetEmail(email).then(function() {
          location.href = "redi.html";
      }).catch(function(error) {
          // An error happened.
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
              location.href = "../login/index.html";
              console.log("No existe usuario")
          }
      });
  }

  observador();

  function datosPersonales() {
      var nombres = document.getElementById('nom').value;
      var appma = document.getElementById('appma').value;
      var apppa = document.getElementById('apppa').value;
      var dicc = document.getElementById('dicc').value;
      var telefono = document.getElementById('tel').value;
      var photo = ($('foto'))[0].files[0];
      var downloadURL;

      var storageRef = storage.ref('datosAdministrador/' + img.name);
      storageRef.put(photo).then((data) => {
          storage.ref('datosAdministrador/' + photo.name).getDownloadURL().then((url) => {
              downloadURL = url;

              db.collection("datosAdministrador").add({
                  nombreLiga: nombres,
                  apellidoMaterno: appma,
                  apellidoPaterno: apppa,
                  direccion: dicc,
                  telefono: telefono,
                  foto: downloadURL

              }).then(function(docRef) {
                  var washingtonRef = db.collection("datosAdministrador").doc(docRef.id);
                  return washingtonRef.update({
                      id: docRef.id
                  }).then(function() {
                      alert("Perfil Completo");
                      location.href = "../pages/crear-Liga.html"
                      document.getElementById('nom').value = '';
                      document.getElementById('appma').value = '';
                      document.getElementById('apppa').value = '';
                      document.getElementById('dicc').value = '';
                      document.getElementById('tel').value = '';
                  }).catch(function(error) {
                      console.error("Error updating document: ", error);
                  });
              }).catch(function(error) {
                  console.error("Error adding document: ", error);
              });
          }).catch((error) => {
              console.log("url error");
              console.log(error);
          });
      }).catch((error) => {
          console.log("error");
          console.error(error);
      });
  }
>>>>>>> eec54ca69cbdc195c2fa77fef689552995d90d6a
