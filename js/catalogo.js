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
    console.log(`ENTRA POR PRIMERA VEZ. SETEAMOS ARRAY`)
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
  }


  //Toda la parte del filtro: categoría(todos los productos, bolsas, camisas, cremas y lociones, vestidos y zapatos)
  function filtrarPor(){
    let filtroProductosDiv = document.createElement("div")
    filtroProductosDiv.className = "filtroProductosDiv"
    //Estructura de la parte del filtro
    filtroProductosDiv.innerHTML = `<div class="container">
      <h7 id="filtroDiv__texto" class="col-12 col-xl-3"> Filtrar por: </h7>
  
      <div class="col-12 col-xl-3">
        <button class="btn btn-secondary dropdown-toggle btnFiltroCategoria" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Categoría
        </button>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li><a id="filtroTodos" class="dropdown-item">Todos los productos</a></li>
          <li><a id="filtroBolsas" class="dropdown-item">Bolsas</a></li>
          <li><a id="filtroCamisas" class="dropdown-item">Camisas</a></li>
          <li><a id="filtroCremas" class="dropdown-item">Cremas y lociones</a></li>
          <li><a id="filtroVestidos" class="dropdown-item">Vestidos</a></li>
          <li><a id="filtroZapatos" class="dropdown-item">Zapatos</a></li>
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
  
    //Categoría: todos los productos disponibles
    let filtroTodosBtn = document.getElementById("filtroTodos")
    filtroTodosBtn.addEventListener("click", () => {
      productosDiv.innerHTML = ``
      productosAgotados.innerText = ``
      presupuesto.innerText = ``
      mostrarCatalogo(catalogoProductos)
    })

    //Categoría: bolsas
    let filtroBolsasBtn = document.getElementById("filtroBolsas")
    filtroBolsasBtn.addEventListener("click", () => {
      productosDiv.innerHTML = ``
      productosAgotados.innerText = ``
      presupuesto.innerText = ``
      let productosBolsas = catalogoProductos.filter(
        (producto) => producto.categoria == "bolsas"
      )
      if(productosBolsas.length == 0){
        let noProductos = document.createElement("div")
        noProductos.innerHTML = `<h4 class="noProductosStock">¡Oh no! Todos las bolsas se han agotado :(</h4>`
        productosAgotados.appendChild(noProductos)
      }
      else{
        mostrarCatalogo(productosBolsas)
      }
    })

    //Categoría: camisas
    let filtroCamisasBtn = document.getElementById("filtroCamisas")
    filtroCamisasBtn.addEventListener("click", () => {
      productosDiv.innerHTML = ``
      productosAgotados.innerText = ``
      presupuesto.innerText = ``
      let productosCamisas = catalogoProductos.filter(
        (producto) => producto.categoria == "camisas"
      )
      if(productosCamisas.length == 0){
        let noProductos = document.createElement("div")
        noProductos.innerHTML = `<h4 class="noProductosStock">¡Oh no! Todos las camisas se han agotado :(</h4>`
        productosAgotados.appendChild(noProductos)
      }
      else{
        mostrarCatalogo(productosCamisas)
      }
    })

    //Categoría: cremas y lociones
    let filtroCremasLocionesBtn = document.getElementById("filtroCremas")
    filtroCremasLocionesBtn.addEventListener("click", () => {
      productosDiv.innerHTML = ``
      productosAgotados.innerText = ``
      presupuesto.innerText = ``
      let productosCremasLociones = catalogoProductos.filter(
        (producto) => producto.categoria == "cremasLociones"
      )
      if(productosCremasLociones.length == 0){
        let noProductos = document.createElement("div")
        noProductos.innerHTML = `<h4 class="noProductosStock">¡Oh no! Todos las cremas y lociones se han agotado :(</h4>`
        productosAgotados.appendChild(noProductos)
      }
      else{
        mostrarCatalogo(productosCremasLociones)
      }
    })

    //Categoría: vestidos
    let filtroVestidosBtn = document.getElementById("filtroVestidos")
    filtroVestidosBtn.addEventListener("click", () => {
      productosDiv.innerHTML = ``
      productosAgotados.innerText = ``
      presupuesto.innerText = ``
      let productosVestidos = catalogoProductos.filter(
        (producto) => producto.categoria == "vestidos"
      )
      if(productosVestidos.length == 0){
        let noProductos = document.createElement("div")
        noProductos.innerHTML = `<h4 class="noProductosStock">¡Oh no! Todos los vestidos se han agotado :(</h4>`
        productosAgotados.appendChild(noProductos)
      }
      else{
        mostrarCatalogo(productosVestidos)
      }
    })

    //Categoría: zapatos
    let filtroZapatosBtn = document.getElementById("filtroZapatos")
    filtroZapatosBtn.addEventListener("click", () => {
      productosDiv.innerHTML = ``
      productosAgotados.innerText = ``
      presupuesto.innerText = ``
      let productosZapatos = catalogoProductos.filter(
        (producto) => producto.categoria == "zapatos"
      )
      if(productosZapatos.length == 0){
        let noProductos = document.createElement("div")
        noProductos.innerHTML = `<h4 class="noProductosStock">¡Oh no! Todos los zapatos se han agotado :(</h4>`
        productosAgotados.appendChild(noProductos)
      }
      else{
        mostrarCatalogo(productosZapatos)
      }
    })


    //Filtro de acuerdo al presupuesto del usuario
    let filtroPrecioBtn = document.getElementById("categoriaPrecio")
    filtroPrecioBtn.addEventListener("click", () => {
      productosDiv.innerHTML = ``
      productosAgotados.innerText = ``
      let presupuestoInput = document.createElement("div")
      presupuestoInput.className = "inputPresupuesto"
      presupuestoInput.innerHTML = `<div>
      <label>Ingresa tu presupuesto:<input id="presuUsuario" class="presupuestoInput" type="text"></label><br></div>
      <div class="btnPresupuesto">
        <button id="botonPresu">Filtrar</button>
      </div`
      presupuesto.appendChild(presupuestoInput)
      let botonPresu = document.getElementById("botonPresu")
      botonPresu.addEventListener("click", () => {
        productosAgotados.innerText = ``
        productosDiv.innerText = ``
        let presu = document.getElementById("presuUsuario").value
        let productosPresupuesto = catalogoProductos.filter(
          (producto) => producto.precio <= presu
        )
        if(productosPresupuesto.length == 0){
          let noProductos = document.createElement("div")
          noProductos.innerHTML = `<h4 class="noProductosStock">¡Oh no! Por el momento no esta disponible ningún producto dentro de tu presupuesto:(</h4>`
          productosAgotados.appendChild(noProductos)
        }
        else{
          mostrarCatalogo(productosPresupuesto)
        }
      })
    })


    //Filtro que ordena los productos de menor a mayor precio
    let ordenPreciosBtn = document.getElementById("categoriaOrdenPrecios")
    ordenPreciosBtn.addEventListener("click", () => {
      productosDiv.innerText = ``
      productosAgotados.innerText = ``
      presupuesto.innerText = ``
      const menorMayor = [].concat(catalogoProductos)
      menorMayor.sort((a,b) => a.precio - b.precio)
      mostrarCatalogo(menorMayor)
    })
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
    filtrarPor()
    mostrarCatalogo(catalogoProductos)
    ocultarCatalogoBoton()
 })