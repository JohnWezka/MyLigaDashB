/*firebase.initializeApp({
  apiKey: "AIzaSyCrrASgB21Xwu1HKPkEMxyJRtSsrgGyr1g",
  authDomain: "myleague-5a9c8.firebaseapp.com",
  databaseURL: "https://myleague-5a9c8.firebaseio.com",
  projectId: "myleague-5a9c8",
  storageBucket: 'gs://myleague-5a9c8.appspot.com/',
  messagingSenderId: "167455229801"
});*/

var db = firebase.firestore();

function crearTorneo() {
  var nombreTornoe = document.getElementById('nombreTorneo').value;
  var tipoTorneo = document.getElementById('tipoTorneo').value;
  var fechaInicio = document.getElementById('fechaInicio').value;
  var fechaCierre = document.getElementById('fechaCierre').value;
  var fechaNacimientoInicio = document.getElementById('fechaNacimientoInicio').value;
  var fechaNacimientoFinal = document.getElementById('fechaNacimientoFinal').value;
  var categoria = document.getElementById('categoria').value;

  db.collection("torneo").add({  
    nombreTornoe: nombreTornoe,
    tipoTorneo: tipoTorneo,
    fechaInicio: fechaInicio,
    fechaCierre: fechaCierre,
    fechaNacimientoInicio: fechaNacimientoInicio,
    fechaNacimientoFinal: fechaNacimientoFinal,
    categoria: categoria
  }).then(function (docRef) {
    console.log("Document written with ID: ", docRef.id);
    document.getElementById('nombreTornoe').value = '';
    document.getElementById('tipoTorneo').value = '';
    document.getElementById('fechaInicio').value = '';
    document.getElementById('fechaCierre').value = '';
    document.getElementById('fechaNacimientoInicio').value = '';
    document.getElementById('fechaNacimientoFinal').value = '';
    document.getElementById('categoria').value = '';
    //window.location = "../index.html";
  })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

function leerTorneos() {
  var tabla = document.getElementById('tabla');
  tabla.innerHTML = '';
  db.collection("torneo").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
      tabla.innerHTML += `
          <tr>
          <th scope="row">${doc.id}</th>
          <td>${doc.data().nombreTornoe}</td>
          <td>${doc.data().tipoTorneo}</td>
          <td>${doc.data().fechaInicio}</td>
          <td>${doc.data().fechaCierre}</td>
          <td>${doc.data().fechaNacimientoInicio}</td>
          <td>${doc.data().fechaNacimientoFinal}</td>
          <td>${doc.data().categoria}</td>
          <td><button class="btn " id="boton" onclick="editarTorneo('${doc.id}')"><i class="fas fa-edit"></i></button></td>
          <td><i class="fas fa-sync-alt"  data-toggle="modal" data-target=".bd-example-modal-lg" onclick="actualizarEquipo('${doc.id}','${doc.data().nombreTornoe}',
                '${doc.data().tipoTorneo}','${doc.data().fechaInicio}','${doc.data().fechaCierre}','${doc.data().fechaNacimientoInicio}','${doc.data().fechaNacimientoFinal}','${doc.data().categoria}')"></i></td>
          <td><button class="btn " id="boton" onclick="eliminarTorneo('${doc.id}')"><i class="fas fa-trash-alt"></i></button></td>
          </tr>`;
    });
  });
}
leerTorneos();

function eliminarTorneo(id) {
  db.collection("torneo").doc(id).delete().then(function () {
  }).catch(function (error) {
    console.error("Error removing document: ", error);
  });
}

function actualizarEquipo(id, nombreTornoe, tipoTorneo, fechaInicio, fechaCierre, fechaNacimientoInicio, fechaNacimientoFinal, categoria) {
  console.log('entro');
  document.getElementById('nombreTornoe').value = nombreTornoe;
  document.getElementById('tipoTorneo').value = tipoTorneo;
  document.getElementById('fechaInicio').value = fechaInicio;
  document.getElementById('fechaCierre').value = fechaCierre;
  document.getElementById('fechaNacimientoInicio').value = fechaNacimientoInicio;
  document.getElementById('fechaNacimientoFinal').value = fechaNacimientoFinal;
  document.getElementById('categoria').value = categoria;
  var boton = document.getElementById('boton');
  boton.innerHTML = 'Editar';
  boton.onclick = function () {
    var washingtonRef = db.collection("torneos").doc(id);
    var nombreTornoe = document.getElementById('nombreTornoe').value;
    var tipoTorneo = document.getElementById('tipoTorneo').value;
    var fechaInicio = document.getElementById('fechaInicio').value;
    var fechaCierre = document.getElementById('fechaCierre').value;
    var fechaNacimientoInicio = document.getElementById('fechaNacimientoInicio').value;
    var fechaNacimientoFinal = document.getElementById('fechaNacimientoFinal').value;
    var categoria = document.getElementById('categoria').value;
    if (img != null) {
      return washingtonRef.update({
        nombreTornoe: nombreTornoe,
        tipoTorneo: tipoTorneo,
        fechaInicio: fechaInicio,
        fechaCierre: fechaCierre,
        fechaNacimientoInicio: fechaNacimientoInicio,
        fechaNacimientoFinal: fechaNacimientoFinal,
        categoria: categoria
      }).then(function () {
        console.log("Document successfully updated!");
        document.getElementById('nombreTornoe').value = '';
        document.getElementById('tipoTorneo').value = '';
        document.getElementById('fechaCierre').value = '';
        document.getElementById('fechaNacimientoInicio').value = '';
        document.getElementById('fechaNacimientoFinal').value = '';
        document.getElementById('categoria').value = '';
        boton.innerHTML = 'Guardar';
      }).catch(function (error) {
        console.error("Error updating document: ", error);
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


