let aeProductosSeccion = document.getElementById("aeProductosSeccion")
let aeProductosBtn = document.getElementById("botonesPri__cda--aeproductos")

aeProductosBtn.addEventListener("click", () => {
    productosDiv.innerHTML = ``
    productosAgotados.innerText = ``
    presupuesto.innerText = ``
    oculCatalogoBtn.innerText = ``
    filtroCatalogo.innerText = ``
    descuentoSeccion.innerText = ``

    let contraseñaProductos = document.createElement("div")
    contraseñaProductos.className = "conProductosSeccion"
    contraseñaProductos.innerHTML = `
    <label class="conSeccion">Ingresa la contraseña: <input id="contraseñaIngresada" type="text"></label><br>
    <button id="botonContraseña" class="btnContraseña">Cargar</button>
    `
    aeProductosSeccion.appendChild(contraseñaProductos)
    let botonConIngresada = document.getElementById("botonContraseña") 
    botonConIngresada.addEventListener("click", () => {
        let contraseñaIn = document.getElementById("contraseñaIngresada").value
        if(contraseñaIn == "1183"){
            aeProductosSeccion.innerText = ``
            let seleccionAgregar = document.createElement("div")
            seleccionAgregar.className = "seleccionAgregarDiv"
            seleccionAgregar.innerHTML = `
            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Agregar o eliminar productos
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li><a id="agregar" class="dropdown-item">Agregar :)</a></li>
              <li><a id="eliminar" class="dropdown-item">Eliminar :(</a></li>
            </ul>
          </div>
            `
            aeProductosSeccion.appendChild(seleccionAgregar)

            let agregarProductosBtn = document.getElementById("agregar")
            let eliminarProductosBtn = document.getElementById("eliminar")

            agregarProductosBtn.addEventListener("click", () => {
                aeProductosSeccion.innerText = ``
            })

            eliminarProductosBtn.addEventListener("click", () => {
                aeProductosSeccion.innerText = ``
            })
        } 
        else{
            Swal.fire({
                icon: 'warning',
                title: '¡Oh no! Parece que no tienes acceso a esta función, ya que la constraseña fue incorrecta :('
            })
        }
    })
})