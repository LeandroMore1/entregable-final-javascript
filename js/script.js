let juegos = [
  {
    id: 1,
    nombre: "cyberpunk 2077",
    genero: "accion, aventura",
    precio: 5000,
    imagen: "./img/cyberpunk.jpeg",
    descuento: true,
  },
  {
    id: 2,
    nombre: "resident evil 4 remake",
    genero: "terror, accion",
    precio: 7000,
    imagen: "./img/re4remake.jpg",
    descuento: false,
  },
  {
    id: 3,
    nombre: "battlefield 2042",
    genero: "accion, shooter",
    precio: 6000,
    imagen: "./img/battlefield2042.jpeg",
    descuento: false,
  },
  {
    id: 4,
    nombre: "assasins creed mirage",
    genero: "aventura",
    precio: 7500,
    imagen: "./img/acMirage.jpg",
    descuento: true,
  },
  {
    id: 5,
    nombre: "forza horizon 5",
    genero: "carreras",
    precio: 5000,
    imagen: "../img/forzaHorizon.jpg",
    descuento: false,
  },
  {
    id: 6,
    nombre: "god of war ragnarok",
    genero: "accion, aventura",
    precio: 7500,
    imagen: "./img/gowRagnarok.jfif",
    descuento: true,
  },
  {
    id: 7,
    nombre: "elden ring",
    genero: "accion, aventura",
    precio: 5000,
    imagen: "./img/eldenRing.jpg",
    descuento: false,
  },
  {
    id: 8,
    nombre: "call of duty mw2",
    genero: "accion, shooter",
    precio: 7000,
    imagen: "./img/codmw2.jpg",
    descuento: false,
  },
  {
    id: 9,
    nombre: "horizon forbidden west",
    genero: "accion, aventura",
    precio: 6000,
    imagen: "./img/horizon.jfif",
    descuento: true,
  },
]; 

let contenedorJuegos = document.getElementById("contenedorJuegos");
let botones = document.getElementsByClassName("boton");
let carrito = document.getElementById("carrito");
let listaCarrito = [];
let buscarBoton = document.getElementById("botonBuscar");
let buscarInput = document.getElementById("busqueda");
let botonCarrito = document.getElementById("btnCarrito");
let totalPrecio = document.getElementById("total");
let compraFinalizada = document.getElementById("compraFinalizada");
let finalizarCompraBtn = document.getElementById("finalizarCompraBtn");
let total = 0;

juegosRenderizados();
juegosAgregados();
renderizarCarrito();

if (localStorage.getItem("carrito")) {
  listaCarrito = JSON.parse(localStorage.getItem("carrito"));
}

// NOTE intente hacer un fetch aca metiendo el array del json en una variable juegos, pero me bugeaba todo el codigo

// const hacerFetch = () => {
// fetch(`./juegos.json`)
//   .then(response => response.json())
//   .then(catalogoJuegos => juegos = catalogoJuegos )
// }

// hacerFetch()

// NOTE boton carrito

botonCarrito.onclick = () => {
  carrito.classList.toggle("invisible");
};

// NOTE busqueda

buscarInput.oninput = () => {
  let juegosFiltrados = juegos.filter((juego) =>
    juego.nombre.includes(buscarInput.value)
  );
  juegosRenderizados(juegosFiltrados);
  juegosAgregados();
};

// NOTE catalogo juegos

function juegosRenderizados(juegosFiltrados) {
  let juegosARenderizar = juegos;
  if (juegosFiltrados) {
    juegosARenderizar = juegosFiltrados;
  }

  contenedorJuegos.innerHTML = "";

  for (const juego of juegosARenderizar) {
    const { id, nombre, genero, precio, imagen, } = juego;
    let productoJuego = document.createElement("div");
    productoJuego.className =
      "producto d-flex flex-column justify-content-around align-items-center";
    if (juego.descuento === true) {
      let descuentoJuego = juego.precio - (25 / 100) * juego.precio;
      productoJuego.innerHTML = `
        <img src=${imagen}>
        <h2>${nombre}</h2>
        <del>$${precio}</del>
        <h4>$${descuentoJuego}</h4>
        <h5>género: ${genero}</h5>
        <p class="descuento">descuento 25%!</p>
        <button class="btn btn-light boton" id=${id}>Agregar</button>
        `;
      contenedorJuegos.append(productoJuego);
    } else {
      productoJuego.innerHTML = `
        <img src=${imagen}>
        <h2>${nombre}</h2>
        <h4>$${precio}</h4>
        <h5>género: ${genero}</h5>
        <button class="btn btn-light boton" id=${id}>Agregar</button>
        `;
      contenedorJuegos.append(productoJuego);
    }
  }
}

