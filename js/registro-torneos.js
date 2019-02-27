
var db = firebase.firestore();

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();


function registrarEquipo() {
  var nombreTornoe = document.getElementById('nombreTorneo').value;
  var tipoTorneo = document.getElementById('tipoTorneo').value;
  var fechaInicio = document.getElementById('fechaInicio').value;
  var fechaCierre = document.getElementById('fechaCierre').value;
  var fechaCierre = document.getElementById('fechaNacimientoInicio').value;
  var fechaCierre = document.getElementById('fechaNacimientoFinal').value;
  var categoria = document.getElementById('categoria').value;

  var storageRef = storage.ref('torneos/' + imgEquipo.name);
  storageRef.put(imgEquipo).then((data) => {
    console.log("then");
    console.log(data);
    storage.ref('torneos/' + imgEquipo.name).getDownloadURL().then((url) => {
      console.log("url");
      console.log(url);
      downloadURL = url;
      console.log("downloadURL");
      console.log(downloadURL);

      db.collection("torneos").add({
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
    }).catch((error) => {
      console.log("url error");
      console.log(error);
    });

  }).catch((error) => {
    console.log("error");
    console.log(error);
  });
}

function leerTorneos() {
  console.log('entro');
  var tabla = document.getElementById('tabla');
  tabla.innerHTML = '';
  db.collection("torneos").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
      console.log(doc);
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
          <td><button class="btn " id="boton" onclick="eliminarTorneo('${doc.id}')"><i class="fas fa-trash-alt"></i></button></td>
          </tr>`;
    });
  });
}
leerTorneos();

function eliminarEquipo(id) {
  db.collection("equipos").doc(id).delete().then(function () {
    console.log("Document successfuly deleted!");
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


