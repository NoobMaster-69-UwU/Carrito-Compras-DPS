import { Producto } from "./producto.js";

export class Carrito {
    constructor() {
        this.productos = this.listarProductos();
    }

    listarProductos() {
        const carritoGuardado = localStorage.getItem("carrito");
        if (!carritoGuardado) return [];
    
        const productosParseados = JSON.parse(carritoGuardado);
        
        return productosParseados.map(prod => 
            new Producto(prod.id, prod.nombre, prod.precio, prod.cantidad, prod.imagen)
        );
    }

    agregarProducto(producto) {
        const productoExistente = this.productos.find(item => item.id === producto.id);
        
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            this.productos.push(new Producto(producto.id, producto.nombre, producto.precio, 1, producto.imagen));
        }
        
        this.guardarCarrito();
    }

    aumentarCantidadProducto(id) {
        const producto = this.productos.find(item => item.id === id);
        if (producto) {
            producto.cantidad += 1;
            this.guardarCarrito();
            return true;
        }
        return false;
    }

    disminuirCantidadProducto(id) {
        const producto = this.productos.find(item => item.id === id);
        if (producto) {
            producto.cantidad -= 1;
            if (producto.cantidad <= 0) {
                this.eliminarProducto(id);
                return true;
            } else {
                this.guardarCarrito();
                return false;
            }
        }
        return false;
    }

    eliminarProducto(id) {
        this.productos = this.productos.filter(item => item.id !== id);
        this.guardarCarrito();
    }

    calcularTotal() {
        return this.productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    }

    limpiarCarrito() {
        this.productos = [];
        localStorage.removeItem("carrito");
    }

    guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(this.productos));
    }
}