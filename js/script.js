let juegos = [
  {
    id: 1,
    nombre: "cyberpunk 2077",
    genero: "accion, aventura",
    precio: 5000,
    imagen: "./img/cyberpunk.jpeg",
  },
  {
    id: 2,
    nombre: "resident evil 4 remake",
    genero: "terror, accion",
    precio: 7000,
    imagen: "./img/re4remake.jpg",
  },
  {
    id: 3,
    nombre: "battlefield 2042",
    genero: "accion, shooter",
    precio: 6000,
    imagen: "./img/battlefield2042.jpeg",
  },
  {
    id: 4,
    nombre: "assasins creed mirage",
    genero: "aventura",
    precio: 7500,
    imagen: "./img/acMirage.jpg",
  },
  {
    id: 5,
    nombre: "forza horizon 5",
    genero: "carreras",
    precio: 5000,
    imagen: "../img/forzaHorizon.jpg",
  },
  {
    id: 6,
    nombre: "god of war ragnarok",
    genero: "accion, aventura",
    precio: 7500,
    imagen: "./img/gowRagnarok.jfif",
  },
  {
    id: 7,
    nombre: "elden ring",
    genero: "accion, aventura",
    precio: 5000,
    imagen: "./img/eldenRing.jpg",
  },
  {
    id: 8,
    nombre: "call of duty mw2",
    genero: "accion, shooter",
    precio: 7000,
    imagen: "./img/codmw2.jpg",
  },
  {
    id: 9,
    nombre: "horizon forbidden west",
    genero: "accion, aventura",
    precio: 6000,
    imagen: "./img/horizon.jfif",
  },
];

let contenedorJuegos = document.getElementById("contenedorJuegos");
let botones = document.getElementsByClassName("boton");
let carrito = document.getElementById("carrito");
let listaCarrito = [];
let buscarBoton = document.getElementById("botonBuscar");
let buscarInput = document.getElementById("busqueda");

juegosRenderizados();

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
  let juegoBusqueda = juegos.find((juego) => juego.id == item.id);
  carrito.innerHTML += `
          <div class="itemCarrito d-flex justify-content-around">
            <p>${juegoBusqueda.nombre}</p>
            <p>${juegoBusqueda.precio}</p>
          </div>
        `;
}

buscarBoton.onclick = () => {
  let juegosFiltrados = juegos.filter((juego) =>
    juego.nombre.includes(buscarInput.value)
  );
  juegosRenderizados(juegosFiltrados);
};

function juegosRenderizados(juegosFiltrados) {
  let juegosARenderizar = juegos;
  if (juegosFiltrados) {
    juegosARenderizar = juegosFiltrados;
  }

  contenedorJuegos.innerHTML = "";

  for (const juego of juegosARenderizar) {
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
}
