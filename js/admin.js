// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();
// Current user
var uid;

function observador() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            uid = user.uid;
            console.log("Existe usuario");
            console.log(user);
        } else {
            console.log("No existe usuario");
            console.log(user);
        }
    });
}
observador();

function registrarAdmin() {
    var nombres = document.getElementById('nom').value;
    var appma = document.getElementById('appma').value;
    var apppa = document.getElementById('apppa').value;
    var dicc = document.getElementById('dicc').value;
    var telefono = document.getElementById('tel').value;
    var photo = ($('#foto'))[0].files[0];
    var downloadURL;
    var storageRef = storage.ref('admin/' + photo.name);
    storageRef.put(photo).then((data) => {
        storage.ref('admin/' + photo.name).getDownloadURL().then((url) => {
            downloadURL = url;
            db.collection("admin").doc(uid).set({
                nombre: nombres,
                apellidoMaterno: appma,
                apellidoPaterno: apppa,
                direccion: dicc,
                telefono: telefono,
                foto: downloadURL,
                userID: uid
            }).then(function() {
                alert("Perfil Completo");
                location.href = "../pages/crear-liga.html";
                document.getElementById('nom').value = '';
                document.getElementById('appma').value = '';
                document.getElementById('apppa').value = '';
                document.getElementById('dicc').value = '';
                document.getElementById('tel').value = '';
            }).catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        }).catch((error) => {
            console.log("url error");
            console.log(error);
        });

    }).catch((error) => {
        console.log("error");
        console.log(error);
    });
}