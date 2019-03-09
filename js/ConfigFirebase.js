var db = firebase.firestore();

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
        var user = firebase.auth().currentUser;
        if (user.emailVerified != true) {
            alert("Por favor verique su correo electronico");
        } else {
            var docRef = db.collection("admin").doc(user.uid);

            docRef.get().then(function(doc) {
                if (doc.exists) {
                    alert("Bienvenido");
                    location.href = "../index.html";
                } else {
                    alert("Necesitamos saber un poco más de usted: ");
                    location.href = "../login/datos_personales.html";
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }
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