(function navbar() {
    var navbar = document.getElementById('navbar');
    navbar.innerHTML = `
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
    </li>`;
})();






