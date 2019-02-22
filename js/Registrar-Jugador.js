firebase.initializeApp({
    apiKey: "AIzaSyCrrASgB21Xwu1HKPkEMxyJRtSsrgGyr1g",
    authDomain: "myleague-5a9c8.firebaseapp.com",
    projectId: "myleague-5a9c8"
  });

  // Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

function registrarJugador(){
    var nombre = document.getElementById('nomJugador').value;
    var apellidoP = document.getElementById('aPaterno').value;
    var apellidoM = document.getElementById('aMaterno').value;
    var numero = document.getElementById('numJuga').value;
    var peso = document.getElementById('pesoJuga').value;
    var estatura = document.getElementById('estaJuga').value;
    var curp = document.getElementById('curp').value;
    var foto = document.getElementById('foto').value;
    db.collection("jugadores").add({
        nombre: nombre,
        apellidoP: apellidoP,
        apellidoM: apellidoM,
        numero: numero,
        peso: peso,
        estatura: estatura,
        curp: curp
    })
      .then(function (docRef){
        console.log("Document written with ", docRef);
    })
    .catch(function (error){
        console.error("Error adding document", error);
    });


    (function leerJugadores(){
        var table = document.getElementById('table');
        table.innerHTML = '';
        querySnapshost.forEach((doc) => {
            table.innerHTML +=`
            <tr>
                <th scope="row">${doc.id}</th>
                <td>${doc.data().nombre}</td>
                <td>${doc.data().apellidoP}</td>
                <td>${doc.data().apellidoM}</td>
                <td>${doc.data().numero}</td>
                <td>${doc.data().peso}</td>
                <td>${doc.data().estatura}</td>
                <td>${doc.data().curp}</td>
                <td><botton class="btn btan-warning" id="boton" oneclick="editarJugador('${doc.id}')">Editar</button></td>
                <td><botton class="btn btan-warning" id="boton" oneclick="eliminarJugador('${doc.id}')">Eliminar</button></td>
            </tr>
            `;
        });
    })();

    leerJugadores();

    function editarJugador(){
        db.collection("jugadores").doc(id).ed
    }

    function eliminarJugador(id){
        db.collection("jugadores").doc(id).delete().then(function (){
            console.log("Document succesfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    }

}