

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();


function registrarEquipo() {
    var nomEquipo = document.getElementById('nomEquipo').value;
    var nomCategoria = document.getElementById('nomCategoria').value;
    var nomRama = document.getElementById('nomRama').value;
    var nomEntrenador = document.getElementById('nomEntrenador').value;
    var nomAsistente = document.getElementById('nomAsistente').value;
    var desc = document.getElementById('descripcion').value;
    var imgEquipo = ($('#foto'))[0].files[0];
    var downloadURL;

    var storageRef = storage.ref('equipos/' + imgEquipo.name);
    storageRef.put(imgEquipo).then((data) => {
        console.log("then");
        console.log(data);
        storage.ref('equipos/' + imgEquipo.name).getDownloadURL().then((url) => {
            console.log("url");
            console.log(url);
            downloadURL = url;
            console.log("downloadURL");
            console.log(downloadURL);

            db.collection("equipos").add({
                nombreEquipo: nomEquipo,
                nombreCategoria: nomCategoria,
                nombreRama: nomRama,
                nombreEntrenador: nomEntrenador,
                nombreAsistente: nomAsistente,
                idEquipo: Date.now(),
                descripcion: desc,
                foto: downloadURL
            }).then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                document.getElementById('nomEquipo').value = '';
                document.getElementById('nomCategoria').value = '';
                document.getElementById('nomRama').value = '';
                document.getElementById('nomEntrenador').value = '';
                document.getElementById('nomAsistente').value = '';
                document.getElementById('descripcion').value = '';
                document.getElementById('foto').value = null;
                //window.location = "../index.html";
            })
                .catch(function (error) {
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

function leerEquipos() {
    console.log('entro');
    var tabla = document.getElementById('tabla');
    tabla.innerHTML = '';
    db.collection("equipos").onSnapshot((querySnapshot) => {
        tabla.innerHTML = '';
        querySnapshot.forEach((doc) => {
            console.log(doc);
            tabla.innerHTML += `
            <tr>
                <td>${doc.data().nombreEquipo}</td>
                <td>${doc.data().nombreCategoria}</td>
                <td>${doc.data().nombreRama}</td>
                <td>${doc.data().nombreEntrenador}</td>
                <td>${doc.data().nombreAsistente}</td>
                <td>${doc.data().descripcion}</td>
                <td><img height="70" width="70" src="${doc.data().foto}"></td>
                <td><i class="fas fa-sync-alt"  data-toggle="modal" data-target=".bd-example-modal-lg" onclick="actualizarEquipo('${doc.id}','${doc.data().nombreEquipo}',
                '${doc.data().nombreCategoria}','${doc.data().nombreRama}','${doc.data().nombreEntrenador}','${doc.data().nombreAsistente}','${doc.data().descripcion}')"></i></td>
                <td><i class="fas fa-trash-alt" onclick="eliminarEquipo('${doc.id}')"></i></td>
            </tr>`;
        });
    });
}

leerEquipos();

function eliminarEquipo(idEquipo) {
    db.collection("equipos").doc(idEquipo).delete().then(function () {
        console.log("Document successfuly deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

function actualizarEquipo(id, nombreEquipo, nombreCategoria, nombreRama, nombreEntrenador, nombreAsistente, descripcion) {
    console.log('entro');
    document.getElementById('nomEquipo').value = nombreEquipo;
    document.getElementById('nomCategoria').value = nombreCategoria;
    document.getElementById('nomRama').value = nombreRama;
    document.getElementById('nomEntrenador').value = nombreEntrenador;
    document.getElementById('nomAsistente').value = nombreAsistente;
    document.getElementById('descripcion').value = descripcion;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';
    boton.onclick = function () {
        var washingtonRef = db.collection("equipos").doc(id);
        var nomEquipo = document.getElementById('nomEquipo').value;
        var nomCategoria = document.getElementById('nomCategoria').value;
        var nomRama = document.getElementById('nomRama').value;
        var nomEntrenador = document.getElementById('nomEntrenador').value;
        var nomAsistente = document.getElementById('nomAsistente').value;
        var desc = document.getElementById('descripcion').value;
        var imgEquipo = ($('#foto'))[0].files[0];
        if (imgEquipo != null) {
            var downloadURL;
            var storageRef = storage.ref('equipo/' + imgEquipo.name);
            storageRef.put(imgEquipo).then((data) => {
                console.log("then");
                console.log(data);
                storage.ref('equipo/' + imgEquipo.name).getDownloadURL().then((url) => {
                    console.log("url");
                    console.log(url);
                    downloadURL = url;
                    console.log("downloadURL");
                    console.log(downloadURL);
                    return washingtonRef.update({
                        nombreEquipo: nomEquipo,
                        nombreCategoria: nomCategoria,
                        nombreRama: nomRama,
                        nombreEntrenador: nomEntrenador,
                        nombreAsistente: nomAsistente,
                        descripcion: desc,
                        foto: downloadURL
                    }).then(function () {
                        console.log("Document successfully updated!");
                        document.getElementById('nombreEquipo').value = '';
                        document.getElementById('nombreCategoria').value = '';
                        document.getElementById('nombreRama').value = '';
                        document.getElementById('nombreEntrenador').value = '';
                        document.getElementById('nombreAsistente').value = '';
                        document.getElementById('descripcion').value = '';
                        document.getElementById('foto').value = null;
                        boton.innerHTML = 'Guardar';
                    }).catch(function (error) {
                        console.error("Error updating document: ", error);
                    });
                }).catch((error) => {
                    console.log("error");
                    console.log(error);
                });
            });
        } else {
            return washingtonRef.update({
                nombreEquipo: nomEquipo,
                nombreCategoria: nomCategoria,
                nombreRama: nomRama,
                nombreEntrenador: nomEntrenador,
                nombreAsistente: nomAsistente,
                desc: descripcion
            }).then(function () {
                console.log("Document succesfully updated!");
                document.getElementById('nombreEquipo').value = '';
                document.getElementById('nombreCategoria').value = '';
                document.getElementById('nombreRama').value = '';
                document.getElementById('nombreEntrenador').value = '';
                document.getElementById('nombreAsistente').value = '';
                document.getElementById('descripcion').value = '';
                document.getElementById('foto').value = null;
                boton.innerHTML = 'Guardar';
                window.location = "RegistroArbitros.html";
            }).catch(function (error) {
                console.error("Error updating document: ", error);
            })
        }
    }
}



