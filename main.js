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
    const botonCarrito = document.getElementById("abrirCarrito");
    const modalCarrito = document.getElementById("modalCarrito");

    botonCarrito.addEventListener("click", () => {
        modalCarrito.style.display = "block";
    });

    // Cerrar el modal del carrito al hacer clic en el botón de cerrar
    document.querySelector(".cerrar").addEventListener("click", () => {
        modalCarrito.style.display = "none";
    });

    // ⬇️ Agrega el evento al botón de pago para llamar a la función en el controlador
    const botonPagar = document.getElementById("pagarBtn");
    if (botonPagar) {
        botonPagar.addEventListener("click", () => {
            controlador.pagarCarrito();
        });
    } else {
        console.error("Error: No se encontró el botón de pagar.");
    }

    function mostrarNotificacion() {
        const notificacion = document.getElementById("notificacion");
        notificacion.style.display = "block";
        notificacion.style.opacity = "1";

        setTimeout(() => {
            notificacion.style.opacity = "0";
            setTimeout(() => {
                notificacion.style.display = "none";
            }, 500);
        }, 2000);
    }

// Agrega la notificación cuando un producto se añade al carrito
    document.querySelectorAll('.agregar-al-carrito').forEach(boton => {
        boton.addEventListener('click', () => {
            mostrarNotificacion();
        });
    });

});
