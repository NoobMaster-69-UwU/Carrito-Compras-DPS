// Clase que gestiona la visualización del carrito de compras y sus interacciones
export class CarritoVista {
    constructor() {
        // Elementos del DOM relacionados con el carrito y los productos
        this.productosElement = document.getElementById("productos");
        this.carritoElement = document.getElementById("carrito");
        this.totalElement = document.getElementById("total");
        this.modal = document.getElementById("modalCarrito");
        this.abrirCarritoBtn = document.getElementById("abrirCarrito");
        this.cerrarModalBtn = document.querySelector(".cerrar");
        this.pagarBtn = document.getElementById("pagarBtn");

        this.configurarEventos(); // Configura los eventos de los botones
    }

    // Configura los eventos de los botones del carrito
    configurarEventos() {
        this.abrirCarritoBtn.addEventListener("click", () => this.mostrarModal());
        this.cerrarModalBtn.addEventListener("click", () => this.ocultarModal());
        this.pagarBtn.addEventListener("click", () => this.generarFactura());
        window.addEventListener("click", (e) => {
            if (e.target === this.modal) this.ocultarModal(); // Cierra el modal si se hace clic fuera de él
        });
    }

    // Muestra el modal del carrito
    mostrarModal() {
        this.modal.style.display = "flex";
    }

    // Oculta el modal del carrito
    ocultarModal() {
        this.modal.style.display = "none";
    }

    // Renderiza los productos disponibles en la tienda
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

        // Asigna evento de agregar al carrito a cada botón
        document.querySelectorAll(".agregar-al-carrito").forEach(boton => {
            boton.addEventListener("click", () => {
                const id = parseInt(boton.getAttribute("data-id"));
                agregarProductoCallback(id);
            });
        });
    }

    // Renderiza el carrito con los productos añadidos
    mostrarCarrito(productos, total, incrementarProducto, decrementarProducto, eliminarProducto) {
        this.carritoElement.innerHTML = ""; // Limpia el contenido previo

        productos.forEach((producto) => {
            const productoElemento = document.createElement("div");
            productoElemento.classList.add("producto-carrito");
            productoElemento.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
                <div class="detalles">
                    <p>${producto.nombre}</p>
                    <p>Precio: $${producto.precio}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                </div>
                <div class="acciones">
                    <button class="btn-decremento" data-id="${producto.id}">-</button>
                    <button class="btn-incremento" data-id="${producto.id}">+</button>
                    <button class="btn-eliminar" data-id="${producto.id}">X</button>
                </div>
            `;
            this.carritoElement.appendChild(productoElemento);
        });

        // Muestra el total del carrito
        this.totalElement.textContent = `Total: $${total}`;

        // Asigna eventos a los botones de modificar productos
        document.querySelectorAll(".btn-incremento").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = parseInt(e.target.getAttribute("data-id"));
                incrementarProducto(id);
            });
        });

        document.querySelectorAll(".btn-decremento").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = parseInt(e.target.getAttribute("data-id"));
                decrementarProducto(id);
            });
        });

        document.querySelectorAll(".btn-eliminar").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = parseInt(e.target.getAttribute("data-id"));
                eliminarProducto(id);
            });
        });
    }

    // Genera una factura en formato PDF con los productos del carrito
    generarFactura() {
        if (this.carritoElement.children.length === 0) {
            alert("El carrito está vacío. Agregue productos antes de pagar.");
            return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Factura de Compra", 10, 10);
        let y = 20;
        
        this.carritoElement.querySelectorAll(".producto-carrito").forEach((productoElemento) => {
            const nombre = productoElemento.querySelector(".detalles p").textContent;
            const precio = productoElemento.querySelector(".detalles p:nth-child(2)").textContent;
            const cantidad = productoElemento.querySelector(".detalles p:nth-child(3)").textContent;
            doc.text(`${nombre} - ${precio} x ${cantidad}`, 10, y);
            y += 10;
        });
        
        doc.text(`Total: ${this.totalElement.textContent}`, 10, y + 10);
        doc.save("factura.pdf"); // Guarda el PDF con el nombre "factura.pdf"
    }
}