
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var storage = firebase.storage();

function registrarJugador(idLiga) {
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
    db.collection("jugadores").where("nomJuga", "==", nombre).gte().then(function (querySnapshot) {
        console.log(querySnapshot.empty);
        if (querySnapshot.empty) {
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
                        nom: nombre,
                        apeP: apellidoP,
                        apeM: apellidoM,
                        fechaN: fechaNacimiento,
                        num: numero,
                        pes: peso,
                        esta: estatura,
                        cp: curp,
                        equip: equipo,
                        cate: categoria,
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
                        }).catch(function (error){
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
    }).catch(function (error){
        console.log("Error getting documents: ", error);    
        var contenedor = document.getElementById('contCarga');
        contenedor.style.visibility = 'hidden';
        contenedor.style.opacity = '0';
    });

}
(function consultarEquipos() {
    var combo = document.getElementById('combo');
    combo.innerHTML = '';
    db.collection("equipos").onSnapshot((querySnapshot) => {
        combo.innerHTML = '';
        querySnapshot.forEach((doc) => {
            combo.innerHTML += `
            <option>${doc.data().nombreEquipo}</option>
            `;
        })
    })
})();


(function leerJugadores() {
    var table = document.getElementById('table');
    table.innerHTML = '';
    db.collection("jugadores").onSnapshot((querySnapshot) => {
        table.innerHTML = '';

        querySnapshot.forEach((doc) => {
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
                <td>${doc.data().equipo}</td>
                <td>${doc.data().categoria}</>
                <td><img height="70" width="70" src=${doc.data().foto}</td>
                <td><h4><i class="fas fa-sync-alt"  data-toggle="modal" data-target=".bd-example-modal-lg" 
                onclick="editarJugador('${doc.id}','${doc.data().nombre}','${doc.data().apellidoP}','${doc.data().apellidoM}',
                '${doc.data().fechaNacimiento}','${doc.data().numero}','${doc.data().peso}','${doc.data().estatura}','${doc.data().curp}',
                '${doc.data().equipo}','${doc.data().categoria}','${doc.data().foto}')">Editar</i></h4></td>
                <td><button class="btn btan-warning" onclick="eliminarJugador('${doc.id}')">Eliminar</button></td>
            </tr>
            `;

        });
        var contenedor = document.getElementById('contCarga');
        contenedor.style.visibility = 'hidden';
        contenedor.style.opacity = '0';
    });

})();

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
        var aPaterno = document.getElementById('aPaterno').value;
        var aMaterno = document.getElementById('aMaterno').value;
        var fechaJuga = document.getElementById('fechaJuga').value;
        var numJuga = document.getElementById('numJuga').value;
        var pesoJuga = document.getElementById('pesoJuga').value;
        var estaJuga = document.getElementById('estaJuga').value;
        var curpJuga = document.getElementById('curpJuga').value;
        var equipoJuga = document.getElementById('combo').value;
        var foto = ($('#foto'))[0].files[0];
        if (foto != null) {
            var downloadURL;
            var storageRef = storage.ref('jugadores/' + foto.name);
            storageRef.put(foto).then((data) => {
                console.log("then");
                console.log(data);
                storage.ref('jugadores/' + img.name).getDownloadURL().then((url) => {
                    console.log("url");
                    console.log(url);
                    downloadURL = url;
                    console.log("downloadURL");
                    console.log(downloadURL);

                    return washingtonRef.update({
                        nombre: nombre,
                        aPaterno: aPaterno,
                        aMaterno: aMaterno,
                        fechaJuga: fechaJuga,
                        numJuga: numJuga,
                        pesoJuga: pesoJuga,
                        estaJuga: estaJuga,
                        curpJuga: curpJuga,
                        equipoJuga: equipoJuga,
                        foto: downloadURL

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
                nombre: nombre,
                aPaterno: aPaterno,
                aMaterno: aMaterno,
                fechaJuga: fechaJuga,
                numJuga: numJuga,
                pesoJuga: pesoJuga,
                estaJuga: estaJuga,
                curpJuga: curpJuga,
                equipoJuga: equipoJuga
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
                boton.innerHTML = 'Guardar';
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

function verificarJugador(id) {
    db.collection("jugadores").doc(id)
}

