
import { CarritoVista } from "./vista/carritoVista.js";
import { CarritoControlador } from "./controlador/carritoControlador.js";

document.addEventListener("DOMContentLoaded", async () => {
    const vista = new CarritoVista();
    const controlador = new CarritoControlador(vista);

    // Cargar y mostrar productos en la página
    const contenedorProductos = document.getElementById("productos-container");

    try {
        const respuesta = await fetch("./productos/productos.json");
        const productos = await respuesta.json();

        productos.forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text price">$${producto.precio}</p>
                    <button class="btn btn-primary agregar-al-carrito" data-id="${producto.id}">Agregar al carrito</button>
                </div>
            `;
            contenedorProductos.appendChild(card);
        });

        // Agregar evento a los botones después de cargarlos
        document.querySelectorAll('.agregar-al-carrito').forEach(boton => {
            boton.addEventListener('click', () => {
                const id = parseInt(boton.getAttribute('data-id'));
                controlador.agregarProducto(id);
            });
        });

    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }

    // Mostrar el modal del carrito al hacer clic en el botón del carrito
    const botonCarrito = document.getElementById("boton-carrito");
    const modalCarrito = document.getElementById("modal-carrito");

    botonCarrito.addEventListener("click", () => {
        modalCarrito.style.display = "block";
    });

    // Cerrar el modal del carrito al hacer clic en el botón de cerrar
    document.getElementById("cerrar-modal").addEventListener("click", () => {
        modalCarrito.style.display = "none";
    });
});
