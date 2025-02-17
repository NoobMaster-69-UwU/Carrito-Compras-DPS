import { Carrito } from "../modelo/carrito.js";
import { Producto } from "../modelo/producto.js";

export class CarritoControlador {
    constructor(vista) {
        this.carrito = new Carrito();
        this.vista = vista;

        if (!localStorage.getItem("productosDisponibles")) {
            this.cargarProductos();
        }

        this.vista.mostrarCarrito(this.carrito.productos, this.carrito.calcularTotal());
    }

    async cargarProductos() {
        try {
            const respuesta = await fetch("../productos/productos.json");

            if (!respuesta.ok) {
                throw new Error(`HTTP error! Status: ${respuesta.status}`);
            }
        
            const productos = await respuesta.json();

            localStorage.setItem("productosDisponibles", JSON.stringify(productos));
            this.vista.mostrarProductos(productos, this.agregarProducto.bind(this));
        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    }

    agregarProducto(id) {
        let productosDisponibles = JSON.parse(localStorage.getItem("productosDisponibles")) || [];
        let productoEnStock = productosDisponibles.find(p => p.id === id);

        if (productoEnStock && productoEnStock.stock > 0) {
            let producto = new Producto(id, productoEnStock.nombre, productoEnStock.precio, productoEnStock.stock, productoEnStock.imagen);
            this.carrito.agregarProducto(producto);
            productoEnStock.stock -= 1;
            localStorage.setItem("productosDisponibles", JSON.stringify(productosDisponibles));
            this.vista.mostrarCarrito(this.carrito.productos, this.carrito.calcularTotal());
        } else {
            alert("No hay stock disponible.");
        }
    }

    aumentarCantidadProducto(id) {
        if (this.carrito.aumentarCantidadProducto(id)) {
            this.vista.mostrarCarrito(this.carrito.productos, this.carrito.calcularTotal());
        }
    }

    disminuirCantidadProducto(id) {
        if (this.carrito.disminuirCantidadProducto(id)) {
            this.vista.mostrarCarrito(this.carrito.productos, this.carrito.calcularTotal());
        }
    }

    eliminarProducto(id) {
        this.carrito.eliminarProducto(id);
        this.vista.mostrarCarrito(this.carrito.productos, this.carrito.calcularTotal());
    }
}
