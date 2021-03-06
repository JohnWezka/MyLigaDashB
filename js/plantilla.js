

(function head(){
    var head = document.getElementById('head');
    head.innerHTML = `
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>My League</title>

    <!-- Custom fonts for this template-->
    <link href="../vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">

    <!-- Page level plugin CSS-->
    <link href="../vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="../css/sb-admin.css" rel="stylesheet">

    <!-- FIREBASE -->
    <script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.12.1/firebase-firestore.js"></script>

    <!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

    <!-- Custom fonts for this template-->
    <link href="../vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">

    <link href="../css/style.css" rel="stylesheet">

    <link rel="icon" href="../img/myleague.ico">
    `;
})();

(function navbar() {
    var navbar = document.getElementById('navbar');
    navbar.innerHTML = `
    <a class="navbar-brand mr-1" href="../index.html">My League</a>

        <button class="btn btn-link btn-sm text-white order-1 order-sm-0 deep-purple accent-4" id="sidebarToggle" href="#">
            <i class="fas fa-bars"></i>
        </button>

        <!-- Navbar -->
        <ul class="navbar-nav ml-auto ml-md-0">
            <li class="nav-item dropdown no-arrow">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-user-circle fa-fw"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <a class="dropdown-item" href="#">Settings</a>
                    <a class="dropdown-item" href="#">Activity Log</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">Logout</a>
                </div>
            </li>
        </ul>
    `;
})();


(function sidebar(){
    var sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = `
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="pagesDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-fw fa-folder"></i>
                    <span>Pages</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="pagesDropdown">
                    <h6 class="dropdown-header">Registros:</h6>
                    <a class="dropdown-item" href="../pages/Equipos.html">Equipos</a>
                    <a class="dropdown-item" href="../pages/Jugadores.html">Jugadores</a>
                    <a class="dropdown-item" href="../pages/Arbitros.html">Arbitros</a>
                    <a class="dropdown-item" href="../pages/Torneos.html">Torneos</a>
                    <a class="dropdown-item" href="../pages/Partidos.html">Partidos</a>
                </div>
            </li>
    `;
})();

(function logoutModal(){
    var logoutModal = document.getElementById('logoutModal');
    logoutModal.innerHTML = `
    <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <button class="btn btn-primary" type="button" data-dismiss="modal" onclick="logout()">Salir</button>
                </div>
            </div>
        </div>
    `;
})();

(function footer(){
    var footer = document.getElementById('footer');
    footer.innerHTML =  `
    <div class="container my-auto">
        <div class="copyright text-center my-auto">
            <span>Copyright © Cypher 2019</span>
        </div>
    </div>
    `;
})();

function logout() {
    firebase.auth().signOut().then(() => {
        console.log('saliendo');
        location.href="../login/index.html";
    }).catch((error) => {
        console.log(error);
    });
  }

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });