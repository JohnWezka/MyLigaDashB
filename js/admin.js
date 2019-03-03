// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

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