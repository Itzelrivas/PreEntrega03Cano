let descuentosBtn = document.getElementById("botonesPri__cda--descuentos")
let descuentoSeccion = document.getElementById("descuentosSeccion")
let clientes = []

descuentosBtn.addEventListener("click", () => {
    if(localStorage.getItem("clientes")){
        clientes = JSON.parse(localStorage.getItem("clientes"))
    }else{
        for(let i=0; i<clientes.length; i++){
            clientes.push(clientes[i])
        }
        localStorage.setItem("clientes", JSON.stringify(clientes))
    }

    productosDiv.innerHTML = ``
    productosAgotados.innerText = ``
    presupuesto.innerText = ``
    oculCatalogoBtn.innerText = ``
    filtroCatalogo.innerText = ``
    aeProductosSeccion.innerText = ``

    Swal.fire({
        title: 'Registrate para obtener un 10% en tu primera compra :)',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fffdf5',
        confirmButtonColor: 'black'
      })
    
    let descuentoSeccionDiv = document.createElement("div")
    descuentoSeccionDiv.className = "descuentoSeccionBtns"
    descuentoSeccionDiv.innerHTML = `<div>
    <label class="descuentoLabel">Ingresa tu correo electrónico: <input id="descuentoUsuario" type="text"></label><br>
    <button id="botonDescuento" class="descuentoLabel descuentoBtn">Obtener código :)</button>
    </div>`
    descuentoSeccion.appendChild(descuentoSeccionDiv)

    let btnDescuento = document.getElementById("botonDescuento")
    btnDescuento.addEventListener("click", () => {
        let correoUsuario = document.getElementById("descuentoUsuario").value
        let a=0
        for(let i=0; i < clientes.length; i++)
        {
            if(clientes[i] == correoUsuario)
            {
                Swal.fire({
                    icon: 'warning',
                    title: 'Lo sentimos, ya has tramitado tu código de descuento por primera compra antes.'
                })
                a++
                break
            }
        }
        if(a==0){
            Swal.fire({
                icon: 'succes',
                title: `Tu código de descuento es primCompra${clientes.length + 1}`,
                text: 'Usalo en tu primera compra para obtener un 10% de descuento. Recuerda que tu código tiene un mes de vigencia y solamente puedes utilizarlo una vez :)',
                footer: '<h5>¡Muchas gracias por interesarte en nuestros productos!</h5>'
            })
            clientes.push(correoUsuario)
            localStorage.setItem("clientes", JSON.stringify(clientes))
        }
    })
})