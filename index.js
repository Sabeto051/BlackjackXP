var casa = [];
var jug1 = [];
var victorioso=0;

//funcion que genera 4 numeros aleatorios y los imprime en los parrafos demo1, 2, 3 y 4
function myFunction() {
  //Ciclo para generar los 4 números aleatorios
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
      //Se le agrega una carta al usuario (en el arreglo y en el html).
      agregarCarta("jugador");
    }
  }

  function verificarGanador() {
    // Aca segun el que se paso se dice quien gano y se le asigna un valor a victorioso
    var contCasa=contarCartas("casa");
    var contJug=contarCartas("jugador");
    if (contJug>21&&contCasa>21){
      victorioso=3;
    }else if (contCasa>21){
      victorioso=2;
    }else if(contJug>21)
     victorioso=1;
  
     console.log("casa "+ contCasa);
     console.log("jugador "+ contJug);
  }


  //Se le agrega una carta al div parent que se especifique 
  // casa o judagaor 
  function agregarCarta(parent){
    if(parent === "casa"){
      agregarSpan(parent, casa);
    } else if (parent === "jugador"){
      agregarSpan(parent, jug1);
    } else{
      console.log("error argumento no valido: " + parent );
    }
  
  }
  
  
   /* Esta funcion crea un elemento span dentro del parent 
    * @param parent 
    *           este paramentro representa el id div padre. se debe pasar 'jugador' o 'casa'. 
    * @param arr
    *           este parametro es el arreglo global de cartas de dicho parent.
    */
  
  function agregarSpan(parent, arr){
  
    // Se crea una nueva carta y se pushea al arreglo de casa
    arr.push(newCarta(Math.floor(Math.random() * 52 + 1)));
  
    // guardo el id de nuevo Span en una variable
    var spanId = parent + arr.length;
  
     // Se le añade como hijo el nuevo Span al div 
    $("#"+parent).append("<span id='"+ spanId + "'></span>");
  
    // Se le añade el número de la carta al nuevo Span
    $("#"+spanId).html(arr[arr.length - 1].numero + " ");
  
    console.log(spanId +" "+arr[arr.length - 1].numero);
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

    // se itera la cartas de jugador  y se suman teniendo cuenta que las cartas son mayores  21 a se cambia el 11 por el 1
    if(contador > 21){
      contador = 0;
      for (i = 0; i < arr.length; i++) {
        contador += arr[i].valor == 11 ? 1 :arr[i].valor;
      }
    }

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

  //se valida si el numero de la carta es menor a 10 se deja el mismo valor sino se pone un valor de 10 
  var valor = numero < 10? numero+1 :10;
  // se valida si el numero es 1  se deja 11 como valor inicial 
  var valor = valor == 1? 11:valor;
  
  return {
    valor,
    pinta,
    numero: numero + 1

  };
}


function plantar(){

  //Contamos las cartas actuales del jugador y la casa
  
      var contadorCasa = contarCartas("casa");
      var contadorJug = contarCartas("jugador");
    
    while( contadorCasa <= 16  &&  !(contadorJug > 21)){

      agregarCarta("casa");

      //actualizo los contadores 
      contadorJug = contarCartas("jugador");
      contadorCasa = contarCartas("casa");

      console.log("jugador "+ contadorJug);
      console.log("casa "+ contadorCasa);
    }

    if( contadorCasa > 21 && contadorJug > 21){
      alert("Ambos pierden");
    } else if(contadorCasa > 21){   //Se revisa si la casa perdio
      alert("La Casa pierde");
    }else if (contadorJug > 21){    //Se revisa si el usuario perdio
      alert("Jugador pierde!");
    }

    verificarGanador();
    if(victorioso == 0){
      var ganador = (contadorCasa > contadorJug)? "casa" : " jugador";
      alert(ganador +" gano");
    }

}





