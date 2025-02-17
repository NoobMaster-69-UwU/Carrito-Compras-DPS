export class Producto{

    //Definición del constructor con las propiedades del Producto
    
    constructor(id, nombre, precio, cantidad, imagen){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.imagen = imagen;
    }

    obtenerPrecioTotal() {
        return this.precio * this.cantidad;
    }
    
    aumentarCantidad(){
        this.cantidad += 1;
        return this.cantidad;
    }

    disminuirCantidad() {
        if (this.cantidad > 1) {
            this.cantidad -= 1;
            return this.cantidad;
        }
        return 0; // Indica que el producto debe eliminarse
    }
    
    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.obtenerPrecioTotal(), 0);
    }
}