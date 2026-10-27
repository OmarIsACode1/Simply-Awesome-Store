// Clase que representa cada producto individual
class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
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

    agregarProducto(nombre, precio, stock) {
        if (nombre.trim() === "" || precio === "" || stock === "") {
            alert("Por favor completa los 3 campos (nombre, precio, stock).");
            return;
        }
        const nuevoProd = new Producto(nombre, Number(precio), Number(stock));
        this.productos.push(nuevoProd);
        this.guardarYRenderizar();
    }

    eliminarProducto(index) {
        this.productos.splice(index, 1);
        this.guardarYRenderizar();
    }

    editarProducto(index) {
        const nuevoNombre = prompt("Edita el nombre del producto:", this.productos[index].nombre);
        const nuevoPrecio = prompt("Edita el precio del producto:", this.productos[index].precio);
        const nuevoStock = prompt("Edita el stock del producto:", this.producto[index].stock);
        if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
            this.productos[index].nombre = nuevoNombre;
            this.guardarYRenderizar();
        }
        if (nuevoPrecio !== null && nuevoPrecio.trim() !== "") {
            this.productos[index].precio = Number(nuevoPrecio);
        }
        if (nuevoStock !== null && nuevoStock.trim() !== "") {
            this.productos[index].stock = Number(nuevoStock);
        }
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

            // Uso de template literals para generar el HTML dinámicamente
            li.innerHTML = `
                <span><strong>${prod.nombre}</strong> - $${prod.precio.toFixed(2)}</span>
                <div class="acciones">
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
    const inputNombre = document.getElementById("nuevo-producto");
    const inputPrecio = document.getElementById("precio-producto");
    const inputStock = document.getElementById("stock-producto");
    inventario.agregarProducto(inputNombre.value, inputPrecio.value, inputStock.value);
    // Limpiar inputs
    inputNombre.value = "";
    inputPrecio.value = "";
    inputStock.value = "";
});