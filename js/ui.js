class Interfaz {

    constructor() {
        this.init();
    }
    init() {
        this.construirSelect();
    }

    construirSelect(){
        cotizador.obtenerMonedasAPI()
        .then(monedas =>{
            //crear un select de opiciones
            const select = document.querySelector('#criptomoneda'); 

            //ITINERAR POR LOS RESULTADOS DE LA API
            //cambia de Objeto a Arreglo Object.entries para acceder a los valores
            for ( const [key, value] of Object.entries(monedas.monedas.Data)){  //KEY = nombre de moneda // VALUE = Su contenido
                
                const opcion = document.createElement('option');
                opcion.value = value.Symbol;
                opcion.appendChild(document.createTextNode(value.CoinName));                
                select.appendChild(opcion);
                 
            }                              
        })
    }



    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));


        // seleccionar mensajes
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);

        // mostrar contenido
        setTimeout(() => {
        document.querySelector('.mensajes div').remove();
            }, 3000);   
 }

    //imprime el resultado de la cotizacion

    monstrarResultado(resultado, moneda, crypto){

        //En caso de un resultado anterior, ocultarlo
        const resultadoAnterior = document.querySelector('#resultado > div');

        if(resultadoAnterior){
            resultadoAnterior.remove();
        }

        const datosMoneda= resultado[crypto][moneda];
        

        //recortar digitos de precio
        let precio = datosMoneda.PRICE.toFixed(2),
            porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
            actualizado = new Date (datosMoneda.LASTUPDATE * 1000);
            // LASTUPTADE nos da un numero entero que al multiplicarlo * 1000 nos da una fecha
            
        
        //construir el template
        let templateHTML = `
            <div class="card bg-warning">
            <div class="card-body text-light">
                <h2 class="card-title">Resultado:</h2>
                <p> El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $ ${precio} </p>
                <p> variación último día: % ${porcentaje}    </p>
                <p> Última Actualización: ${actualizado}    </p>
                </div>
                    </div>
        
        
        
            `;


        this.mostrarOcultarSpinner('block');
        setTimeout(() =>{ 
            
        // Instertar el resultado

        document.querySelector('#resultado').innerHTML = templateHTML;
        
        this.mostrarOcultarSpinner('none');
        },3000);
    }
    //Monstrar Spinner
    mostrarOcultarSpinner(vista){
        const spinner = document.querySelector('.contenido-spinner'); 
        spinner.style.display = vista;

    }
    

}