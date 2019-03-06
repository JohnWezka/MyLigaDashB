

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

function registrarEquipo(idLiga) {
    var contenedor = document.getElementById('contCarga');
    contenedor.style.visibility = 'visible';
    contenedor.style.opacity = '100';
    var nomEquipo = document.getElementById('nomEquipo').value;
    var nomCategoria = document.getElementById('nomCategoria').value;
    var nomRama = document.getElementById('nomRama').value;
    var nomEntrenador = document.getElementById('nomEntrenador').value;
    var nomAsistente = document.getElementById('nomAsistente').value;
    var desc = document.getElementById('descripcion').value;
    var imgEquipo = ($('#foto'))[0].files[0];
    var downloadURL;
    db.collection("equipos").where("nombreEquipo", "==", nomEquipo).get().then(function (querySnapshot) {
        console.log(querySnapshot.empty);
        if (!querySnapshot.empty) {
                if ("nombreCategoria" === nomCategoria){
                    alert('Ese nombre de ya existe');
                var contenedor = document.getElementById('contCarga');
                contenedor.style.visibility = 'hidden';
                contenedor.style.opacity = '0';
                break;
                }else{
                    
            var storageRef = storage.ref('equipos/' + imgEquipo.name);
            storageRef.put(imgEquipo).then((data) => {
                storage.ref('equipos/' + imgEquipo.name).getDownloadURL().then((url) => {
                    downloadURL = url;
                    db.collection("equipos").add({
                        nombreEquipo: nomEquipo,
                        nombreCategoria: nomCategoria,
                        nombreRama: nomRama,
                        idLiga: idLiga,
                        nombreEntrenador: nomEntrenador,
                        nombreAsistente: nomAsistente,
                        descripcion: desc,
                        foto: downloadURL
                    }).then(function (docRef) {
                        var washingtonRef = db.collection("equipos").doc(docRef.id);
                        return washingtonRef.update({
                            idEquipo: docRef.id
                        }).then(function () {
                            console.log("Document successfully updated!");
                            document.getElementById('nomEquipo').value = '';
                            document.getElementById('nomCategoria').value = '';
                            document.getElementById('nomRama').value = '';
                            document.getElementById('nomEntrenador').value = '';
                            document.getElementById('nomAsistente').value = '';
                            document.getElementById('descripcion').value = '';
                            document.getElementById('foto').value = null;
                            var contenedor = document.getElementById('contCarga');
                            contenedor.style.visibility = 'hidden';
                            contenedor.style.opacity = '0';
                        }).catch(function (error) {
                            console.error("Error updating document: ", error);
                            var contenedor = document.getElementById('contCarga');
                            contenedor.style.visibility = 'hidden';
                            contenedor.style.opacity = '0';
                        });
                    }).catch(function (error) {
                        console.error("Error adding document: ", error);
                        var contenedor = document.getElementById('contCarga');
                        contenedor.style.visibility = 'hidden';
                        contenedor.style.opacity = '0';
                    });
                }).catch((error) => {
                    console.log("url error");
                    console.log(error);
                    var contenedor = document.getElementById('contCarga');
                    contenedor.style.visibility = 'hidden';
                    contenedor.style.opacity = '0';
                });
            }).catch((error) => {
                console.log("error");
                console.log(error);
                var contenedor = document.getElementById('contCarga');
                contenedor.style.visibility = 'hidden';
                contenedor.style.opacity = '0';
            });
                }
            
            } else {
                
            var storageRef = storage.ref('equipos/' + imgEquipo.name);
            storageRef.put(imgEquipo).then((data) => {
                storage.ref('equipos/' + imgEquipo.name).getDownloadURL().then((url) => {
                    downloadURL = url;
                    db.collection("equipos").add({
                        nombreEquipo: nomEquipo,
                        nombreCategoria: nomCategoria,
                        nombreRama: nomRama,
                        idLiga: idLiga,
                        nombreEntrenador: nomEntrenador,
                        nombreAsistente: nomAsistente,
                        descripcion: desc,
                        foto: downloadURL
                    }).then(function (docRef) {
                        var washingtonRef = db.collection("equipos").doc(docRef.id);
                        return washingtonRef.update({
                            idEquipo: docRef.id
                        }).then(function () {
                            console.log("Document successfully updated!");
                            document.getElementById('nomEquipo').value = '';
                            document.getElementById('nomCategoria').value = '';
                            document.getElementById('nomRama').value = '';
                            document.getElementById('nomEntrenador').value = '';
                            document.getElementById('nomAsistente').value = '';
                            document.getElementById('descripcion').value = '';
                            document.getElementById('foto').value = null;
                            var contenedor = document.getElementById('contCarga');
                            contenedor.style.visibility = 'hidden';
                            contenedor.style.opacity = '0';
                        }).catch(function (error) {
                            console.error("Error updating document: ", error);
                            var contenedor = document.getElementById('contCarga');
                            contenedor.style.visibility = 'hidden';
                            contenedor.style.opacity = '0';
                        });
                    }).catch(function (error) {
                        console.error("Error adding document: ", error);
                        var contenedor = document.getElementById('contCarga');
                        contenedor.style.visibility = 'hidden';
                        contenedor.style.opacity = '0';
                    });
                }).catch((error) => {
                    console.log("url error");
                    console.log(error);
                    var contenedor = document.getElementById('contCarga');
                    contenedor.style.visibility = 'hidden';
                    contenedor.style.opacity = '0';
                });
            }).catch((error) => {
                console.log("error");
                console.log(error);
                var contenedor = document.getElementById('contCarga');
                contenedor.style.visibility = 'hidden';
                contenedor.style.opacity = '0';
            });
        }
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
        var contenedor = document.getElementById('contCarga');
        contenedor.style.visibility = 'hidden';
        contenedor.style.opacity = '0';
    });


}

