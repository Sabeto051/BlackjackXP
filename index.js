var casa = [];
var jug1 = [];
var victorioso=0;
var apuestatotal=0;

//funcion que genera 4 numeros aleatorios y los imprime en los parrafos demo1, 2, 3 y 4
function myFunction() {
  //Ciclo para generar los 4 números aleatorios
  for (i = 0; i < 4; i++) {
    /*se agrega el número en el HTML de acuerdo a la etiqueta demo*/
    if (i < 2) {
      casa.push(newCarta(Math.floor(Math.random() * 52 + 1)));
      $("#casa" + (i + 1)).html(casa[i].pintar + " " + casa[i].numero );

      //counterIdCasa = i + 1;
    } else {
      jug1.push(newCarta(Math.floor(Math.random() * 52 + 1)));
      $("#jugador" + (i - 1)).html(jug1[i - 2].pintar + " " + jug1[i - 2].numero );
    }
  }

/*  verificarGanador();
  if(victorioso!=0){
    if(victorioso==1){
      alert("La casa gano")
    }else if(victorioso==2){
      alert("El jugador gano")();

  document.getElementById('casa').style.display = 'inline-block';
  document.getElementById('jugador').style.display = 'block';
*/  //Se desactivan los 5 botones de apuestas
  //Y se activa el botón de adicionar carta
  document.getElementById("Limpiar").disabled=true;
  document.getElementById("Apostar10").disabled=true;
  document.getElementById("Apostar20").disabled=true;
  document.getElementById("Apostar50").disabled=true;
  document.getElementById("Apostar100").disabled=true;
  document.getElementById("cartaAdcional").disabled=false;

  }
function verificarGanador() {
//Verifica que ningún jugador se pase del conteo de 21 puntos
// Aca segun el que se paso se dice quien gano y se le asigna un valor a victorioso
  var contJug=contarCartas("jugador");
  var contCasa=contarCartas("casa");
   if(contJug>21){
   victorioso=1;
  }else if (contCasa>21){
    victorioso=2;
}
}
//Esta función genera una carta adicional al jugador
function cartaAdcional() {
  //Antes de adicionar carta se verifica que no exista ganador
  verificarGanador();
 
    if(victorioso==0){
      //Contamos las cartas actuales del jugador y la casa
      var contadorCasa = contarCartas("casa");
      var contadorJug = contarCartas("jugador");
//          Se revisa si el usuario perdio
      if (contadorJug > 21) alert("Jugador pierde!");
  //Se le agrega una carta al usuario (en el arreglo y en el html).
//      let newSpan = document.createElement("SPAN");
//      newSpan.setAttribute("id", `${jug1[jug1.length-1].pinta}`);
      jug1.push(newCarta(Math.floor(Math.random() * 52 + 1)));
      $("#jugador").append("<span id='jugador" + jug1.length +"'></span>");
      $("#jugador" + jug1.length).html(jug1[jug1.length - 1].pintar + " "+ jug1[jug1.length-1].numero);
//      newSpan.innerHTML = " " + jug1[jug1.length - 1].numero ;
      // Se le añade como hijo el nuevo Span al div de id 'jugador'
//      document.getElementById("jugador").appendChild(newSpan);

          // Si el contador de la casa es menor o igual a 16, se añade una nueva carta
      if (contadorCasa <= 16) {
        // Se crea un nuevo Span con id "casa#" donde '#' es el número siguiente de tags casa
        let newSpan = document.createElement("SPAN");
       newSpan.setAttribute("id", `${casa[casa.length-1]}`);
        // Se crea una nueva carta y se pushea al arreglo de casa
        casa.push(newCarta(Math.floor(Math.random() * 52 + 1)));
        // Se le añade el número de la carta al nuevo Span
        newSpan.innerHTML = " " + casa[casa.length - 1].pintar +" "+casa[casa.length - 1].numero ;
        // Se le añade como hijo el nuevo Span al div de id 'casa'
        document.getElementById("casa").appendChild(newSpan);
      }
    
    //if (contadorCasa > 21) alert("La Casa pierde"); Se revisa si la casa perdio
    }else if(victorioso==1){
      alert("La casa gano")
    }else if(victorioso==2){
      alert("El jugador gano")
   }
  }
  //Adiciona segun el boton pulsado a la apuesta
function apostar(monto){
  apuestatotal=apuestatotal+monto;
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
    // se cuentas las carta del jugador 
   contador = contarCartasDeJugador(jug1);
  //Si recibe el parametro casa, suma los numeros de las cartas del arreglo casa
  } else if (jugador == "casa") {
     // se cuentas las carta del jugador 
    contador = contarCartasDeJugador(casa);
  } else return -1; //Si recibe un parametro invalido, retorna -1. ES UN ERROR
  return contador;
}
function contarCartasDeJugador(arr) {
    // se inicializa un contador 
    var contador = 0;
    // se itera la cartas de jugador y se suman 
    for (i = 0; i < arr.length; i++) {
      contador += arr[i].valor;
    }
    // se itera la cartas de jugador  y se suman teniendo cuenta que las cartas son mayores  23 a se cambia el 11 por el 1
    if(contador > 21){
      contador = 0;
      for (i = 0; i < arr.length; i++) {
        contador += arr[i].valor == 11 ? 1 :jug1[i].valor;
      }
    }
    console.log('contador '+ contador);
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

  pintas =["diamante", "corazon","trebol","pica"]
  // se obtiene una posición del array de pintas
  var posPinta = Math.floor((carta - 1) / 13);
  var pinta = pintas[posPinta];
  var pintar= " ";
  if (posPinta == 0){
    pintar="&#9830";//pone el simbolito de diamante
  }else if(posPinta==1){
    pintar="&#9829";//pone el simbolito de corazon
  }else if (posPinta == 2){
    pintar="&#9827";//pone el simbolito de trebol
  }else{
    pintar="&#9824";//pone el simbolito de pica
  }
  // se obtiene un número "legible" para el computador
  var numValor = (carta - 1) % 13;
 //se valida si el numero de la carta es menor a 10 se deja el mismo valor sino se pone un valor de 10 
  var valor = numero < 10? numero+1 :10;
  // se valida si el numero es 1  se deja 11 como valor inicial 
  var valor = valor == 1? 11:valor;
  valores =["K","Q","J","10","9","8","7","6","5","4","3","2","A"]
  //se le da un valor del array al numero obtenido 
  var numero = valores[numValor];
  return {
    valor,
    pintar,
    numero
  };
}
