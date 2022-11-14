let juegos = [
  {
    id: 1,
    nombre: "Cyberpunk 2077",
    genero: "accion, aventura",
    precio: 5000,
    imagen: "./img/cyberpunk.jpeg",
  },
  {
    id: 2,
    nombre: "Resident Evil 4 Remake",
    genero: "terror, accion",
    precio: 7000,
    imagen: "./img/re4remake.jpg",
  },
  {
    id: 3,
    nombre: "Battlefield 2042",
    genero: "accion, shooter",
    precio: 6000,
    imagen: "./img/battlefield2042.jpeg",
  },
  {
    id: 4,
    nombre: "Assasins creed mirage",
    genero: "aventura",
    precio: 7500,
    imagen: "./img/acMirage.jpg",
  },
  {
    id: 5,
    nombre: "Forza Horizon 5",
    genero: "carreras",
    precio: 5000,
    imagen: "../img/forzaHorizon.jpg",
  },
  {
    id: 6,
    nombre: "God of war Ragnarok",
    genero: "accion, aventura",
    precio: 7500,
    imagen: "./img/gowRagnarok.jfif",
  },
  {
    id: 7,
    nombre: "Elden ring",
    genero: "accion, aventura",
    precio: 5000,
    imagen: "./img/eldenRing.jpg",
  },
  {
    id: 8,
    nombre: "Call of duty mw2",
    genero: "accion, shooter",
    precio: 7000,
    imagen: "./img/codmw2.jpg",
  },
  {
    id: 9,
    nombre: "Horizon forbidden west",
    genero: "accion, aventura",
    precio: 6000,
    imagen: "./img/horizon.jfif",
  },
];

let contenedorJuegos = document.getElementById("contenedorJuegos");

for (const juego of juegos) {
  let productoJuego = document.createElement("div");
  productoJuego.className =
    "producto d-flex flex-column justify-content-around align-items-center";
  productoJuego.innerHTML = `
    <img src=${juego.imagen}>
    <h2>${juego.nombre}</h2>
    <h4>$${juego.precio}</h4>
    <h5>género: ${juego.genero}</h5>
    <button class="boton" id=${juego.id}>Agregar</button>
    `;
  contenedorJuegos.append(productoJuego);
}

let botones = document.getElementsByClassName("boton");
let carrito = document.getElementById("carrito");
let listaCarrito = [];

if (localStorage.getItem("carrito")) {
    listaCarrito = JSON.parse(localStorage.getItem("carrito"));
}

for (const boton of botones) {
    
    boton.onclick = (e) => {
    let juegoBusqueda = juegos.find((juego) => juego.id == e.target.id);
    carrito.innerHTML += `
        <div class="itemCarrito d-flex justify-content-around">
        <p>${juegoBusqueda.nombre}</p>
        <p>${juegoBusqueda.precio}</p>
        </div>
    `;
    listaCarrito.push({
        id: juegoBusqueda.id,
        nombre: juegoBusqueda.nombre,
        genero: juegoBusqueda.genero,
        precio: juegoBusqueda.precio,
    });
    localStorage.setItem("carrito", JSON.stringify(listaCarrito));
};
}

for (const item of listaCarrito) {
    let juegoBusqueda = juegos.find(juego => juego.id == item.id)
    carrito.innerHTML += `
        <div class="itemCarrito d-flex justify-content-around">
          <p>${juegoBusqueda.nombre}</p>
          <p>${juegoBusqueda.precio}</p>
        </div>
      `
  }
