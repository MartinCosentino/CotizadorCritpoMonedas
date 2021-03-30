const cotizador = new API('9d53d36fa7d835aa54f63478ab4432215f7149d82d9a0dcf8d5cebab607f5408');
const ui = new Interfaz(); //para tener acceso al contenido de ui.js


//leer el form
const formulario = document.querySelector('#formulario');

// EVENT LISTENER

formulario.addEventListener('submit', (e) => {

    e.preventDefault();

    // leer la moneda seleccionada

    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

    // leer la criptomoneda seleccionada

    const criptoMonedaSelect = document.querySelector('#criptomoneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

    //verificar que tengan algo seleccionado
    if(monedaSeleccionada === '' || criptoMonedaSeleccionada === ''){
        //arrojar una alerta
        ui.mostrarMensaje('Ambos Campos son Obligatorios', 'alert bg-danger text-center');

    } else {
        // toodo piolardo consultar api
        cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
        .then(data => {
            ui.monstrarResultado(data.resultado.RAW,monedaSeleccionada,criptoMonedaSeleccionada);
        })

    }


});