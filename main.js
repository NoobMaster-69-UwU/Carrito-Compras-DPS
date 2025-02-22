import { CarritoVista } from "./vista/carritoVista.js";
import { CarritoControlador } from "./controlador/carritoControlador.js";

// Esperar a que el DOM esté completamente cargado
// para asegurar que los elementos existen antes de interactuar con ellos
document.addEventListener("DOMContentLoaded", async () => {
    // Crear una instancia de la vista del carrito
    const vista = new CarritoVista();
    // Crear una instancia del controlador del carrito, pasándole la vista
    const controlador = new CarritoControlador(vista);

    // Obtener el contenedor donde se mostrarán los productos
    const contenedorProductos = document.getElementById("productos-container");

    try {
        // Intentar obtener los productos almacenados en localStorage
        let productos = JSON.parse(localStorage.getItem("productosDisponibles"));

        // Si no hay productos en localStorage, cargarlos desde un archivo JSON
        if (!productos || productos.length === 0) {
            const respuesta = await fetch("./productos/productos.json"); // Obtener el JSON de productos
            productos = await respuesta.json(); // Convertir la respuesta en un objeto JS
            localStorage.setItem("productosDisponibles", JSON.stringify(productos)); // Guardar en localStorage
        }

        // Limpiar el contenedor antes de agregar los productos
        contenedorProductos.innerHTML = "";
        
        // Recorrer la lista de productos y agregarlos al contenedor
        productos.forEach(producto => {
            const productoElemento = document.createElement("div"); // Crear un nuevo div
            productoElemento.classList.add("producto"); // Agregar clase CSS para estilos
            productoElemento.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
            `;
            contenedorProductos.appendChild(productoElemento); // Agregar el producto a la página
        });
    } catch (error) {
        console.error("Error cargando los productos:", error);
    }
});