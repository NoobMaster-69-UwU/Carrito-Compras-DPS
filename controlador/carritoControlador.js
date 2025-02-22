import { Carrito } from "../modelo/carrito.js";
import { Producto } from "../modelo/producto.js";

// Clase que controla la lógica del carrito de compras
export class CarritoControlador {
    constructor(vista) {
        this.carrito = new Carrito(); // Instancia del modelo del carrito
        this.vista = vista; // Referencia a la vista del carrito

        // Si no hay productos disponibles en localStorage, los carga
        if (!localStorage.getItem("productosDisponibles")) {
            this.cargarProductos();
        }

        this.actualizarVistaCarrito(); // Muestra el carrito actualizado en la interfaz
        this.agregarEventosBotones(); // Agrega eventos a los botones de la interfaz
    }

    // Carga los productos desde un archivo JSON y los almacena en localStorage
    async cargarProductos() {
        try {
            const respuesta = await fetch("../productos/productos.json"); // Obtiene los productos desde el JSON
            if (!respuesta.ok) throw new Error(`HTTP error! Status: ${respuesta.status}`);

            const productos = await respuesta.json(); // Convierte la respuesta en objeto JS
            localStorage.setItem("productosDisponibles", JSON.stringify(productos)); // Guarda en localStorage
            
            // Muestra los productos en la vista y les agrega funcionalidad
            this.vista.mostrarProductos(productos, this.agregarProducto.bind(this));
        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    }

    // Agrega un producto al carrito
    agregarProducto(id) {
        const productos = JSON.parse(localStorage.getItem("productosDisponibles")); // Obtiene los productos
        const producto = productos.find(p => p.id === id); // Encuentra el producto con el ID dado
        
        if (producto) {
            this.carrito.agregarProducto(new Producto(producto.id, producto.nombre, producto.precio));
            this.actualizarVistaCarrito(); // Actualiza la vista después de agregar
        }
    }

    // Elimina un producto del carrito
    eliminarProducto(id) {
        this.carrito.eliminarProducto(id);
        this.actualizarVistaCarrito(); // Actualiza la vista después de eliminar
    }

    // Actualiza la vista del carrito con los productos actuales
    actualizarVistaCarrito() {
        this.vista.mostrarCarrito(this.carrito.obtenerProductos(), this.eliminarProducto.bind(this));
    }

    // Agrega eventos a los botones de agregar al carrito
    agregarEventosBotones() {
        document.addEventListener("click", (event) => {
            if (event.target.classList.contains("agregar-carrito")) {
                const id = parseInt(event.target.dataset.id, 10);
                this.agregarProducto(id);
            }
        });
    }
}
