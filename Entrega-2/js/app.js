
let listaClientes = []


if (localStorage.getItem("clientes")) {
    listaClientes = JSON.parse(localStorage.getItem("clientes"))
}


class Cliente {
    constructor (nombre, email) {
      this.nombre = nombre
      this.email = email
      this.deuda = 0
}
}

function guardarStorage() {
    localStorage.setItem("clientes", JSON.stringify(listaClientes))
}

function mostrarClientes() {
    let contenedor = document.getElementById("listaClientes")
    contenedor.innerHTML = ""
    listaClientes.sort((a, b) => {
        if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) return -1;
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;
        return 0;
    });
    listaClientes.forEach(function(cliente, index) {
        let div = document.createElement("div")
        div.className = "cliente"
        div.innerHTML = `
            <p><strong>${cliente.nombre}</strong> (${cliente.email})</p>
            <p>Deuda: $${cliente.deuda}</p>
            <button onclick="tomarPrestamo(${index})">Tomar Préstamo</button>
            <button onclick="pagarDeuda(${index})">Pagar Deuda</button>
            <button onclick="eliminarCliente(${index})">Eliminar Cliente</button>
        `
        contenedor.appendChild(div)
    })
}


document.getElementById("btnAgregarCliente").addEventListener("click", function() {
    let nombre = document.getElementById("inputNombre").value
    let email = document.getElementById("inputEmail").value

    if (nombre !== "" && email !== "") {
        let nuevo = new Cliente(nombre, email)
        listaClientes.push(nuevo)
        guardarStorage()
        mostrarClientes()
    }
})






function tomarPrestamo(indice) {
    listaClientes[indice].deuda += 1000
    guardarStorage()
    mostrarClientes()
}


function pagarDeuda(indice) {
    if (listaClientes[indice].deuda >= 500) {
        listaClientes[indice].deuda -= 500
    } else {
        listaClientes[indice].deuda = 0
    }
    guardarStorage()
    mostrarClientes()
}


function eliminarCliente(indice) {
    if (listaClientes[indice].deuda === 0) {
        listaClientes.splice(indice, 1)
        guardarStorage()
        mostrarClientes()
    } else {
        alert("El cliente aún tiene deuda")
    }
}


mostrarClientes()




let titulo = document.getElementById("titulo")
titulo.innerHTML = "<h1>Simular Financiero</h1>"
titulo.className = "titulo"


let subtitulo = document.getElementById("subtitulo")
subtitulo.innerHTML =  "<h2>Clientes Registrados</h2>"
subtitulo.className = "subtitulo"

let titulos = document.getElementById("titulos")
titulos.innerHTML ="<h3>Informacion de los Clientes </h3>"
titulos.className ="titulos"
