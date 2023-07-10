//Class constructora de mi catálogo
class Producto{
    constructor(producto, categoria, marca, precio, talla, codigo, imagen){
        this.producto = producto,
        this.categoria = categoria,
        this.marca = marca,
        this.precio = precio,
        this.talla = talla,
        this.codigo = codigo, 
        this.imagen = imagen
    }
}

const producto1 = new Producto("Vestido de rayas azul con amarillo", "vestidos", "Tommy Hilfiger", 600, "mediana", 1, "vestidoAzulTommy.png")
const producto2 = new Producto("Vestido de blanco con rosa y corte v", "vestidos", "Tommy Hilfiger", 650, "mediana", 2, "vestidoBlancorosaTommy.png")
const producto3 = new Producto("Vestido largo color vino", "vestidos", "Tommy Hilfiger", 800, "grande", 3, "vestidoVinoTommy.png")
const producto4 = new Producto("Vestido azul", "vestidos", "Guess", 550, "chico", 4, "vestidoAzulGuess.png")
const producto5 = new Producto("Vestido negro con flores", "vestidos", "Michael Kors", 950, "6", 5, "vestidoFloresMK.png")
const producto6 = new Producto("Vestido negro", "vestidos", "Guess", 800, "chico", 6, "vestidoNegroGuess.png")
const producto7 = new Producto("Bolsa Crossbody azul", "bolsas", "Tommy Hilfiger", 650, "20cm * 18cm * 15cm", 7, "bolsaCBAzulTommy.png")
const producto8 = new Producto("Bolsa Crossbody negra", "bolsas", "Nautica", 550, "25cm * 15cm * 12cm", 8, "bolsaNegraNautica.png")
const producto9 = new Producto("Bolsa Crossbody roja", "bolsas", "Karl Lagerfeld", 850, "8cm * 15cm * 1.5cm", 9, "bolsaCBRojaKL.png")
const producto10 = new Producto("Mochila blanca", "bolsas", "Karl Lagerfeld", 1050, "20cm * 30cm * 15cm", 10, "mochilaBlancaKL.png")
const producto11 = new Producto("Bolsa Crossbody café", "bolsas", "Karl Lagerfeld", 850, "8cm * 15cm * 1.5cm", 11, "bolsaCBCafeKL.png")
const producto12 = new Producto("Cartera azul", "bolsas", "Tommy Hilfiger", 600, "9cm * 7.5cm * 2cm", 12, "carteraAzulTommy.png")

//Creamos nuestro catálogo y le agregamos algunos productos
let catalogoProductos = [] 
if(localStorage.getItem("catalogoProductos")){
  catalogoProductos = JSON.parse(localStorage.getItem("catalogoProductos"))
}else{
  catalogoProductos.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12)
  localStorage.setItem("catalogoProductos", JSON.stringify(catalogoProductos)) 
}


//Parte del DOM (inicial)
let productosDiv = document.getElementById("catProductos")
let catalogoCards = document.getElementById("botonesPri__cda--catalogo")
let oculCatalogoBtn = document.getElementById("oculCatalogo")
let filtroCatalogo = document.getElementById("filtroProductos")
let productosAgotados = document.getElementById("productosAgotados")
let presupuesto = document.getElementById("presupuesto")


//Función para mostrar los elementos de un array en cards
function mostrarCatalogo(array){
    productosDiv.innerHTML = ``
    for(let i=0; i<array.length; i++){
        let productoNuevoDiv = document.createElement("div")
        productoNuevoDiv.className = "col-12 col-xl-3 cardProducto"
        productoNuevoDiv.innerHTML = `<div id="${array[i].codigo}" class="card" style="width: 18rem;">
        <img class="card-img-top img-fluid" style="height: 200px;" src="imagenes/${array[i].imagen}" alt="${array[i].producto} de ${array[i].marca}">
        <div class="card-body"> 
          <h7 class="card-title">${array[i].producto}</h7>
          <p class="card-marca">MARCA: ${array[i].marca}</p>
          <p class="card-precio">PRECIO: $${array[i].precio}</p>
          <p class="card-talla">TALLA O DIMENSIONES: ${array[i].talla}</p>
          <button id="agregarPro${array[i].codigo}" class="btn btn-outline-success">Agregar al carrito</button>
          <p>Código: ${array[i].codigo}</p>
          </div>
      </div>`

      productosDiv.appendChild(productoNuevoDiv)

      let agregarPro = document.getElementById(`agregarPro${array[i].codigo}`)
      agregarPro.addEventListener("click", () => {
        agregarAlCarrito(array[i])
      })
    }
  }

  //Función que oculta el cátalogo, y todos los botones relacionados a él
  function ocultarCatalogoBoton(){
    let ocultarCatalogoBtn = document.createElement("div")
    ocultarCatalogoBtn.className = "oculCataBtn"
    ocultarCatalogoBtn.innerHTML = `<div class="oculDiv">
    <button class="btnOculDiv" id="btnOcul">Ocultar catálogo</button>
    </div>`
    oculCatalogoBtn.appendChild(ocultarCatalogoBtn)
    let botonOculCat = document.getElementById("btnOcul")
    botonOculCat.addEventListener("click", () => {
      productosDiv.innerHTML = ``
      oculCatalogoBtn.innerText = ``
      filtroCatalogo.innerText = ``
      productosAgotados.innerText = ``
      presupuesto.innerText = ``
    })
  }


  //Funcionamiento del botón Catálogo
catalogoCards.addEventListener("click", ()=>{
    descuentoSeccion.innerText = ``
    aeProductosSeccion.innerText = ``
    modalBodyCarrito.innerText = ``
    carritoTotal.innerText = ``
    localStorage.setItem("catalogo", JSON.stringify(catalogoProductos))
    filtrarPor()
    mostrarCatalogo(catalogoProductos)
    ocultarCatalogoBoton()
 })