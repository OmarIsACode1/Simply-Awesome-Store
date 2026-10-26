// Clase que representa cada producto individual
class Producto {
    constructor(nombre) {
        this.nombre = nombre;
        this.completa = false; // Estado para saber si está disponible/vendido o activo
    }

    completar() {
        this.completa = !this.completa;
    }
}

// Clase que gestiona la lista de productos y que deja que los productos
// se conserven en la memoria (lo de localStorage)
class Inventario {
    constructor() {
        // Cargamos los datos previos de localStorage si existen,
        // // si no, iniciamos vacío.
        this.productos = JSON.parse(localStorage.getItem('productos')) || [];
        this.render();
    }

    agregarProducto(nombre) {
        if (nombre.trim() === "") {
            alert("El nombre del producto no puede estar vacío.");
            return;
        }
        const nuevoProd = new Producto(nombre);
        this.productos.push
        this.guardarYRenderizar();
    }

    eliminarProducto(index) {
        this.productos.splice(index, 1);
        this.guardarYRenderizar();
    }

    editarProducto(index) {
        const nuevoNombre = prompt("Edita el nombre del producto:", this.productos[index].nombre);
        if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
            this.productos[index].nombre = nuevoNombre;
            this.guardarYRenderizar();
        }
    }

    cambiarEstado(index) {
        this.productos[index].completar();
        this.guardarYRenderizar();
    }

    guardarYRenderizar() {
        // Guardar en LocalStorage
        localStorage.setItem('productos', JSON.stringify(this.productos));
        this.render();
    }

    render() {
        const listaUl = document.getElementById("lista-productos");
        listaUl.innerHTML = "";

    // Uso de forEach (característica ES6+)
        this.productos.forEach((prod, index) => {
            const li = document.createElement("li");
            if (prod.completa) {
                li.classList.add("completa");
            }

            // Uso de template literals para generar el HTML dinámicamente
            li.innerHTML = `
                <span>${prod.nombre}</span>
                <div class="acciones">
                    <button onclick="inventario.cambiarEstado(${index})">✔</button>
                    <button onclick="inventario.editarProducto(${index})">Editar</button>
                    <button onclick="inventario.eliminarProducto(${index})">Eliminar</button>
                </div>
            `;
            listaUl.appendChild(li);
        });
    }
}

// Inicializar el inventario
const inventario = new Inventario();

// Configurar el evento del botón mediante función flecha
document.getElementById("agregar-producto").addEventListener("click", () => {
    const input = document.getElementById("nuevo.producto");
    inventario.agregarProducto(input.value);
    input.value = ""; // Limpiar input
});