function leerEquipos() {
    console.log('entro');
    var tabla = document.getElementById('tabla');
    tabla.innerHTML = '';
    db.collection("equipos").onSnapshot((querySnapshot) => {
        tabla.innerHTML = '';
        querySnapshot.forEach((doc) => {
            tabla.innerHTML += `
            <tr>
                <td>${doc.data().nombreEquipo}</td>
                <td>${doc.data().nombreCategoria}</td>
                <td>${doc.data().nombreRama}</td>
                <td>${doc.data().nombreEntrenador}</td>
                <td>${doc.data().nombreAsistente}</td>
                <td>${doc.data().descripcion}</td>
                <td><img height="70" width="70" src="${doc.data().foto}"></td>
                <td class="center"><i class="fas fa-sync-alt modal-trigger deep-purple-text text-accent-4"
                href="#modal1" onclick="actualizarEquipo('${doc.id}','${doc.data().nombreEquipo}',
                '${doc.data().nombreCategoria}','${doc.data().nombreRama}','${doc.data().nombreEntrenador}','${doc.data().nombreAsistente}','${doc.data().descripcion}')"></i></td>
                <td class="center"><i class="fas fa-trash-alt" onclick="eliminarEquipo('${doc.id}')"></i></td>
            </tr>`;
        });
        var contenedor = document.getElementById('contCarga');
        contenedor.style.visibility = 'hidden';
        contenedor.style.opacity = '0';
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
    var contenedor = document.getElementById('contCarga');
    contenedor.style.visibility = 'visible';
    contenedor.style.opacity = '100';
    document.getElementById('nomEquipo').value = nombreEquipo;
    document.getElementById('nomCategoria').value = nombreCategoria;
    document.getElementById('nomRama').value = nombreRama;
    document.getElementById('nomEntrenador').value = nombreEntrenador;
    document.getElementById('nomAsistente').value = nombreAsistente;
    document.getElementById('descripcion').value = descripcion;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';
    var contenedor = document.getElementById('contCarga');
    contenedor.style.visibility = 'hidden';
    contenedor.style.opacity = '0';
    boton.onclick = function () {
        var washingtonRef = db.collection("equipos").doc(id);
        var nomEquipo = document.getElementById('nomEquipo').value;
        var nomCategoria = document.getElementById('nomCategoria').value;
        var nomRama = document.getElementById('nomRama').value;
        var nomEntrenador = document.getElementById('nomEntrenador').value;
        var nomAsistente = document.getElementById('nomAsistente').value;
        var descripcion = document.getElementById('descripcion').value;
        var imgEquipo = ($('#foto'))[0].files[0];
        if (imgEquipo != null) {
            var downloadURL;
            var storageRef = storage.ref('equipo/' + imgEquipo.name);
            storageRef.put(imgEquipo).then((data) => {
                storage.ref('equipo/' + imgEquipo.name).getDownloadURL().then((url) => {
                    downloadURL = url;
                    return washingtonRef.update({
                        nombreEquipo: nomEquipo,
                        nombreCategoria: nomCategoria,
                        nombreRama: nomRama,
                        nombreEntrenador: nomEntrenador,
                        nombreAsistente: nomAsistente,
                        descripcion: descripcion,
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
                        var contenedor = document.getElementById('contCarga');
                        contenedor.style.visibility = 'hidden';
                        contenedor.style.opacity = '0';
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
                var contenedor = document.getElementById('contCarga');
                contenedor.style.visibility = 'hidden';
                contenedor.style.opacity = '0';
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


