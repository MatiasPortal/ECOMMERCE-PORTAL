let carrito = [];


const contenedor = document.querySelector("#contenedor");
const modalBody = document.querySelector(".modal-body");
const numeroCarrito = document.querySelector(".numeroCarrito");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const precioTotalCarrito = document.querySelector("#precioTotalCarrito");
const comprarCarrito = document.querySelector(".comprar-carrito");
const inputSearch = document.querySelector("#inputSearch")
const tbody = document.querySelector("tbody")
const btnBuscar = document.querySelector(".btn-buscar")
const cantProductos = document.querySelector(".cant-productos")
const ingresarLogin = document.querySelector(".ingresar-login")
const userError = document.querySelector("#user_error")
const passError = document.querySelector("#pass_error")
const formLogin = document.querySelector(".form-login")
const btnLogin = document.querySelector("#btn-login")
const btnLogout = document.querySelector("#btn-logout")




//fetch a data.json.
const pedirProductos = async() => {
    const result = await fetch("./data.json");
    const datos = await result.json();

    //mostrar productos.
    datos.forEach((producto) => {
        contenedor.innerHTML +=

        `<div class="card border-primary mb-3" style="max-width: 20rem;">
        <img src="${producto.img}" alt="#">
        <div class="card-body">
        <h4 class="card-title">${producto.nombre}</h4>
        <p class="card-text">Precio: $${producto.precio}</p>
    
    
        <button onclick="agregarACarrito(${producto.id})" type="button" class="btn-añadir">AÑADIR A CARRITO</button>
        
        </div>
    </div>`

    })
    
    //mostrar cantidad de productos nuevos.
    let numProd = datos.length;
    cantProductos.innerHTML = `
    Mostrando ${numProd} productos nuevos:`


    //agregar producto al carrito.
    agregarACarrito = (id)=>{

    if(carrito.some ((prod) => prod.id === id)){

    //stackear productos iguales.
    const prod = carrito.findIndex((prod) => {
        if (prod.id === id){
            prod.cantidad++
        }
    }) 

    }else {
    const item = datos.find((prod) => prod.id === id)
    item.cantidad = 1;
    carrito.push(item)
    }

    mostrarCarrito()

    //alerta de agregar producto a carrito.
    Toastify({
        text: "Se agrego un producto al carrito",
        className: "info",
        style: {
        background: "linear-gradient(to right, #37575c, #a7d2d2)",
        },
        offset: {
            x: 20, 
            y: 90 
        },
    }).showToast();
}


}
pedirProductos()




//Armar tabla con productos
const pedirProductosTabla = async() => {
    const result = await fetch("./data.json");
    const datos = await result.json();

    const armadoTabla = (prod) => {
        return `
            <tr>
                <td>${prod.id}</td>
                <td>${prod.nombre}</td>
                <td>$${prod.precio}</td>
            </tr>
        `
    }

    //busqueda de producto
    const buscarProd = () => {
        let text = inputSearch.value.trim().toUpperCase()
        let result = datos.filter(prod => prod.nombre.includes(text))
            if(result.length > 0) {
                cargarTabla(result)
            }
    }

    //cargar tabla con nuevos valores
    const cargarTabla = (array) => {
        let tabla = "";
        if(array.length > 0) {
            array.forEach(prod => {
                tabla += armadoTabla(prod)
            })
            tbody.innerHTML = tabla
        } 
    } 

    inputSearch.addEventListener("search", () => {
        buscarProd()
    })
    
    cargarTabla(datos)

}
pedirProductosTabla()





