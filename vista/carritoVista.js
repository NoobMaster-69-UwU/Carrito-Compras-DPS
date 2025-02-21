export class CarritoVista {
    constructor() {
        this.productosElement = document.getElementById("productos");
        this.carritoElement = document.getElementById("carrito");
        this.totalElement = document.getElementById("total");
        this.modal = document.getElementById("modalCarrito");
        this.abrirCarritoBtn = document.getElementById("abrirCarrito");
        this.cerrarModalBtn = document.querySelector(".cerrar");
        this.pagarBtn = document.getElementById("pagarBtn");

        this.configurarEventos();
    }

    configurarEventos() {
        this.abrirCarritoBtn.addEventListener("click", () => this.mostrarModal());
        this.cerrarModalBtn.addEventListener("click", () => this.ocultarModal());
        this.pagarBtn.addEventListener("click", () => this.generarFactura());
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
            });
        });
    }

    mostrarCarrito(productos, total, incrementarProducto, decrementarProducto, eliminarProducto) {
        this.carritoElement.innerHTML = ""; // Limpiar contenido previo

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

        // Mostrar total
        this.totalElement.textContent = `Total: $${total}`;

        // Asignar eventos a los botones después de renderizar los productos
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
        doc.save("factura.pdf");
    }
}
