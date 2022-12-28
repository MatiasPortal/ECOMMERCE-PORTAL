let productos = [
    {
        nombre:"Remera VANS",
        precio: 7500,
        img: "./imagenes/remera.jpg",
        id: 1,
    },
    {
        nombre:"Jean LEVIS",
        precio: 18000,
        img: "./imagenes/jean.jpg",
        id: 2,
    },
    {
        nombre:"Buzo NIKE",
        precio: 11000,
        img: "./imagenes/buzo.jpg",
        id: 3,
    },
    {
        nombre:"Campera NIKE",
        precio: 13000,
        img: "./imagenes/campera.jpg",
        id: 4,
    },
    {
        nombre:"Zapatilla VANS",
        precio: 16000,
        img: "./imagenes/zapatilla.jpg",
        id: 5,
    },
    {
        nombre:"Chomba LACOSTE",
        precio: 12000,
        img: "./imagenes/chomba.jpg",
        id: 6,
    },
]


let carrito = [];


const contenedor = document.querySelector("#contenedor");
const numeroCarrito = document.querySelector(".numeroCarrito");
const vaciarCarrito = document.querySelector("#vaciar-carrito");

//para que los productos sigan quedando en localStorage.
document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || []
    mostrarEnCarrito()
})


//agrego los productos al HTML.
productos.forEach((product) => {
    const {nombre, precio, img, id} = product
    contenedor.innerHTML +=

    `<div class="card border-primary mb-3" style="max-width: 20rem;">
    <img src="${img}" alt="#">
    <div class="card-body">
    <h4 class="card-title">${nombre}</h4>
    <p class="card-text">Precio: $${precio}</p>


    <button onclick="agregarACarrito(${id})" type="button" class="btn-añadir">AÑADIR A CARRITO</button>
    
    </div>
</div>`
});

//Poder agregar a carrito a traves de .push
agregarACarrito = (id) =>{
    const item = productos.find((prod) => prod.id === id)
    carrito.push(item)
    mostrarEnCarrito()
}

//mostrar productos en carrito.
const mostrarEnCarrito = ()=> {
    const modalBody = document.querySelector(".modal-body")

    modalBody.innerHTML = ""
    carrito.forEach((prod) =>{
        const {nombre, precio, img, id} = prod;
        modalBody.innerHTML += `
        <div class= "contenedor-modal">
            <div>
                <img class= "img-fluid img-carrito" src="${img}"
            </div>
        <div>
            <p>Producto: ${nombre}</p>
            <p>Precio: ${precio}</p>


            <button onclick="quitarProducto(${id})" class="btn btn-danger">Quitar producto</button>
        </div>
        </div>
        `
    })

    carrito.length === 0? modalBody.innerHTML = `
    <p>No tienes nada dentro del carrito.</p>
    ` : console.log("Hay productos en el carrito.");

    numeroCarrito.textContent = carrito.length;

    localStorageCarrito()

}


//quitar producto del carrito.
quitarProducto = (id)=>{
    const idRopa = id
    carrito = carrito.filter((ropa) => ropa.id != idRopa)
    mostrarEnCarrito()
}

//btn vaciar carrito.
vaciarCarrito.addEventListener("click", () => {
    carrito.length = []
    mostrarEnCarrito()
})


//generando localStorage.
localStorageCarrito = ()=>{
    localStorage.setItem("carrito", JSON.stringify(carrito))
}



