firebase.initializeApp({
    apiKey: "AIzaSyCrrASgB21Xwu1HKPkEMxyJRtSsrgGyr1g",
    authDomain: "myleague-5a9c8.firebaseapp.com",
    projectId: "myleague-5a9c8"
  });

  var db = firebase.firestore();

function crearTorneo() {
    var nombreTornoe = document.getElementById('nombreTorneo').value;
    var tipoTorneo = document.getElementById('tipoTorneo').value;
    var fechaInicio = document.getElementById('fechaInicio').value;
    var fechaCierre = document.getElementById('fechaCierre').value;
    var categoria = document.getElementById('categoria').value;
    db.collection("torneos").add({
      nombreTornoe: nombreTornoe,
      tipoTorneo: tipoTorneo,
      fechaInicio: fechaInicio,
      fechaCierre:fechaCierre,
      categoria:categoria
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }
  
  
  function leerTorneos() {
    var tabla = document.getElementById('tabla');
    tabla.innerHTML = '';
    db.collection("torneos").onSnapshot((querySnapshot) => {
      tabla.innerHTML = '';
      querySnapshot.forEach((doc) => {
        tabla.innerHTML += `
          <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().nombreTorneo}</td>
            <td>${doc.data().tipoTorneo}</td>
            <td>${doc.data().fechaInicio}</td>
            <td>${doc.data().fechaCierre}</td>
            <td>${doc.data().Categoria}</td>
            <td><button class="btn btn-warning" id="boton" onclick="editarTorneo('${doc.id}')">Editar</button></td>
            <td><button class="btn btn-danger" id="boton" onclick="eliminarTorneo('${doc.id}')">Eliminar</button></td>
          </tr>
          `;
      });
    });
  }
  leerLigas();
  
  function editarTorneo(){

  }
  function eliminarTorneo(id) {
    db.collection("torneos").doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }
  