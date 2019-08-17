var casa = [];
var jug1 = [];
var victorioso=0;
var apuestatotal=0;
//funcion que genera 4 numeros aleatorios y los imprime en los parrafos demo1, 2, 3 y 4
function myFunction() {
  //Ciclo para generar los 4 números aleatoriosç
  //Se desactivan los 5 botones de apuestas
  //Y se activa el botón de adicionar carta
  document.getElementById("Limpiar").disabled=true;
  document.getElementById("Apostar10").disabled=true;
  document.getElementById("Apostar100").disabled=true;
  document.getElementById("Apostar50").disabled=true;
  document.getElementById("Apostar20").disabled=true;
  document.getElementById("cartaAdcional").disabled=false;

  for (i = 0; i < 4; i++) {
    /*se agrega el número en el HTML de acuerdo a la etiqueta demo*/
    if (i < 2) {
      casa.push(newCarta(Math.floor(Math.random() * 52 + 1)));
      $("#casa" + (i + 1)).html(casa[i].numero);
      //counterIdCasa = i + 1;
    } else {
      jug1.push(newCarta(Math.floor(Math.random() * 52 + 1)));
      $("#jugador" + (i - 1)).html(jug1[i - 2].numero);
    }
  }
}
function verificarGanador() {
  // Aca segun el que se paso se dice quien gano y se le asigna un valor a victorioso
  var contJug=contarCartas("jugador");
  var contCasa=contarCartas("casa");
  if (contJug>21&&contCasa>21){
    victorioso=3;
  }else if (contCasa>21){
    victorioso=2;
  }else if(contJug>21)
   victorioso=1;
}
//Esta función genera una carta adicional al jugador
function cartaAdcional() {
  //Antes de adicionar carta se verifica que no exista ganador
  verificarGanador();
  if(victorioso!=0){
    if(victorioso==1){
      alert("La casa gano")
    }else if(victorioso==2){
      alert("El jugador gano")}
      else{
        alert("Ambos perdieron")
      }
  }else{
      //Contamos las cartas actuales del jugador y la casa
      var contadorCasa = contarCartas("casa");
      var contadorJug = contarCartas("jugador");
      // Si el contador de la casa es menor o igual a 16, se añade una nueva carta
      if (contadorCasa <= 16) {
        // Se crea un nuevo Span con id "casa#" donde '#' es el número siguiente de tags casa
        let newSpan = document.createElement("SPAN");
        newSpan.setAttribute("id", `casa${casa.length}`);

        // Se crea una nueva carta y se pushea al arreglo de casa
        casa.push(newCarta(Math.floor(Math.random() * 52 + 1)));
        // Se le añade el número de la carta al nuevo Span
        newSpan.innerHTML = " " + casa[casa.length - 1].numero;

        // Se le añade como hijo el nuevo Span al div de id 'casa'
        document.getElementById("casa").appendChild(newSpan);
      }
      //Se revisa si la casa perdio
      if (contadorCasa > 21) alert("La Casa pierde");

      //Se le agrega una carta al usuario (en el arreglo y en el html).
      jug1.push(newCarta(Math.floor(Math.random() * 52 + 1)));
      $("#jugador").append("<span id='jugador" + jug1.length + "'></span>");
      $("#jugador" + jug1.length).html(jug1[jug1.length - 1].numero + " ");

      //Se revisa si el usuario perdio
      if (contadorJug > 21) alert("Jugador pierde!");
    }
  }
//Adiciona segun el boton pulsado a la apuesta
function apostar(apuesta){
  apuestatotal=apuestatotal+apuesta;
  document.getElementById("Apuesta").innerHTML=apuestatotal;
}
function limpiarapuesta(){
  apuestatotal=0;
  document.getElementById("Apuesta").innerHTML=apuestatotal;
}
//Retorna la suma de las cartas
function contarCartas(jugador) {
  var contador = 0;

  //Si recibe el parametro jugador, suma los numeros de las cartas del arreglo jug1
  if (jugador == "jugador") {
    for (i = 0; i < jug1.length; i++) {
      contador += jug1[i].valor;
    }

  //Si recibe el parametro casa, suma los numeros de las cartas del arreglo casa
  } else if (jugador == "casa") {
    for (i = 0; i < casa.length; i++) {
      contador += casa[i].valor;
    }
  } else return -1; //Si recibe un parametro invalido, retorna -1. ES UN ERROR
  return contador;
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
    console.error(`Numero: --${carta}-- inválido`);
    return -1;
  }

  pintas = ["diamante", "corazon", "trevol", "pica"];
  // se obtiene una posición del array de pintas
  var posPinta = Math.floor((carta - 1) / 13);
  var pinta = pintas[posPinta];
  // se obtiene un número "legible" para el computador
  var numero = (carta - 1) % 13;
  var valor = numero < 10? numero+1 :10;
  var valor = valor == 1? 11:valor;
  console.log({
    valor,
    pinta,
    numero: numero + 1

  });
  return {
    valor,
    pinta,
    numero: numero + 1

  };
}
