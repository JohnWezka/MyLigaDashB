

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
  /*.catch((error) => {
    console.log("error");
    console.log(error);
  });*/
  /*uploadTask.on('state_changed', (snapshot) => {
      console.log("snapshot:");
      console.log(snapshot);
      
    },function(error){
      console.log("error storage");
      console.log(error);
    }, function(){
      downloadURL = uploadTask.snapshot.downloadURL;
    });*/
}

