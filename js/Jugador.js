// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var storage = firebase.storage();

var idLiga;

(function user() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            idUser = user.uid;
            db.collection("admin").where("userID", "==", user.uid).get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    idLiga = doc.data().idliga;
                    leerJugadores();
                    consultarEquipos();
                    var contenedor = document.getElementById('contCarga');
                    contenedor.style.visibility = 'hidden';
                    contenedor.style.opacity = '0';
                });
            });
        } else {
            var contenedor = document.getElementById('contCarga');
            contenedor.style.visibility = 'hidden';
            contenedor.style.opacity = '0';
            location.href = "../Login/index.html";
        }
    });
})();

function registrarJugador() {

    var nombre = document.getElementById('nomJugador').value;
    var apellidoP = document.getElementById('aPaterno').value;
    var apellidoM = document.getElementById('aMaterno').value;
    var fechaNacimiento = document.getElementById('fechaJuga').value;
    var numero = document.getElementById('numJuga').value;
    var peso = document.getElementById('pesoJuga').value;
    var estatura = document.getElementById('estaJuga').value;
    var curp = document.getElementById('curpJuga').value;
    var equipo = document.getElementById('combo').value;
    var categoria = document.getElementById('cateJuga').value;
    var foto = ($('#foto'))[0].files[0];
    var downloadURL;
    db.collection("jugadores").where("nombre", "==", nombre).where("apellidoP", "==", apellidoP).where("apellidoM", "==", apellidoM)
        .where("numero", "==", numero).get().then(function (querySnapshot) {
            console.log(querySnapshot.empty);
            if (!querySnapshot.empty) {
                console.log('Jugador existente')
            } else {

                var storageRef = storage.ref('jugadores/' + foto.name);
                storageRef.put(foto).then((data) => {
                    console.log("then");
                    console.log(data);
                    storage.ref('jugadores/' + foto.name).getDownloadURL().then((url) => {
                        console.log("url");
                        console.log(url);
                        downloadURL = url;
                        console.log("downloadURL");
                        console.log(downloadURL);

                        db.collection("jugadores").add({
                            idLiga: idLiga,
                            nombre: nombre,
                            apellidoP: apellidoP,
                            apellidoM: apellidoM,
                            fechaNacimiento: fechaNacimiento,
                            numero: numero,
                            peso: peso,
                            estatura: estatura,
                            curp: curp,
                            equipo: equipo,
                            categoria: categoria,
                            foto: downloadURL,
                        }).then(function (docRef) {
                            console.log("Document written with ID: ", docRef.id);
                            var washingtonRef = db.collection("jugadores").doc(docRef.id);
                            return washingtonRef.update({
                                id: docRef.id
                            }).then(function () {
                                console.log("Document successfully update!");
                                document.getElementById('nomJugador').value = '';
                                document.getElementById('aPaterno').value = '';
                                document.getElementById('aMaterno').value = '';
                                document.getElementById('fechaJuga').value = '';
                                document.getElementById('numJuga').value = '';
                                document.getElementById('pesoJuga').value = '';
                                document.getElementById('estaJuga').value = '';
                                document.getElementById('curpJuga').value = '';
                                document.getElementById('aPaterno').value = '';
                                document.getElementById('combo').value = '';
                                document.getElementById('cateJuga').value = '';
                                document.getElementById('foto').value = null;

                                var contenedor = document.getElementById('contCarga');
                                contenedor.style.visibility = 'hidden';
                                contenedor.style.opacity = '0';
                            }).catch(function (error) {
                                console.error("Error updating document: ", error);
                                var contenedor = document.getElementById('contCarga');
                                contenedor.style.visibility = 'hidden';
                                contenedor.style.opacity = '0';
                            })
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
function consultarEquipos() {
    var combo = document.getElementById('combo');
    combo.innerHTML = '';
    db.collection("equipos").where("idLiga", "==", idLiga).onSnapshot(function (querySnapshot) {
        combo.innerHTML = '';
        querySnapshot.forEach((doc) => {
            combo.innerHTML += `
            <option value = "${doc.data().idEquipo}">${doc.data().nombreEquipo} - ${doc.data().nombreCategoria}</option>
            `;
        })
    })
}


function leerJugadores() {
    var table = document.getElementById('table');
    table.innerHTML = '';
    db.collection("jugadores").where("idLiga", "==", idLiga).onSnapshot(function (querySnapshot) {
        table.innerHTML = '';
        querySnapshot.forEach(function (doc) {
            var docRef = db.collection("equipos").doc(doc.data().equipo);
            docRef.get().then(function (doc1) {
                var equipo = doc1.data().nombreEquipo + "\n - " + doc1.data().nombreCategoria;
                table.innerHTML += `
            <tr>
                
                <td>${doc.data().nombre}</td>
                <td>${doc.data().apellidoP}</td>
                <td>${doc.data().apellidoM}</td>
                <td>${doc.data().fechaNacimiento}</>
                <td>${doc.data().numero}</td>
                <td>${doc.data().peso}</td>
                <td>${doc.data().estatura}</td>
                <td>${doc.data().curp}</td>
                <td>${equipo}</td>
                <td>${doc.data().categoria}</>
                <td><img height="70" width="70" src="${doc.data().foto}"</td>
                <td><h4><i class="fas fa-sync-alt modal-trigger deep-purple-text text-accent-4" href="#modal1"
                onclick="editarJugador('${doc.id}','${doc.data().nombre}','${doc.data().apellidoP}','${doc.data().apellidoM}',
                '${doc.data().fechaNacimiento}','${doc.data().numero}','${doc.data().peso}','${doc.data().estatura}','${doc.data().curp}',
                '${doc.data().equipo}','${doc.data().categoria}','${doc.data().foto}')"></i></h4></td>
                <td><h4 class="center" href=""><i class="fas fa-trash-alt red-text text-accent-4" onclick="eliminarJugador('${doc.id}')"></i></h4></td>
            </tr>
            `;
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });


        });
        var contenedor = document.getElementById('contCarga');
        contenedor.style.visibility = 'hidden';
        contenedor.style.opacity = '0';
    });

}

function editarJugador(id, nomJugador, aPaterno, aMaterno, fechaJuga, numJuga, pesoJuga, estaJuga, curpJuga, equipoJuga, categoria) {
    console.log('entro');
    document.getElementById('nomJugador').value = nomJugador;
    document.getElementById('aPaterno').value = aPaterno;
    document.getElementById('aMaterno').value = aMaterno;
    document.getElementById('fechaJuga').value = fechaJuga
    document.getElementById('numJuga').value = numJuga;
    document.getElementById('pesoJuga').value = pesoJuga;
    document.getElementById('estaJuga').value = estaJuga;
    document.getElementById('curpJuga').value = curpJuga;
    document.getElementById('combo').value = equipoJuga;
    document.getElementById('cateJuga').value = categoria;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';
    boton.onclick = function () {
        var washingtonRef = db.collection("jugadores").doc(id);
        var nombre = document.getElementById('nomJugador').value;
        var apellidoP = document.getElementById('aPaterno').value;
        var apellidoM = document.getElementById('aMaterno').value;
        var fechaNacimiento = document.getElementById('fechaJuga').value;
        var numero = document.getElementById('numJuga').value;
        var peso = document.getElementById('pesoJuga').value;
        var estatura = document.getElementById('estaJuga').value;
        var curp = document.getElementById('curpJuga').value;
        var equipo = document.getElementById('combo').value;
        var categoria = document.getElementById('cateJuga').value;
        var foto = ($('#foto'))[0].files[0];
        if (foto != null) {
            var downloadURL;
            var storageRef = storage.ref('jugadores/' + foto.name);
            storageRef.put(foto).then((data) => {
                storage.ref('jugadores/' + foto.name).getDownloadURL().then((url) => {
                    downloadURL = url;
                    return washingtonRef.update({
                        nombre: nombre,
                        apellidoP: apellidoP,
                        apellidoM: apellidoM,
                        fechaNacimiento: fechaNacimiento,
                        numero: numero,
                        peso: peso,
                        estatura: estatura,
                        curp: curp,
                        equipo: equipo,
                        categoria: categoria,
                        foto: downloadURL,

                    }).then(function () {
                        console.log("Document successfully updated!");
                        document.getElementById('nomJugador').value = '';
                        document.getElementById('aPaterno').value = '';
                        document.getElementById('aMaterno').value = '';
                        document.getElementById('numJugadr').value = '';
                        document.getElementById('pesoJuga').value = '';
                        document.getElementById('estaJuga').value = '';
                        document.getElementById('curpJuga').value = '';
                        document.getElementById('combo').value = '';
                        document.getElementById('foto').value = null;
                        boton.innerHTML = 'boton';
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
                nombre: nombre,
                apellidoP: apellidoP,
                apellidoM: apellidoM,
                fechaNacimiento: fechaNacimiento,
                numero: numero,
                peso: peso,
                estatura: estatura,
                curp: curp,
                equipo: equipo,
                categoria: categoria,
            }).then(function () {
                console.log("Document successfully updated!");
                document.getElementById('nomJugador').value = '';
                document.getElementById('aPaterno').value = '';
                document.getElementById('aMaterno').value = '';
                document.getElementById('nu mJugadr').value = '';
                document.getElementById('pesoJuga').value = '';
                document.getElementById('estaJuga').value = '';
                document.getElementById('curpJuga').value = '';
                document.getElementById('combo').value = '';
                document.getElementById('foto').value = null;
                boton.innerHTML = 'boton';
                window.location = "Jugadores.html"
            }).catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        }

    }
}

function eliminarJugador(id) {
    db.collection("jugadores").doc(id).delete().then(function () {
        console.log("Document succesfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

function lipmiar() {
    db.collection("nomJugador").value = '';
    db.collection("aPaterno").value = '';
    db.collection("aMaterno").value = '';
    db.collection("fechaJuga").value = '';
    db.collection("numJugadr").value = '';
    db.collection("pesoJuga").value = '';
    db.collection("estaJuga").value = '';
    db.collection("curpJuga").value = '';
    db.collection("combo").value = '';
    db.collection("cateJuga").value = '';
    db.collection("foto").value = null;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Guardar';
    boton.onclick = function () {
        registrarJugador();
    }
}

function verificarJugador(id) {
    db.collection("jugadores").doc(id)
}