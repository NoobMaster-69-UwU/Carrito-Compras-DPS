import { Producto } from "./producto.js";

// Clase que representa el carrito de compras
export class Carrito {
    constructor() {
        this.productos = this.listarProductos(); // Carga los productos almacenados en el carrito
    }

    // Obtiene los productos guardados en localStorage
    listarProductos() {
        const carritoGuardado = localStorage.getItem("carrito");
        if (!carritoGuardado) return []; // Si no hay carrito guardado, retorna un array vacío

        const productosParseados = JSON.parse(carritoGuardado);

        // Convierte los productos almacenados en instancias de la clase Producto
        return productosParseados.map(prod =>
            new Producto(prod.id, prod.nombre, prod.precio, prod.cantidad, prod.imagen)
        );
    }

    // Agrega un producto al carrito
    agregarProducto(producto) {
        const productoExistente = this.productos.find(item => item.id === producto.id);

        if (productoExistente) {
            productoExistente.cantidad += 1; // Si ya existe, incrementa la cantidad
        } else {
            this.productos.push(new Producto(producto.id, producto.nombre, producto.precio, 1, producto.imagen));
        }

        this.guardarCarrito(); // Guarda el carrito actualizado en localStorage
    }

    // Elimina un producto del carrito según su ID
    eliminarProducto(id) {
        this.productos = this.productos.filter(item => item.id !== id);
        this.guardarCarrito(); // Guarda el carrito actualizado
    }

    // Actualiza la cantidad de un producto en el carrito
    actualizarCantProducto(id, cantidad) {
        const producto = this.productos.find(item => item.id === id);
        if (producto) {
            producto.cantidad += cantidad; // Modifica la cantidad del producto
            if (producto.cantidad <= 0) {
                this.eliminarProducto(id); // Si la cantidad es 0 o menor, se elimina el producto
            } else {
                this.guardarCarrito(); // Guarda los cambios en localStorage
            }
        }
    }

    // Calcula el precio total del carrito incluyendo IVA
    calcularPrecioConIVA() {
        const IVA = 0.13; // 13% de impuesto
        return this.productos.reduce((total, producto) => {
            return total + (producto.precio * producto.cantidad * (1 + IVA));
        }, 0);
    }

    // Calcula el precio total del carrito sin IVA
    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.obtenerPrecioTotal(), 0);
    }

    // Vacía el carrito eliminando todos los productos y limpiando localStorage
    limpiarCarrito() {
        this.productos = [];
        localStorage.removeItem("carrito");
    }

    // Guarda el carrito en localStorage
    guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(this.productos));
    }
}