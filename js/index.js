// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
// Current user
var user;
var idLiga;

(function user() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      
      db.collection("admin").where("userID", "==", user.uid).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          user = doc.id;
          idLiga = doc.data().idliga;
          liga();
        });
      });
    } else {
      console.log("entro");

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
                                  <textarea class="materialize-textarea grey-text text-darken-3" disabled value="${doc.data().descripcion}"></textarea>
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