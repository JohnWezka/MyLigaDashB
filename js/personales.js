// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

function datosPersonales() {
    var nombres = document.getElementById('nom').value;
    var appma = document.getElementById('appma').value;
    var apppa = document.getElementById('apppa').value;
    var dicc = document.getElementById('dicc').value;
    var telefono = document.getElementById('tel').value;
    var photo = ($('#foto'))[0].files[0];
    var downloadURL;

    var storageRef = storage.ref('admin/' + img.name);
    storageRef.put(photo).then((data) => {
        storage.ref('admin/' + photo.name).getDownloadURL().then((url) => {
            downloadURL = url;

            db.collection("admin").add({
                nombreLiga: nombres,
                apellidoMaterno: appma,
                apellidoPaterno: apppa,
                direccion: dicc,
                telefono: telefono,
                foto: downloadURL

            }).then(function(docRef) {
                var washingtonRef = db.collection("admin").doc(docRef.id);
                return washingtonRef.update({
                    id: docRef.id
                }).then(function() {
                    alert("Perfil Completo");
                    //location.href = "../pages/crear-Liga.html"
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