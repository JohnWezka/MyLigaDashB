//llave de configuracion de firebase
/*const varConfig = {
    apiKey: "AIzaSyDu92rdtAJ-mOjDF2IoMua6gM5S_1RaMMU",
    authDomain: "myleague-a4d04.firebaseapp.com",
    databaseURL: "https://myleague-a4d04.firebaseio.com",
    projectId: "myleague-a4d04",
    storageBucket: "myleague-a4d04.appspot.com",
    messagingSenderId: "468908962623"
};
firebase.initializeApp(varConfig);*/
var db = firebase.firestore();
/*const db = firebase.firestore();
const storage = firebase.storage();*/
var contenedor = document.getElementById('contCarga');
          
function registrar() {
    contenedor.style.visibility = 'visible';
    contenedor.style.opacity = '100';
    var email = document.getElementById('emailr').value;
    var password = document.getElementById('passwordr').value;
    console.log(email);
    console.log(password);
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        contenedor.style.visibility = 'hidden';
          contenedor.style.opacity = '0';
        verificar();
    }).catch(function(error) {
        // Handle Errors here.
        contenedor.style.visibility = 'hidden';
          contenedor.style.opacity = '0';
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });
}

function acceder() {
    var contenedor = document.getElementById('contCarga');
    console.log(contenedor);
    contenedor.style.visibility = 'visible';
    contenedor.style.opacity = '100';
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
        var user = firebase.auth().currentUser;
        if (user.emailVerified != true) {
            alert("Por favor verique su correo electronico");
        } else {
            console.log('jasnck');
        }
        contenedor.style.visibility = 'hidden';
          contenedor.style.opacity = '0';
    }).catch(function(error) {
        // Handle Errors here.
        contenedor.style.visibility = 'hidden';
          contenedor.style.opacity = '0';
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert("Correo o contraseña incorrectos");
        // ...
    });
}

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
        location.href = "../redi.html";
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
            //location.href = "../login/index.html";
            console.log("No existe usuario")
        }
    });
}
observador();