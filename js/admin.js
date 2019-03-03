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
            db.collection("admin").add({
                nombreLiga: nombres,
                apellidoMaterno: appma,
                apellidoPaterno: apppa,
                direccion: dicc,
                telefono: telefono,
                foto: downloadURL,
                userID: uid
            }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                var washingtonRef = db.collection("admin").doc(docRef.id);
                return washingtonRef.update({
                    id: docRef.id
                }).then(function() {
                    alert("Perfil Completo");
                    document.getElementById('nom').value = '';
                    document.getElementById('appma').value = '';
                    document.getElementById('apppa').value = '';
                    document.getElementById('dicc').value = '';
                    document.getElementById('tel').value = '';
                    //window.location = "../index.html";
                }).catch(function(error) {
                    // The document probably doesn't exist.
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
        console.log(error);
    });
}

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