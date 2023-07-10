
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


let productosEnCarrito 
if(localStorage.getItem("carrito")){
   //cuando ya existe algo en el storage con la clave carrito
   productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
   //no existe nada en el storage
   productosEnCarrito = []
   localStorage.setItem("carrito", productosEnCarrito)
}

function agregarAlCarrito(producto){
    //preguntar si existe ese libro en el array
    let productoAgregado = productosEnCarrito.find((elem)=>elem.codigo == producto.codigo) 
    //me devuelve sino encuentra undefined, si encuenta el elemento
    if(productoAgregado == undefined){
       //código para sumar al array carrito
       productosEnCarrito.push(producto)
       localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
 
       //alert para agregar libro
       Swal.fire({
          title: `Ha agregado un producto al carrito`,
          text:`${producto.producto} ha sido agregado.`,
          confirmButtonColor: "black",
          confirmButtonText : "Gracias",
          imageUrl: `imagenes/${producto.imagen}`,
          imageHeight: 200
 
       })
    }else{
       //sumar uno a cantidad
       // console.log(`El libro ${libro.titulo} ya existe en el carrito `)
 
       //Sweetalert 
       Swal.fire({
          title: `${producto.producto} ya existe en el carrito`,
          icon: "info",
          //tiempo de aparición: en milisegundos
          timer: 2000,
          showConfirmButton: false
 
       })
    }
}


let modalBodyCarrito = document.getElementById("carrito")
let carritoTotal = document.getElementById("totalCarritoID")
function cargarProductosCarrito(array){
    modalBodyCarrito.innerHTML = ``
    //primer for each imprime las card
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
    //segundo for each adjunta evento eliminar
    array.forEach((productoCarrito) => {
       //manipular el DOM sin guardar en variable
       document.getElementById(`botonEliminar${productoCarrito.codigo}`).addEventListener("click", () => {
          //borrar del DOM
          let cardProducto = document.getElementById(`productoCarrito${productoCarrito.codigo}`)
          cardProducto.remove()
          //borrar del array
          //encontramos objeto a eliminar
          let productoEliminar = array.find((producto) => producto.codigo == productoCarrito.codigo)
          //buscar indice
          let posicion = array.indexOf(productoEliminar)
          array.splice(posicion,1)
          //setear storage
          localStorage.setItem("carrito", JSON.stringify(array))
 
          //debemos calcularTotal??
          calcularTotal(array)
       })
    })
    calcularTotal(array)
    
 }
 
 function calcularTotal(array){
    //método reduce 
    //DOS PARAMETROS: primero la function y segundo valor en el que quiero inicializar el acumulador
    let total = array.reduce((acc, productoCarrito)=> acc + productoCarrito.precio , 0)
    if(total == 0){
        Swal.fire({
            title: `No hay productos en el carrito`,
            icon: "warning",
            //tiempo de aparición: en milisegundos
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