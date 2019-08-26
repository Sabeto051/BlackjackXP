var casa = []
var jug1 = []
var victorioso = 0
var apuestatotal = 0

var suits = {
  DIAMANTE: '&#9830',
  CORAZON: '&#9829',
  TREBOL: '&#9827',
  PICA: '&#9824'
}

//funcion que genera 4 numeros aleatorios y los imprime en los parrafos demo1, 2, 3 y 4
function myFunction() {
  //Ciclo para generar los 4 números aleatoriosç
  //Se desactivan los 5 botones de apuestas
  //Y se activa el botón de adicionar carta
  $('.btn-move').prop('disabled', false)
  $('.btn-bet').prop('disabled', true)

  for (i = 0; i < 4; i++) {
    /*se agrega el número en el HTML de acuerdo a la etiqueta demo*/
    if (i < 2) {
      agregarCartasJuego(casa, i, 'casa')
      //counterIdCasa = i + 1;
    } else {
      agregarCartasJuego(jug1, i - 2, 'jugador')
    }
    ocultarCarta('casa',1)
  }

  $('#casa').css('display', 'inline-block')
  $('#jugador').css('display', 'block')
}

// se le pasa el arreglo de las carta y el numero y nombre para agregar las cartas
function agregarCartasJuego(arr, i, name) {
  arr.push(newCarta(Math.floor(Math.random() * 52 + 1)))
  $('#' + name + (i + 1)).html(arr[i].numero + ' ' + arr[i].pintar)
  var estilo = establecerEstiloCarta(arr[i].pintar)
  $('#' + name + (i + 1)).addClass(estilo)
}

// returna estilo de la cartas dependiendo de la pinta
function establecerEstiloCarta(pinta) {
  estilo = pinta == suits.DIAMANTE || pinta == suits.CORAZON ? 'roja' : 'negra'
  return estilo
}

//Esta función genera una carta adicional al jugador
function cartaAdcional() {
  //Antes de adicionar carta se verifica que no exista ganador
  verificarGanador()
  if (victorioso != 0) {
    if (victorioso == 1) {
      alert('La casa gano')
    } else if (victorioso == 2) {
      alert('El jugador gano')
    } 
  } else {
    //Se le agrega una carta al usuario (en el arreglo y en el html).
    agregarCarta('jugador')
  }
}

function verificarGanador() {
  // Aca segun el que se paso se dice quien gano y se le asigna un valor a victorioso
  var contCasa = contarCartas('casa')
  var contJug = contarCartas('jugador')
  if (contJug > 21) victorioso = 1
  else if (contCasa > 21) victorioso = 2

  console.log('casa ' + contCasa)
  console.log('jugador ' + contJug)
}

//Se le agrega una carta al div parent que se especifique
// casa o judagaor
function agregarCarta(parent) {
  if (parent === 'casa') {
    agregarSpan(parent, casa)
    var spanId = parent + casa.length
    $('#' + spanId).css('transform', 'rotate(2deg)');
  } else if (parent === 'jugador') {
    agregarSpan(parent, jug1)
  } else {
    console.log('error argumento no valido: ' + parent)
  }
}

/* Esta funcion crea un elemento span dentro del parent
 * @param parent
 *           este paramentro representa el id div padre. se debe pasar 'jugador' o 'casa'.
 * @param arr
 *           este parametro es el arreglo global de cartas de dicho parent.
 */

function agregarSpan(parent, arr) {
  // Se crea una nueva carta y se pushea al arreglo de casa
  arr.push(newCarta(Math.floor(Math.random() * 52 + 1)))

  // guardo el id de nuevo Span en una variable
  var spanId = parent + arr.length

  // Se le añade como hijo el nuevo Span al div
  $('#' + parent).append("<span id='" + spanId + "' class='cards'></span>")

  // guardo la ultitma posicion
  var last = arr.length - 1

  decorarCarta(spanId, arr, last);
  
}
function decorarCarta(spanId, arr, last) {
  // Se le añade el número de la carta al nuevo Span
  $('#' + spanId).html(arr[last].numero + ' ' + arr[last].pintar + ' ')

  //se obtiene el estilo de la carta
  var estilo = establecerEstiloCarta(arr[last].pintar)

  //adiciona la clase correcta dependiendo su pinta
  $('#' + spanId).addClass(estilo)

  console.log(spanId + ' ' + arr[last].numero)
  
}

//Adiciona segun el boton pulsado a la apuesta
function apostar(apuesta) {
  apuestatotal = apuestatotal + apuesta
  document.getElementById('Apuesta').innerHTML = apuestatotal
}
function limpiarapuesta() {
  apuestatotal = 0
  document.getElementById('Apuesta').innerHTML = apuestatotal
}