//mostrar producto en carrito.
const mostrarCarrito = () => {
    modalBody.innerHTML = ""

    carrito.forEach((prod) => {
        modalBody.innerHTML += `
        <div class= "contenedor-modal">
            <div>
                <img class= "img-fluid img-carrito" src="${prod.img}">
            </div>
        <div>
            <p>Producto: ${prod.nombre}</p>
            <p>Cantidad: ${prod.cantidad}</p>
            <p>Precio: $${prod.precio}</p>


            <button onclick="quitarProducto(${prod.id})" class="btn btn-danger">Quitar producto</button>
        </div>
        </div>
        `
    })

    
    //mensaje cuando no hay nada en el carrito.
    carrito.length === 0? 
        modalBody.innerHTML = `
        <p>No tienes nada dentro del carrito.</p>`
    : console.log("Hay productos en el carrito.");

    //mostrar numero cantidad en carrito.
    numeroCarrito.textContent = carrito.length;

    //suma del total carrito.
    precioTotalCarrito.innerHTML = `$${carrito.reduce((accum, prod) => accum + prod.cantidad * prod.precio, 0)}`

    localStorageCarrito()
}



//quitar producto del carrito.
quitarProducto = (id)=>{
    const idRopa = id
    carrito = carrito.filter((ropa) => ropa.id != idRopa)
    mostrarCarrito()

    Toastify({
        text: "Eliminaste un producto del carrito",
        className: "info",
        style: {
        background: "linear-gradient(to right, #b98383, #b13e3e)",
        },
        offset: {
            x: 20, 
            y: 90 
        },
    }).showToast();

}

//boton vaciar carrito.
vaciarCarrito.addEventListener("click", ()=>{
    carrito.length = [];
    mostrarCarrito()
})


//generando localStorage.
localStorageCarrito = ()=>{
    localStorage.setItem("carrito", JSON.stringify(carrito))
}


//para que los productos sigan quedando en localStorage.
document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || []
    mostrarCarrito()
})



//alerta si el carrito esta vacio y le das a comprar
comprarCarrito.addEventListener("click", ()=>{
    if(carrito.length === 0){
        Swal.fire({
            icon: 'error',
            title: 'Carrito vacio',
            text: '¡No tienes nada dentro del carrito!',
        })
    }
    else {
        //realizar el pedido de compra.
        const realizarCompra = async() => {
            const { value: email } = await Swal.fire({
                title: 'Ingrese su email para realizar el pedido',
                input: 'email',
                inputLabel: 'Tu correo electronico',
                inputPlaceholder: 'Ingrese su email'
            })

            if (email) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Gracias por realizar su pedido!',
                    text: `¡Ingresa a ${email} para confirmar su compra!`,
                })

                carrito.length = [];
                mostrarCarrito()
            }
        } 
        realizarCompra()
    } 
}) 



//login user
function login(){
    let user, pass

    user = document.querySelector("#user").value;
    pass = document.querySelector("#password").value;

    if(user == "coderhouse" && pass == "coder1234"){
        Toastify({
            text: "¡Se ha iniciado sesión correctamente!",
            className: "info",
            style: {
            background: "linear-gradient(to right, #2bc3ff, #18b3f1)",
            },
            offset: {
                x: 10, 
                y: 10 
            },
        }).showToast();

        //redireccionar hacia pagina principal
        setTimeout(function() {
            window.location.replace("index.html")
        }, 1800);


        localStorage.usuario = user;


    //error de usuario o contraseña.
    }else if( user != "coderhouse" || pass != "coder1234") {
        userError.style.display = "initial"

    }
}

//mostrar usuario logueado en nav.
showUser = document.querySelector("#show-user").innerHTML = localStorage.usuario || []

//quitar boton login cuando estas logueado
if(localStorage.usuario == undefined) {
    btnLogin.style.display ="initial"

} else if (localStorage.usuario != undefined) {
    btnLogout.style.display = "initial"

}


btnLogout.addEventListener("click", () => {
    localStorage.removeItem("usuario");

    setTimeout(function() {
        location.reload()
        carrito.length = [];
        mostrarCarrito()
    }, 1800);

    Toastify({
        text: "Cerrando sesión...",
        className: "info",
        style: {
        background: "linear-gradient(to right, #b98383, #b13e3e)",
        },
        offset: {
            x: 20, 
            y: 90 
        },
    }).showToast();

})







