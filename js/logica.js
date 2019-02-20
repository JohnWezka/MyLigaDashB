function head(){
    return '<meta charset="utf-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> \n\
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> \n\
    <meta name="description" content=""> \n\
    <meta name="author" content=""> \n\
    <title>SB Admin - Dashboard</title> \n\
    <!-- Custom fonts for this template--> \n\
    <link href="../vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"> \n\
    <!-- Page level plugin CSS--> \n\
    <link href="../vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet"> \n\
    <!-- Custom styles for this template--> \n\
    <link href="../css/sb-admin.css" rel="stylesheet"></link>';
}

function registrar() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    console.log(email);
    console.log(password);

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
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