//Retorna la suma de las cartas
function contarCartas(jugador) {
  var contador = 0

  //Si recibe el parametro jugador, suma los numeros de las cartas del arreglo jug1
  if (jugador == 'jugador') {
    // se cuentas las carta del jugador
    contador = contarCartasDeJugador(jug1)

    //Si recibe el parametro casa, suma los numeros de las cartas del arreglo casa
  } else if (jugador == 'casa') {
    // se cuentas las carta del jugador
    contador = contarCartasDeJugador(casa)
  } else return -1 //Si recibe un parametro invalido, retorna -1. ES UN ERROR
  return contador
}

function contarCartasDeJugador(arr) {
  // se inicializa un contador
  var contador = 0

  // se itera la cartas de jugador y se suman
  for (i = 0; i < arr.length; i++) {
    contador += arr[i].valor
  }

  // se itera la cartas de jugador  y se suman teniendo cuenta que las cartas son mayores  21 a se cambia el 11 por el 1
  if (contador > 21) {
    contador = 0
    for (i = 0; i < arr.length; i++) {
      contador += arr[i].valor == 11 ? 1 : arr[i].valor
    }
  }
  console.log(arr)

  return contador
}

/*
    newCarta(carta)
    función que recibe un int
    función que retorna un objeto con atributos (str)pinta, (int)numero
        pinta es "diamante", "corazon", "trevol", "pica", numero va de 1 a 13
*/
function newCarta(carta) {
  // el rango del numero tiene que estar entre 1 y 52
  if (carta < 1 || carta > 52) {
    console.error(`Numero: --${carta}-- inválido`)
    return -1
  }

  //pintas = ["diamante", "corazon", "trebol", "pica"];
  // se obtiene una posición del array de pintas
  var posPinta = Math.floor((carta - 1) / 13)
  //var pinta = pintas[posPinta];
  var pintar = seleccionarPinta(posPinta)

  // se obtiene un número "legible" para el computador
  var numValor = (carta - 1) % 13
  //se valida si el numero de la carta es menor a 10 se deja el mismo valor sino se pone un valor de 10
  var valor = numValor < 10 ? numValor + 1 : 10
  // se valida si el numero es 1  se deja 11 como valor inicial
  var valor = valor == 1 ? 11 : valor
  valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  //se le da un valor del array al numero obtenido
  var numero = valores[numValor]
  return {
    valor,
    pintar,
    numero
  }
}

//seleciona la pinta dependiendo de la un numero de 1-4
function seleccionarPinta(posPinta) {
  pintar = ''
  switch (posPinta) {
    case 0:
      pintar = suits.DIAMANTE
      break
    case 1:
      pintar = suits.CORAZON
      break
    case 2:
      pintar = suits.TREBOL
      break
    case 3:
      pintar = suits.PICA
      break
    default:
      pintar = 'Error'
      break
  }
  return pintar
}

function plantar() {
  //Contamos las cartas actuales del jugador y la casa

  var contadorCasa = contarCartas('casa')
  var contadorJug = contarCartas('jugador')

  mostrarCarta("casa",1);
  // itero hasta que el contador de la casa sea menor 17
  // o que el contador del jugador sea mayor a 21
  while (contadorCasa <= 16 && !(contadorJug > 21)) {
    agregarCarta('casa')

    //actualizo los contadores
    contadorJug = contarCartas('jugador')
    contadorCasa = contarCartas('casa')

    console.log('jugador ' + contadorJug)
    console.log('casa ' + contadorCasa)
  }

  if (contadorCasa > 21 && contadorJug > 21) {
    alert('Ambos pierden')
  } else if (contadorCasa > 21) {
    //Se revisa si la casa perdio
    alert('La Casa pierde')
  } else if (contadorJug > 21) {
    //Se revisa si el usuario perdio
    alert('Jugador pierde!')
  }

  verificarGanador()
  if (victorioso == 0) {
    var ganador = contadorCasa > contadorJug ? 'casa' : ' jugador'
    alert(ganador + ' gano')
  }
}

function ocultarCarta(jugador,posicion) {
  var spanId = jugador + posicion;
  $('#' + spanId).html("");
  $('#' + spanId).addClass('oculta');
}

function mostrarCarta(jugador,posicion) {
  var spanId =  jugador + posicion;
  $('#' + spanId).removeClass('oculta');
  var arr = (jugador == 'casa')? casa: jug1;
  decorarCarta(spanId, arr, posicion-1);
  $('#' + spanId).css('transform', 'rotate(0deg)');

  console.log(spanId);
}