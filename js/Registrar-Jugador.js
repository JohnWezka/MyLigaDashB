firebase.initializeApp({
    apiKey: "AIzaSyCrrASgB21Xwu1HKPkEMxyJRtSsrgGyr1g",
    authDomain: "myleague-5a9c8.firebaseapp.com",
    projectId: "myleague-5a9c8"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

function registrarJugador() {
    var nombre = document.getElementById('nomJugador').value;
    var apellidoP = document.getElementById('aPaterno').value;
    var apellidoM = document.getElementById('aMaterno').value;
    var numero = document.getElementById('numJuga').value;
    var peso = document.getElementById('pesoJuga').value;
    var estatura = document.getElementById('estaJuga').value;
    var curp = document.getElementById('curp').value;
    var equipo = document.getElementById('equipoJuga').value;
    var foto = document.getElementById('foto').value;
    db.collection("jugadores").add({
        nombre: nombre,
        apellidoP: apellidoP,
        apellidoM: apellidoM,
        numero: numero,
        peso: peso,
        estatura: estatura,
        curp: curp,
        equipo: equipoJuga
    })
        .then(function (docRef) {
            console.log("Document written with ", docRef);
        })
        .catch(function (error) {
            console.error("Error adding document", error);
        });
}
        

function leerJugadores() {
    var table = document.getElementById('table');
        table.innerHTML = '';
        db.collection("jugadores").onSnapshot((querySnapshot) => {
            table.innerHTML = '';
            querySnapshot.forEach((doc) => {
                table.innerHTML += `
            <tr>
                <th scope="row">${doc.id}</th>
                <td>${doc.data().nombre}</td>
                <td>${doc.data().apellidoP}</td>
                <td>${doc.data().apellidoM}</td>
                <td>${doc.data().numero}</td>
                <td>${doc.data().peso}</td>
                <td>${doc.data().estatura}</td>
                <td>${doc.data().curp}</td>
                <td>${doc.data().equipo}</td>
                <td><button class="btn btan-warning" id="boton" oneclick="editarJugador('${doc.id}')">Editar</button></td>
                <td><button class="btn btan-warning" id="boton" oneclick="eliminarJugador('${doc.id}')">Eliminar</button></td>
                <td><button class="btn btan-warning" id="boton" oneclick="guardarJugador('${doc.id}')">Guardar</button></td>
            </tr>
            `;
            });
        });
    }
    leerJugadores();

function editarJugador(id, nombre, apellidoP, apellidoM, numero, peso, estatura, curp) {
    
    document.getElementById('nomJugador'),value = nomJugador;
    document.getElementById('aPaterno'),value = aPaterno;
    document.getElementById('aMaterno'),value = aMaterno;
    document.getElementById('numJuga'),value = numJuga;
    document.getElementById('pesoJuga'),value = pesoJuga;
    document.getElementById('estaJuga'),value = estaJuga;
    document.getElementById('curpJuga'),value = curpJuga;
    document.getElementById('equipoJuga'),value = equipoJuga;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'editarJugador';

    boton.onclick = function (){
        var washingtonRef = db.collection("jugadores").doc(id);

        var nomJugador = document.getElementById('nomJugador').value;
        var aPaterno = document.getElementById('aPaterno').value;
        var aMaterno = document.getElementById('aMaterno'),aMaterno;
        var numJuga = document.getElementById('numJuga'),numJuga;
        var pesoJuga = document.getElementById('pesoJuga'),pesoJuga;
        var estaJuga = document.getElementById('estaJuga'),estaJuga;
        var curpJuga = document.getElementById('curpJuga'),curpJuga;
        var equipoJuga = document.getElementById('equipoJuga'),equipoJuga;
        
        return washingtonRef.update({
            nombre: nombre,
            aPaterno: aPaterno,
            aMaterno: aMaterno,
            numJuga: numJuga,
            pesoJuga: pesoJuga,
            estaJuga: estaJuga,
            curpJuga: curpJuga,
            equipoJuga: equipoJuga

        })
        .then(function (){
            console.log("Document successfully updated!");
            document.getElementById('nomJugador').value = '';
            document.getElementById('aPaterno').value = '';
            document.getElementById('aMaterno').value = '';
            document.getElementById('numJugadr').value = '';
            document.getElementById('pesoJuga').value = '';
            document.getElementById('estaJuga').value = '';
            document.getElementById('curpJuga').value = '';
            document.getElementById('equipoJuga').value = '';
            boton.innerHTML = 'guardarJugador';
        })
    }
    db.collection("jugadores").doc(id).ed
}

function eliminarJugador(id) {
        db.collection("jugadores").doc(id).delete().then(function () {
            console.log("Document succesfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
}

