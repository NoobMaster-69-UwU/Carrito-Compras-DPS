export class Carrito{
    constructor(){
        this.productos = [];
    }


    //Metodos del Carrito de Compras

    agregarProducto(){

    }

    eliminarProducto(){

    }

    actualizarCantProducto (){

    }

    // Método para calcular el precio con IVA
    calcularPrecioConIVA() {
        const IVA = 0.13; // 13% de IVA
        return this.precio * (1 + IVA);
    }

    calcTotal(){
        return this.calcularPrecioConIVA() * this.cantidad;

    }

    limpiarCarrito(){
        
    }
}

