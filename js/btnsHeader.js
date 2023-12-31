//Accedemos al boton menú de mi index, el cual resetea todo y solo deja los tres botones principales: catálogo, descuento, agregar y eliminar productos
let btnMenu = document.getElementById("inicioBtnID")
btnMenu.addEventListener("click", () => {
    productosDiv.innerHTML = ``
    productosAgotados.innerText = ``
    presupuesto.innerText = ``
    oculCatalogoBtn.innerText = ``
    filtroCatalogo.innerText = ``
    descuentoSeccion.innerText = ``
    aeProductosSeccion.innerText = ``
    modalBodyCarrito.innerText = ``
    carritoTotal.innerText = ``
})

//Botón carrito
let productosEnCarrito 
if(localStorage.getItem("carrito")){
   productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
   //No esta en el storage
   productosEnCarrito = []
   localStorage.setItem("carrito", productosEnCarrito)
}

//Agregamos productos a nuestro array del carrito
function agregarAlCarrito(producto){
    let productoAgregado = productosEnCarrito.find((elem)=>elem.codigo == producto.codigo) 
    if(productoAgregado == undefined){
       //Sumamos al carrito el producto
       productosEnCarrito.push(producto)
       localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
 
       //Alert que indica que ya se agregó el producto seleccionado
       Swal.fire({
          title: `Ha agregado un producto al carrito.`,
          text:`${producto.producto} ha sido agregado.`,
          confirmButtonColor: "black",
          confirmButtonText : "Gracias",
          imageUrl: `imagenes/${producto.imagen}`,
          imageHeight: 200
 
       })
    }else{
       //El producto seleccionado ya está en el carrito
       Swal.fire({
          title: `${producto.producto} ya existe en el carrito`,
          icon: "info",
          timer: 2000,
          showConfirmButton: false
 
       })
    }
}

//Aparecen cards mostrando los productos del carrito 
let modalBodyCarrito = document.getElementById("carrito")
let carritoTotal = document.getElementById("totalCarritoID")
function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ``
    array.forEach((productoCarrito)=>{
       modalBodyCarrito.innerHTML += `<div id="productoCarrito${productoCarrito.codigo}" class="col-12 col-xl-3 card cardCarrito" style="width: 18rem;">
        <div class="">
            <img class="card-img-top img-fluid" style="height: 200px;" src="imagenes/${productoCarrito.imagen}" alt="${productoCarrito.imagen}">
            <div class="card-body"> 
                <h4>${productoCarrito.producto}</h4>
                <p>MARCA: ${productoCarrito.marca}</p>
                <p>PRECIO: $${productoCarrito.precio}</p>
                <p>TALLA O DIMENSIONES: ${productoCarrito.talla}</p>
                <button id="botonEliminar${productoCarrito.codigo}" class="btn btn-danger">Eliminar producto</button>
            </div>
        </div>
    </div>`
    })
    //Funcionamiento del botón eliminar producto
    array.forEach((productoCarrito) => {
       document.getElementById(`botonEliminar${productoCarrito.codigo}`).addEventListener("click", () => {
          //Se borra del DOM
          let cardProducto = document.getElementById(`productoCarrito${productoCarrito.codigo}`)
          cardProducto.remove()
          //Se borra del array del carrito
          let productoEliminar = array.find((producto) => producto.codigo == productoCarrito.codigo)
          let posicion = array.indexOf(productoEliminar)
          array.splice(posicion,1)
          //Actualizamos el storage
          localStorage.setItem("carrito", JSON.stringify(array))
 
          //Calculamos el total
          calcularTotal(array)
       })
    })
    calcularTotal(array)
    
 }
 
 //Función para calcular el total de los productos del carrito
 function calcularTotal(array){
    let total = array.reduce((acc, productoCarrito)=> acc + productoCarrito.precio , 0)
    if(total == 0){
        Swal.fire({
            title: `No hay productos en el carrito`,
            icon: "warning",
            timer: 2000,
            showConfirmButton: false
         })
         carritoTotal.innerText = ``
    }
    else{
        carritoTotal.innerHTML = `<div class="totalCarrito">
            <h3>El total es $<strong>${total}</strong></h3>
        </div>`
    }
 }

//El botón del carrito resetea para que solo aparezcan las cards de los productos del carrito y el total
let btnCarrito = document.getElementById("carritoBtnID")
btnCarrito.addEventListener("click", () => {
    productosDiv.innerHTML = ``
    productosAgotados.innerText = ``
    presupuesto.innerText = ``
    oculCatalogoBtn.innerText = ``
    filtroCatalogo.innerText = ``
    descuentoSeccion.innerText = ``
    aeProductosSeccion.innerText = ``
    carritoTotal.innerText = ``
    cargarProductosCarrito(productosEnCarrito)
})