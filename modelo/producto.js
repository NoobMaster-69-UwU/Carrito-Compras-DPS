export class Producto{

    //Definición del constructor con las propiedades del Producto
    
    constructor(id, nombre, imagen, precio, cantidad){
        this.id = id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = precio;
        this.cantidad = cantidad;
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
    
    obtenerPrecioTotal() {
        return this.precio * this.cantidad;
    }
}