// NOTE agregar juego al carro

function juegosAgregados() {
  for (const boton of botones) {
    boton.onclick = (e) => {
      let juegoBusqueda = juegos.find((juego) => juego.id == e.target.id);

      if (juegoBusqueda.descuento === true) {
        let descuento =
          juegoBusqueda.precio - (25 / 100) * juegoBusqueda.precio;
        let posicionJuego = listaCarrito.findIndex(
          (juego) => juego.id == juegoBusqueda.id
        );

        if (posicionJuego != -1) {
          listaCarrito[posicionJuego].unidades++
          listaCarrito[posicionJuego].subtotal =
            listaCarrito[posicionJuego].precioXUnidad *
            listaCarrito[posicionJuego].unidades
        } else {
          listaCarrito.push({
            id: juegoBusqueda.id,
            nombre: juegoBusqueda.nombre,
            genero: juegoBusqueda.genero,
            precioXUnidad: descuento,
            unidades: 1,
            subtotal: descuento,
          });
        }

        carrito.innerHTML += `
          <div class="itemCarrito d-flex justify-content-around">
          <p>${juegoBusqueda.nombre}</p>
          <p>$${descuento}</p>
          </div>
      `;

      } else {
        let posicionJuego = listaCarrito.findIndex(
          (juego) => juego.id == juegoBusqueda.id
        );

        if (posicionJuego != -1) {
          listaCarrito[posicionJuego].unidades++
          listaCarrito[posicionJuego].subtotal =
            listaCarrito[posicionJuego].precioXUnidad *
            listaCarrito[posicionJuego].unidades
        } else {
          listaCarrito.push({
            id: juegoBusqueda.id,
            nombre: juegoBusqueda.nombre,
            genero: juegoBusqueda.genero,
            precioXUnidad: juegoBusqueda.precio,
            unidades: 1,
            subtotal: juegoBusqueda.precio,
          });

          carrito.innerHTML += `
          <div class="itemCarrito d-flex justify-content-around">
          <p>${juegoBusqueda.nombre}</p>
          <p>$${juegoBusqueda.precio}</p>
          </div>
      `;
        }

      }
      tostada()
      localStorage.setItem("carrito", JSON.stringify(listaCarrito))
      renderizarCarrito()
    };
  }
}

// NOTE renderizado carrito

function renderizarCarrito() {
  carrito.innerHTML = `
  <div class="itemCarrito d-flex justify-content-around">
    <p>nombre</p>
    <p>precio por unidad</p>
    <p>unidades</p>
    <p>subtotal</p>

  </div>`;

  for (const item of listaCarrito) {
    const {nombre, precioXUnidad, unidades, subtotal} = item
    total += item.subtotal;
    carrito.innerHTML += `
    <div class="itemCarrito d-flex justify-content-around">
      <p>${nombre}</p>
      <p>${precioXUnidad}</p>
      <p>${unidades}</p>
      <p>${subtotal}</p>
  
    </div>`;
  }

  carrito.innerHTML += `
  <div class="d-flex flex-column align-items-center"
    <p>TOTAL: $${total}</p>
    </div>
    `;

    
}



// NOTE boton finalizar compra, no se por que cuando lo invoco no pasa nada

function finalizarCompra() {
  finalizarCompraBtn.onclick = () => {
    compraFinalizada.classList.toggle("invisible");
    compraFinalizada.innerHTML = `
      <div class="d-flex flex-column align-items-center"
        <h2>El total es de $${total} pesos</h2>
        <h2>Gracias por su compra!</h2>
        </div>`;
  };
}

function tostada() {
  Toastify({
    text: "Producto agregado!",
    style: {
      background:
        "linear-gradient(to left, #d16ba5, #b194e8, #6cbdff, #11e0ff, #5ffbf1)",
    },
    duration: 3000,
  }).showToast();
}
