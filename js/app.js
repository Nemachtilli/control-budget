// variables
const presupuestoUsuario = prompt("Ingresa tu presupuesto para continuar...");

const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;

// console.log(presupuestoUsuario);

//Clases

class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    //Método
    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    }
}

class Interfaz {
    insertarPresupuesto(cantidad){
        const presupuestoSpam = document.querySelector('span#total');
        const restanteSpam = document.querySelector('span#restante');

        presupuestoSpam.innerHTML = `${cantidad}`;
        restanteSpam.innerHTML = `${cantidad}`;
    }

    imprimirMensaje(mensaje, tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        
        // Inserter DOM
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
        
        //Quitar alert
        setTimeout(function(){
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        }, 3000);
    }
    // Insertar gastos a la lista
    agregarGastoListado(nombre, cantidad){
        const gastosListado = document.querySelector('#gastos ul');

        //create li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between aling-items-center';

        //insert gasto
        li.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>
        `;

        //insert in html
        gastosListado.appendChild(li);
    }
    
    presupuestoRestante(cantidad){
        const restante = document.querySelector('span#restante');
        
        const presupuestoUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);

        restante.innerHTML = `${presupuestoUsuario}`;

        this.comprobarPresupuesto();
    }

    comprobarPresupuesto(){
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        //comprobar 25%
        if ((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        }else if((presupuestoTotal / 2) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
    }
}


// Event Listeners

document.addEventListener('DOMContentLoaded', function() {
    if (presupuestoUsuario === null || presupuestoUsuario === '') {
        window.location.reload();
    } else {
        // console.log('Prespuesto agregado');
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
        console.log(cantidadPresupuesto);

        //Instanciar Interfaz
        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }
});

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Leer del formulario
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    // Instanciar la Interfaz
    const ui = new Interfaz();

    // Comprobar que los campos no esten vacios
    if (nombreGasto.length === '' || cantidadGasto === '') {
        ui.imprimirMensaje('Debes de rellenar el formulario', 'error');
    } else {
        ui.imprimirMensaje('Se agrego la información', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
});