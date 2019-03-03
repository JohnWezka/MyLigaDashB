

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var storage = firebase.storage();
function crearArbitro() {
    var nombre = document.getElementById('nombreArbitro').value;
    var apaterno = document.getElementById('apaterno').value;
    var amaterno = document.getElementById('amaterno').value;
    var edad = document.getElementById('edad').value;
    var roll = document.getElementById('roll').value;
    var img = ($('#foto'))[0].files[0];
    console.log(img);
    var downloadURL;
    var storageRef = storage.ref('arbitro/' + img.name);
    storageRef.put(img).then((data) => {
        console.log("then");
        console.log(data);
        storage.ref('arbitro/' + img.name).getDownloadURL().then((url) => {
            console.log("url");
            console.log(url);
            downloadURL = url;
            console.log("downloadURL");
            console.log(downloadURL);
            db.collection("arbitro").add({
                nombreArbitro: nombre,
                apellidoPaterno: apaterno,
                apellidoMaterno: amaterno,
                edad: edad,
                roll: roll,
                foto: downloadURL
            }).then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                document.getElementById('nombreArbitro').value = '';
                document.getElementById('apaterno').value = '';
                document.getElementById('amaterno').value = '';
                document.getElementById('edad').value = '';
                document.getElementById('roll').value = '';
                document.getElementById('foto').value = null;
                window.location = "RegistroArbitros.html";
            }).catch(function (error) {
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


(function leerLigas() {
    var tabla_arbitros = document.getElementById('tabla');
    tabla_arbitros.innerHTML = '';
    db.collection("arbitro").onSnapshot((querySnapshot) => {
        tabla_arbitros.innerHTML = '';
        querySnapshot.forEach((doc) => {

            tabla_arbitros.innerHTML += `
        <tr>
          <td>${doc.data().nombreArbitro}</td>
          <td>${doc.data().apellidoPaterno}</td>
          <td>${doc.data().apellidoMaterno}</td>
          <td>${doc.data().edad}</td>
          <td>${doc.data().roll}</td>
            <td><img  height="70" width="70" src=${doc.data().foto}></td>
              <td><h4><i class="fas fa-sync-alt"  data-toggle="modal" data-target=".bd-example-modal-lg" onclick="actualizarArbitro('${doc.id}','${doc.data().nombreArbitro}',
          '${doc.data().apellidoPaterno}','${doc.data().apellidoMaterno}','${doc.data().edad}','${doc.data().roll}','${doc.data().foto}')"></i></h4></td>
          <td><h4><i class="fas fa-trash-alt" onclick="eliminarArbitro('${doc.id}')"></i></h4></td>
        </tr>
        `;
        });
    });
})();

function eliminarArbitro(id) {
    db.collection("arbitro").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

function actualizarArbitro(id, nomArbitro, apaterno, amaterno, edad, roll) {
    document.getElementById('nombreArbitro').value = nomArbitro;
    document.getElementById('apaterno').value = apaterno;
    document.getElementById('amaterno').value = amaterno;
    document.getElementById('edad').value = edad;
    document.getElementById('roll').value = roll;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';
    boton.onclick = function () {
        var washingtonRef = db.collection("arbitro").doc(id);
        var nombre = document.getElementById('nombreArbitro').value;
        var apaterno = document.getElementById('apaterno').value;
        var amaterno = document.getElementById('amaterno').value;
        var edad = document.getElementById('edad').value;
        var roll = document.getElementById('roll').value;
        var img = ($('#foto'))[0].files[0];
        if (img != null) {
            var downloadURL;
            var storageRef = storage.ref('arbitro/' + img.name);
            storageRef.put(img).then((data) => {
                console.log("then");
                console.log(data);
                storage.ref('arbitro/' + img.name).getDownloadURL().then((url) => {
                    console.log("url");
                    console.log(url);
                    downloadURL = url;
                    console.log("downloadURL");
                    console.log(downloadURL);
                    return washingtonRef.update({
                        nombreArbitro: nombre,
                        apellidoPaterno: apaterno,
                        apellidoMaterno: amaterno,
                        edad: edad,
                        roll: roll,
                        foto: downloadURL
                    }).then(function () {
                        console.log("Document successfully updated!");
                        document.getElementById('nombreArbitro').value = '';
                        document.getElementById('apaterno').value = '';
                        document.getElementById('amaterno').value = '';
                        document.getElementById('edad').value = '';
                        document.getElementById('roll').value = '';
                          document.getElementById('foto').value = null;
                        boton.innerHTML = 'Guardar';
                    }).catch(function (error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
                }).catch((error) => {
                    console.log("error");
                    console.log(error);
                });
            });

        } else {
            return washingtonRef.update({
                nombreArbitro: nombre,
                apellidoPaterno: apaterno,
                apellidoMaterno: amaterno,
                edad: edad,
                roll: roll
            }).then(function () {
                console.log("Document successfully updated!");
                document.getElementById('nombreArbitro').value = '';
                document.getElementById('apaterno').value = '';
                document.getElementById('amaterno').value = '';
                document.getElementById('edad').value = '';
                document.getElementById('roll').value = '';
                document.getElementById('foto').value =null;
                boton.innerHTML = 'Guardar';
                window.location = "RegistroArbitros.html";
            }).catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        }
    }
}
        