// Clase que representa un producto dentro del carrito
export class Producto {

    // Constructor que inicializa las propiedades del producto
    constructor(id, nombre, precio, cantidad, imagen) {
        this.id = id; // Identificador único del producto
        this.nombre = nombre; // Nombre del producto
        this.precio = precio; // Precio unitario del producto
        this.cantidad = cantidad; // Cantidad del producto en el carrito
        this.imagen = imagen; // URL de la imagen del producto
    }

    // Calcula el precio total del producto basado en su cantidad
    obtenerPrecioTotal() {
        return this.precio * this.cantidad;
    }
    
    // Aumenta la cantidad del producto en una unidad
    aumentarCantidad() {
        this.cantidad += 1;
        return this.cantidad;
    }

    // Disminuye la cantidad del producto en una unidad, si es mayor a 1
    disminuirCantidad() {
        if (this.cantidad > 1) {
            this.cantidad -= 1;
            return this.cantidad;
        }
        return 0; // Retorna 0 para indicar que el producto debe eliminarse del carrito
    }
    
    // Calcula el total del carrito sumando los precios de los productos
    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.obtenerPrecioTotal(), 0);
    }
}