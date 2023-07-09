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

let catalogoProductos = [] 
 
if(localStorage.getItem("catalogoProductos")){
    //si existe la key estanteria en el storage, va a entrar aca
    // console.log("Ya existe la key estanteria")
    //cuando no es la primera vez, me traigo lo de storage
    catalogoProductos = JSON.parse(localStorage.getItem("catalogoProductos"))
}else{
    console.log(`ENTRA POR PRIMERA VEZ. SETEAMOS ARRAY`)
    catalogoProductos.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12)
    localStorage.setItem("catalogoProductos", JSON.stringify(catalogoProductos))
}

let productosDiv = document.getElementById("catProductos")
let verCatalogo = document.getElementById("botonesPri__cda--catalogo")
let oculCatalogoBtn = document.getElementById("oculCatalogo")
let filtroCatalogo = document.getElementById("filtroProductos")

function mostrarCatalogo(array){
  let filtroProductosDiv = document.createElement("div")
  filtroProductosDiv.className = "filtroProductosDiv"
  filtroProductosDiv.innerHTML = `<div class="container">
    <h7 id="filtroDiv__texto" class="col-12 col-xl-3"> Filtrar por: </h7>

    <div class="col-12 col-xl-3">
      <button class="btn btn-secondary dropdown-toggle btnFiltroCategoria" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Categoría
      </button>
      <ul class="dropdown-menu dropdown-menu-dark">
        <li><a class="dropdown-item active">Todos los productos</a></li>
        <li><a class="dropdown-item">Bolsas</a></li>
        <li><a class="dropdown-item">Camisas</a></li>
        <li><a class="dropdown-item">Cremas y lociones</a></li>
        <li><a class="dropdown-item">Vestidos</a></li>
        <li><a class="dropdown-item">Zapatos</a></li>
      </ul>
    </div>

    <div class="col-12 col-xl-3">
      <button id="categoriaPrecio" class="filtroDiv__Precios">Precio</button>
    </div>

    <div class="col-12 col-xl-3">
      <button id="categoriaOrdenPrecios" class="filtroDiv__Precios">Menor a mayor precios</button>
    </div>
  </div>`
  filtroCatalogo.appendChild(filtroProductosDiv)


    productosDiv.innerHTML = ``
    for(let objeto of array){
        let productoNuevoDiv = document.createElement("div")
        productoNuevoDiv.className = "col-12 col-xl-3 cardProducto"
        productoNuevoDiv.innerHTML = `<div id="${objeto.codigo}" class="card" style="width: 18rem;">
        <img class="card-img-top img-fluid" style="height: 200px;" src="imagenes/${objeto.imagen}" alt="${objeto.producto} de ${objeto.marca}">
        <div class="card-body"> 
          <h7 class="card-title">${objeto.producto}</h7>
          <p class="card-marca">MARCA: ${objeto.marca}</p>
          <p class="card-precio">PRECIO: $${objeto.precio}</p>
          <button id="agregarPro${objeto.codigo}" class="btn btn-outline-success">Agregar al carrito</button>
        </div>
      </div>`

      productosDiv.appendChild(productoNuevoDiv)

      let agregarPro = document.getElementById(`agregarPro${objeto.codigo}`)
      agregarPro.addEventListener("click", () => {
        agregarAlCarrito(objeto)
      })
    }


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
  })
}

verCatalogo.addEventListener("click", ()=>{
    mostrarCatalogo(catalogoProductos)
 })