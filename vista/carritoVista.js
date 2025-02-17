export class CarritoVista {
    constructor(carrito, controlador) {
        this.carrito = carrito;
        this.controlador = controlador;
        this.productosElement = document.getElementById("productos");
        this.carritoElement = document.getElementById("carrito");
        this.totalElement = document.getElementById("total");
        this.modal = document.getElementById("modalCarrito");
        this.abrirCarritoBtn = document.getElementById("abrirCarrito");
        this.cerrarModalBtn = document.querySelector(".cerrar");

        this.configurarEventos();
    }

    configurarEventos() {
        this.abrirCarritoBtn.addEventListener("click", () => this.mostrarModal());
        this.cerrarModalBtn.addEventListener("click", () => this.ocultarModal());
        window.addEventListener("click", (e) => {
            if (e.target === this.modal) this.ocultarModal();
        });
    }

    mostrarModal() {
        this.modal.style.display = "flex";
    }

    ocultarModal() {
        this.modal.style.display = "none";
    }
    
    mostrarProductos(productos, agregarProductoCallback) {
        this.productosElement.innerHTML = "";
        productos.forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3 class="card-title">${producto.nombre}</h3>
                <p class="price">$${producto.precio}</p>
                <button class="btn btn-outline-success agregar-al-carrito" data-id="${producto.id}">Agregar al Carrito</button>
            `;
            this.productosElement.appendChild(card);
        });

        document.querySelectorAll(".agregar-al-carrito").forEach(boton => {
            boton.addEventListener("click", () => {
                const id = parseInt(boton.getAttribute("data-id"));
                agregarProductoCallback(id);
                this.mostrarCarrito(this.productos, this.carrito.calcularTotal());
            });
        });
    }

    mostrarCarrito(productos, total) {
        this.carritoElement.innerHTML = "";
        if (productos.length === 0) {
            this.carritoElement.innerHTML = "No hay productos en el carrito";
        } else {
            productos.forEach(producto => {
                const item = document.createElement("div");
                item.classList.add("list-group-item");
                item.innerHTML = `
                    <img src="${producto.imagen}" width="50"> 
                    ${producto.nombre} - $${producto.precio} x ${producto.cantidad}
                `;
                this.carritoElement.appendChild(item);
                
            });
        }
        this.totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
}