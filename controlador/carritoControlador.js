import { Carrito } from "../modelo/carrito.js";
import { Producto } from "../modelo/producto.js";

export class CarritoControlador {
    constructor(vista) {
        this.carrito = new Carrito();
        this.vista = vista;

        if (!localStorage.getItem("productosDisponibles")) {
            this.cargarProductos();
        }

        this.actualizarVistaCarrito(); // Llamamos la función al iniciar
        this.agregarEventosBotones(); // Agrega eventos a los botones
    }

    async cargarProductos() {
        try {
            const respuesta = await fetch("../productos/productos.json");
            if (!respuesta.ok) throw new Error(`HTTP error! Status: ${respuesta.status}`);

            const productos = await respuesta.json();
            localStorage.setItem("productosDisponibles", JSON.stringify(productos));
            this.vista.mostrarProductos(productos, this.agregarProducto.bind(this));
        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    }

    actualizarVistaCarrito() {
        this.vista.mostrarCarrito(
            this.carrito.productos,
            this.carrito.calcularTotal(),
            this.incrementarProducto.bind(this),
            this.decrementarProducto.bind(this),
            this.eliminarProducto.bind(this)
        );
    }

    agregarProducto(id) {
        let productosDisponibles = JSON.parse(localStorage.getItem("productosDisponibles")) || [];
        let productoEnStock = productosDisponibles.find(p => p.id === id);

        if (productoEnStock && productoEnStock.stock > 0) {
            let producto = new Producto(id, productoEnStock.nombre, productoEnStock.precio, 1, productoEnStock.imagen);
            this.carrito.agregarProducto(producto);
            productoEnStock.stock -= 1;
            localStorage.setItem("productosDisponibles", JSON.stringify(productosDisponibles));

            document.getElementById(`stock-${id}`).textContent = productoEnStock.stock;
        } else {
            alert("No hay stock disponible.");
        }

        this.actualizarVistaCarrito();
    }

    incrementarProducto(id) {
        let productosDisponibles = JSON.parse(localStorage.getItem("productosDisponibles")) || [];
        let productoEnStock = productosDisponibles.find(p => p.id === id);

        if (productoEnStock && productoEnStock.stock > 0) {
            this.carrito.actualizarCantProducto(id, 1);
            productoEnStock.stock -= 1;
            localStorage.setItem("productosDisponibles", JSON.stringify(productosDisponibles));
        }

        this.actualizarVistaCarrito();
    }

    decrementarProducto(id) {
        let productosDisponibles = JSON.parse(localStorage.getItem("productosDisponibles")) || [];
        let productoEnStock = productosDisponibles.find(p => p.id === id);

        if (productoEnStock) {
            this.carrito.actualizarCantProducto(id, -1);
            productoEnStock.stock += 1;
            localStorage.setItem("productosDisponibles", JSON.stringify(productosDisponibles));
        }

        this.actualizarVistaCarrito();
    }

    eliminarProducto(id) {
        let productosDisponibles = JSON.parse(localStorage.getItem("productosDisponibles")) || [];
        let producto = this.carrito.productos.find(p => p.id === id);   
        if (producto) {
            let productoEnStock = productosDisponibles.find(p => p.id === id);
            if (productoEnStock) {
                productoEnStock.stock += producto.cantidad;
                localStorage.setItem("productosDisponibles", JSON.stringify(productosDisponibles));

                document.getElementById(`stock-${id}`).textContent = productoEnStock.stock;
            }
        }
        this.carrito.eliminarProducto(id);

        this.actualizarVistaCarrito();
    }

    /**
     * Simula el pago del carrito.
     */
    pagarCarrito() {
        if (this.carrito.productos.length === 0) {
            atob();
            return;
        }

        const totalConIVA = this.carrito.calcularPrecioConIVA().toFixed(2);

        const confirmacion = confirm(`Total a pagar: $${totalConIVA}\n¿Deseas proceder con el pago?`);
        if (confirmacion) {
            alert("Pago exitoso. ¡Gracias por tu compra!");
            this.carrito.limpiarCarrito();
            this.actualizarVistaCarrito();
        }
    }

    /**
     * Agrega el evento al botón de pago después de cargar el DOM.
     */
    agregarEventosBotones() {
        const botonPagar = document.getElementById("pagarBtn");
        if (botonPagar) {
            botonPagar.addEventListener("click", () => {
                this.pagarCarrito();
            });
        } else {
            console.error("Error: No se encontró el botón de pagar.");
        }
    }
}
