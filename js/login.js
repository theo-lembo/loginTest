const usuario = document.getElementById("user");
const pass = document.getElementById("password");
const form = document.getElementById("login-form");
const errorMSG = document.getElementById("error");
var clicker = false;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let messages = [];
    let clave = pass.value;
    if (usuario.value === '' || usuario.value == null) {
        messages.push('Ingrese Usuario')
    }
    console.log(clave.length + " " + clave)
    if (((clave.length == 0) || (clave.length < 6) || (clave.length > 8))) {
        messages.push("La contraseña debe contener entre 6 y 8");
    }
    if (messages.length > 0) {
        document.getElementById("error").innerText = messages.join(', ');
        messages = null;
    } else {
        guardarUser(usuario.value);
        location.href = "inicio.html";
    }
});

function guardarUser(user) {
    localStorage.setItem("user", user);
}

//"preventDefault" para evitar el logueo automatico de google.
function google() {
    clicker = true;
}

function onSignIn(googleUser) {
    if (clicker) {
        let profile = googleUser.getBasicProfile();
        //console.log(profile.getEmail())
        if (profile.getEmail() != "") {
            guardarUser(profile.getName());
        }
        location.href = "inicio.html";
    }
}

function googleKey() {
    alert("El siguiente msj va a solicitar la key")
    let key = prompt("Google Key hint: 9-k");
    document.cookie = "username=Test; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
    return key;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    document.head.innerHTML += `
    
    <meta name="google-signin-client_id" content="` + googleKey() + `.apps.googleusercontent.com">
    <meta name="google-signin-scope" content="profile email">`

    let icon = `<link rel="icon" type="image/png" href="img/faviconD.png" />`;
    document.head.innerHTML += icon;
    let navBar = "";
    navBar = `
        <div class="container d-flex flex-column flex-md-row justify-content-between">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link d-md-inline-block " href="inicio.html">Inicio</a>
                        </li>      
                        <li class="nav-item active">
                            <a class="nav-link" href="categories.html">Categorías</a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="products.html">Productos
                            </a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="sell.html">Vender</a>
                        </li>
                        <li class="nav-item dropdown">
                            
                            <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ` + returnUser() + `</a>

                            <div class="dropdown-menu" aria-labelledby="navbarDropdown"> 
                                <button class="dropdown-item" id="buttonCustom" onclick="shopCart()">Mi carrito</button>
                                <button class="dropdown-item" id="buttonCustom" onclick="logOut()">Cerrar sesión</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>`;
    document.getElementById("navBar").innerHTML = navBar;

});

function returnUser() {
    let user = localStorage.getItem("user");
    //console.log(user);
    if (user != undefined && user != "") {
        return user
    }
    location.href = "index.html"
}

function shopCart() {
    location.href = "cart.html";
}

//Logout function
function logOut() {
    localStorage.removeItem("user");
    location.href = "index.html";
}