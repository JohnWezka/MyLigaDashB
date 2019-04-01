// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
// Current user
var idUser;
var idLiga;

(function user() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      idUser = user.uid;
      db.collection("admin").where("userID", "==", user.uid).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          idLiga = doc.data().idliga;
          liga();
          admin();
          var contenedor = document.getElementById('contCarga');
          contenedor.style.visibility = 'hidden';
          contenedor.style.opacity = '0';
        });
      });
    } else {
      var contenedor = document.getElementById('contCarga');
      contenedor.style.visibility = 'hidden';
      contenedor.style.opacity = '0';
      location.href = "login/index.html";
    }
  });
})();

function liga() {
  var liga = document.getElementById('cardLiga');
  var docRef = db.collection("ligas").doc(idLiga);
  docRef.get().then(function (doc) {
    liga.innerHTML = `
        <div class="card">
                  <div class="card-image">
                    <img src="${doc.data().foto}" height="300">
                    <span class="card-title"><h1>${doc.data().nombreLiga}</h1></span>
                  </div>
                  <div class=" card-content">
                    <form>
                      <div class="row">
                        <div class="col-md-12 px-1">
                          <div class="form-group">
                              <label class="black-text"><h6>Nombre De Liga:</h6></label>
                            <input type="text" class="form-control grey-text text-darken-3" disabled value="${doc.data().nombreLiga}">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12 px-1">
                          <div class="form-group">
                              <label class="black-text"><h6>Nombre De Dueño:</h6></label>
                            <input type="text" class="form-control grey-text text-darken-3" disabled value="${doc.data().nombreDueno}">
                          </div>
                        </div>
                      </div>
                      <div class="row">
                          <div class="col-md-12 px-1">
                              <div class="form-group">
                                  <label class="black-text"><h6>Descripción:</h6></label>
                                  <textarea class="materialize-textarea grey-text text-darken-3" disabled>${doc.data().descripcion}</textarea>
                              </div>
                          </div>
                      </div>
                      <div class="clearfix"></div>
                    </form>
                  </div>
                </div>
        `;
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });
}

function admin() {
  var admin = document.getElementById('cardAdmin');
  db.collection("admin").where("idliga", "==", idLiga).onSnapshot(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      admin.innerHTML = `
    <div class="card card-user">
                  <div class="card-image">
                    <img src="${doc.data().foto}" alt="foto admin">
                  </div>
                  <div class="card-body">
                    <div class="author">
                        <h5 class="title text-center">${doc.data().nombre} ${doc.data().apellidoPaterno} ${doc.data().apellidoMaterno}</h5>
                      <p class="description text-center">
                      ${doc.data().telefono}
                      </p>
                    </div>
                    <p class="description text-center">
                    ${doc.data().direccion}
                    </p>
                  </div>
                  <hr>
                  <div class="button-container mr-auto ml-auto">
                    <button href="#" class="btn btn-simple btn-link btn-icon deep-purple accent-4">
                    <i class="fab fa-facebook-square"></i>
                    </button>
                    <button href="#" class="btn btn-simple btn-link btn-icon deep-purple accent-4">
                    <i class="fab fa-twitter"></i>
                    </button>
                    <button href="#" class="btn btn-simple btn-link btn-icon deep-purple accent-4">
                    <i class="fab fa-google-plus-square"></i>
                    </button>
                  </div>
                </div>
    `;
    })
  });
}

function logout() {
  firebase.auth().signOut().then(() => {
      console.log('saliendo');
      location.href="/login/index.html"
  }).catch((error) => {
      console.log(error);
  });
}