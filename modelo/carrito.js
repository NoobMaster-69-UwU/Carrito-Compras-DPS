export class Carrito{
    constructor(){
        this.productos;
    }


    //Metodos del Carrito de Compras

    agregarProducto(producto){
        const ProductoExistente = this.productos.find(item => item.nombre === producto.nombre);
        if (ProductoExistente){
            ProductoExistente.aumentarCantidad();
        } else {
            this.productos.push(producto);
        }
    }

    eliminarProducto(nombreProd){
        this.productos = this.productos.filter(item => item.nombre !== nombreProd);
    }

    actualizarCantProducto (){

    }

    // Método para calcular el precio con IVA
    calcularPrecioConIVA() {
        const IVA = 0.13; // 13% de IVA
        return this.precio * (1 + IVA);
    }

    calcTotal(){

    }

    limpiarCarrito(){
        
    }
}

