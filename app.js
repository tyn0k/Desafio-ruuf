// Autor: Christian Paillacan


function calcularMaximoDePanelesEnElTecho(anchoTecho, altoTecho, anchoPanel, altoPanel) {
    // verificar que ningun parámetro del panel supere al techo
    if (anchoTecho < anchoPanel || anchoTecho < altoPanel || altoTecho < anchoPanel || altoTecho < altoPanel){
        return 0
    } else{
        //opcion 1: calcular cuantos paneles caben en una orientación "normal" y calcula el espacio restante
        let panelesALoAncho = Math.floor(anchoTecho/anchoPanel);
        let panelesALoAlto = Math.floor(altoTecho/altoPanel);
        let totalPaneles = panelesALoAncho * panelesALoAlto;

        // calcular espacio usado en ambas direcciones
        let anchoUsado = panelesALoAncho*anchoPanel;
        let altoUsado = panelesALoAlto*altoPanel;

        // calcular espacios libres sobrantes en ambas direcciones
        let espacioLibreAncho = anchoTecho - anchoUsado;
        let espacioLibreAlto = altoTecho - altoUsado;

        // Intento de agregar más paneles "rotados" en la espacio restante
        let panelesExtraAncho = Math.floor(espacioLibreAncho/altoPanel);
        let panelesExtraAlto = Math.floor(espacioLibreAlto/anchoPanel);

        // calculo final de la opcion 1
        let panelesTotalesNormalConExtras = totalPaneles + panelesExtraAncho + panelesExtraAlto;

        // opcion 2: intentar calcular paneles en la otra orientacion
        let panelesALoAnchoRotado = Math.floor(anchoTecho/altoPanel);
        let panelesALoAltoRotado = Math.floor(altoTecho/anchoPanel);
        let anchoUsadoRotado = panelesALoAnchoRotado*altoPanel;
        let altoUsadoRotado = panelesALoAltoRotado*anchoPanel;
        let totalPanelesRotados = panelesALoAnchoRotado * panelesALoAltoRotado;

        // calcular espacios libres sobrantes en ambas direcciones
        let espacioLibreAnchoRotado = anchoTecho - anchoUsadoRotado;
        let espacioLibreAltoRotado = altoTecho - altoUsadoRotado;

        // Intento de agregar más paneles "normales" en la espacio restante
        let panelesExtraAnchoRotado = Math.floor(espacioLibreAnchoRotado/altoPanel);
        let panelesExtraAltoRotado = Math.floor(espacioLibreAltoRotado/anchoPanel);

        // calculo final de la opcion 2
        let panelesTotalesRotadosConExtras = totalPanelesRotados + panelesExtraAnchoRotado + panelesExtraAltoRotado;

        // comparar las dos opciones y devolver la mejor
        return Math.max(panelesTotalesNormalConExtras, panelesTotalesRotadosConExtras);
    }
}


    // funcion para normalizar entrada
function normalizarEntrada(input) {
    let valorNormalizado = input.replace(/,/g, '.');
    return parseFloat(valorNormalizado);
}


// funcion para reiniciar el calculo

function reiniciarCalculo() {
    // reiniciar los valores de las cajas de texto y el resultado
    document.getElementById("anchoTecho").value = "";
    document.getElementById("altoTecho").value = "";
    document.getElementById("anchoPanel").value = "";
    document.getElementById("altoPanel").value = "";

    // Mostrar los inputs del principio
    document.getElementById('inputs-container').style.display = 'block';
    
    // Mostrar botón de calcular
    document.querySelector("button").style.display = 'block';

    // Ocultar resultado
    document.getElementById("resultado").style.display = 'none';
    document.getElementById('nuevo-calculo').style.display = 'none';

}


    // Llamada de funcion de calculo a traves de boton
function calcularPaneles() {

    // Obtener valores de las cajas de texto y asegurar ingreso correcto de punto o coma
    let anchoTecho = normalizarEntrada(document.getElementById("anchoTecho").value);
    let altoTecho = normalizarEntrada(document.getElementById("altoTecho").value);
    let anchoPanel = normalizarEntrada(document.getElementById("anchoPanel").value);
    let altoPanel = normalizarEntrada(document.getElementById("altoPanel").value);
        // Asegurar formato correcto de la entrada numerica y que sean mayores que cero
        // En caso de que no lo sea, envia un mensaje y deja las cajas en blanco
        if (isNaN(anchoTecho) || isNaN(altoTecho) || isNaN(anchoPanel) || isNaN(altoPanel) 
            || anchoTecho <= 0 || altoTecho <= 0 || anchoPanel <= 0 || altoPanel <= 0) {
            document.getElementById("resultado").textContent = "Por favor, ingrese valores válidos y mayores a cero.";
            document.getElementById("resultado").style.display = 'block';
            document.getElementById("anchoTecho").value = "";
            document.getElementById("altoTecho").value = "";
            document.getElementById("anchoPanel").value = "";
            document.getElementById("altoPanel").value = "";
            return;
        }
        // Llamar la funcion de calculo
        let resultado = calcularMaximoDePanelesEnElTecho(anchoTecho, altoTecho, anchoPanel, altoPanel);

        // Mostrar resultados en la pagina
        document.getElementById("resultado").innerHTML = `El número máximo de paneles que caben en el techo es: ${resultado}`;
        document.getElementById("resultado").style.display = 'block'; // Mostramos el resultado solo si se ha calculado

        // Ocultar los inputs y el boton de calcular
        document.getElementById('inputs-container').style.display = 'none';
        document.querySelector("button").style.display = 'none';

        // Muestra el boton de reiniciar el calculo
        document.getElementById('nuevo-calculo').style.display = 'block';

    }
    


