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

const producto1 = new Producto("Vestido de rayas azul con amarillo", "vestidos", "Tommy Hilfiger", 600, "mediana", 1, "vestidoAzulTommy.jpg")
const producto2 = new Producto("Vestido de azul con rosa y corte v", "vestidos", "Tommy Hilfiger", 650, "mediana", 2, "vestidoAzulTommy.jpg")
const producto3 = new Producto("Vestido formal color mostaza", "vestidos", "Tommy Hilfiger", 800, "grande", 3, "vestidoAzulTommy.jpg")
const producto4 = new Producto("Vestido azul", "vestidos", "Guess", 550, "chico", 4, "vestidoAzulTommy.jpg")
const producto5 = new Producto("Vestido rosa con blanco", "vestidos", "Michael Kors", 950, "6", 5, "vestidoAzulTommy.jpg")
const producto6 = new Producto("Vestido negro", "vestidos", "Guess", 800, "chico", 6, "vestidoAzulTommy.jpg")
const producto7 = new Producto("Bolsa Crossbody azul", "bolsas", "Tommy Hilfiger", 650, "20cm * 18cm * 15cm", 7, "vestidoAzulTommy.jpg")
const producto8 = new Producto("Bolsa Crossbody negra", "bolsas", "Nautica", 550, "25cm * 15cm * 12cm", 8, "vestidoAzulTommy.jpg")
const producto9 = new Producto("Bolsa Crossbody roja", "bolsas", "Karl Marx", 850, "8cm * 15cm * 1.5cm", 9, "vestidoAzulTommy.jpg")
const producto10 = new Producto("Mochila azul", "bolsas", "Karl Marx", 1050, "20cm * 30cm * 15cm", 10, "vestidoAzulTommy.jpg")
const producto11 = new Producto("Bolsa Crossbody café", "bolsas", "Karl Marx", 850, "8cm * 15cm * 1.5cm", 11, "vestidoAzulTommy.jpg")
const producto12 = new Producto("Cartera azul", "bolsas", "Tommy Hilfiger", 600, "9cm * 7.5cm * 2cm", 12, "vestidoAzulTommy.jpg")
const producto13 = new Producto("Tenis blancos con detalles en negro", "zapatos", "Tommy Hilfiger", 800, "27", 13, "vestidoAzulTommy.jpg")
const producto14 = new Producto("Sandalias beige", "zapatos", "Guess", 850, "25", 14, "vestidoAzulTommy.jpg")

let catalogoProductos = [] 
 
if(localStorage.getItem("catalogoProductos")){
    //si existe la key estanteria en el storage, va a entrar aca
    // console.log("Ya existe la key estanteria")
    //cuando no es la primera vez, me traigo lo de storage
    catalogoProductos = JSON.parse(localStorage.getItem("catalogoProductos"))
}else{
    console.log(`ENTRA POR PRIMERA VEZ. SETEAMOS ARRAY`)
    catalogoProductos.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13, producto14)
    localStorage.setItem("catalogoProductos", JSON.stringify(catalogoProductos))
}

let productosDiv = document.getElementById("catProductos")
let verCatalogo = document.getElementById("botonesPri__cda--catalogo")

function mostrarCatalogo(array){
    productosDiv.innerHTML = ``
    for(let objeto of array){
        let productoNuevoDiv = document.createElement("div")
        productoNuevoDiv.className = "col-12 col-xl-3 cardProducto"
        productoNuevoDiv.innerHTML = `<div id="${objeto.codigo}" class="card" style="width: 18rem;">
        <img class="card-img-top img-fluid" style="height: 200px;" src="imagenes/${objeto.imagen}" alt="${objeto.producto} de ${objeto.marca}">
        <div class="card-body"> 
          <h5 class="card-title">${objeto.producto}</h5>
          <p class="card-marca">Marca: ${objeto.marca}</p>
          <p class="card-precio">Precio: ${objeto.precio}</p>
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

verCatalogo.addEventListener("click", ()=>{
    mostrarCatalogo(catalogoProductos)
 })