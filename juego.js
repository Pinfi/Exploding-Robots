//DUDAS!!

//En la funcion addCarta, linea 30, no devuelve una carta, devuelve -1 (diciendo que no hay cartas de ese tipo dentro cuando en realidad si las hay)
//quizas lo que no pilla es el array cartas[] y por eso no es capaz de buscar en el

//La funcion sumarDescarte(carta) lineas 286 no me lo hace bien, me suma a veces las bombas pero ninguna carta mas, uso esta funcion tambien en eliminaCartas (linea88)
// y tambien lo uso en addCarta para que si tengo desactivaciones que me mande ambas cartas al descarte



class Carta {
    constructor(tipo = tipo, puntos = this.puntos, enlace = enlace) {
        this.tipo = tipo;
        this.puntos = puntos;
        this.enlace = enlace;
    }

}

class Jugador {
    constructor(nombre, turno = false, eliminado = false) {
        this.nombre = nombre;
        this.turno = turno;
        this.cartas = [];
        this.eliminado = eliminado;
    }

    addCarta(carta) {

        if (carta.tipo == 'Bomba') {

            let salvaciones = this.numDesactivar();
            if (salvaciones >= 1) {

                let cartaSalvacion = this.cartas.indexOf(carta.tipo === 'Desactivacion');

                let cartaParaDescartar = this.cartas[cartaSalvacion]
                this.cartas.splice(cartaSalvacion, 1);

                console.log('Se va a descartar lo siguiente--------------------')
                console.log(cartaParaDescartar)

                sumarDescarte(carta);
                sumarDescarte(cartaParaDescartar);
            } else {
                this.eliminado = true
                sumarDescarte(carta);
            }
        } else {
            this.cartas.push(carta);
        }

    }

    contarCartas() {
        return this.cartas.length;
    }

    contarPuntos() {
        //debugger;
        let contadorPuntos=0;
        this.cartas.forEach(element => {
            if(element.tipo=="Puntos"){
                contadorPuntos+=element.puntos;
            }
        });
        return contadorPuntos;
    }

    saltarTurno() {
        let contador = 0;
        for (let index = 0; index < this.cartas.length; index++) {
            if (this.cartas[index].tipo == "SaltoTurno") {
                contador++;
            }
        }
        return contador;
    }

    numDesactivar() {
        let contador = 0;
        for (let index = 0; index < this.cartas.length; index++) {
            if (this.cartas[index].tipo == "Desactivacion") {
                contador++;
            }
        }
        return contador;
    }

    eliminaCartas() {
        debugger;
        if (this.eliminado == true) {
            this.cartas.forEach(element => {
                sumarDescarte(element);
                //this.cartas.shift();
            });
        }
    }

}

class Baraja {
    constructor() {
        this.cartas = []
    }

    inicializa() {
        //Metemos las bombas
        for (let index = 0; index < 6; index++) {
            let cartaNueva = new Carta("Bomba", 0, "/img/bomba/bomba.png");
            this.cartas.push(cartaNueva);
        }

        //metemos las desactivacion
        for (let index = 0; index < 6; index++) {
            let cartaNueva = new Carta("Desactivacion", 0, "/img/herramienta/herramienta.png");
            this.cartas.push(cartaNueva);
        }

        //metemos los saltos de turno
        for (let index = 0; index < 10; index++) {
            let cartaNueva = new Carta("SaltoTurno", 0, "/img/pasarTurno/pasarTurno.png");
            this.cartas.push(cartaNueva);
        }

        //metemos los robots
        for (let index = 0; index < 38; index++) {
            let imagenRandom = Math.floor(Math.random() * 20) + 1;
            if (imagenRandom < 10) {
                imagenRandom = '0' + imagenRandom;
            }


            let enla = `${imagenRandom}`;
            let enlaceImagen = '/img/card/robot_' + enla + '.png';

            let cartaNueva = new Carta("Puntos", 0, enlaceImagen);
            let random = Math.random();
            let numero = Math.floor(random * 11);
            if (numero == 0) { numero = 1; }
            cartaNueva.puntos = numero;
            this.cartas.push(cartaNueva);
        }
    }

    mezclar() {

        for (let index = this.cartas.length - 1; index > 0; index--) {
            let j = Math.floor(Math.random() * (index + 1));

            [this.cartas[index], this.cartas[j]] = [this.cartas[j], this.cartas[index]]

        }

    }



}

function pasarTurno() {
    let i = 0;

    for (let index = 0; index < jugadores.length; index++) {
        const element = jugadores[index];

        if (jugadores[index].turno == true) {
            jugadores[index].turno = false;

            if (index != jugadores.length - 1) {
                i = index + 1;
            }

            index = jugadores.length;
        }
    }

    jugadores[i].turno = true;
    activarBoton();

}

function comprobarJugador() {
    let numeroEliminar = 5
    for (let index = 0; index < jugadores.length; index++) {
        const element = jugadores[index];
        let eliminar = false;
        element.cartas.forEach(element => {
            if (element.tipo == 'Bomba') {
                eliminar = true;
                jugadores[index].eliminado = true;
                jugadores[index].eliminaCartas();
            }
        });
        numeroEliminar == index
    }

}

function colorTurno() {

    let numeroTurno = 0;
    for (let index = 0; index < jugadores.length; index++) {
        const element = jugadores[index];
        if (element.turno == true && element.eliminado == false) {
            numeroTurno = index + 1;
        }
    }

    switch (numeroTurno) {
        case 1:
            turno1Color.setAttribute('class', 'turnoJugador');
            turno2Color.removeAttribute('class')
            turno3Color.removeAttribute('class')
            break;
        case 2:
            turno2Color.setAttribute('class', 'turnoJugador');
            turno1Color.removeAttribute('class')
            turno3Color.removeAttribute('class')
            break;
        case 3:
            turno3Color.setAttribute('class', 'turnoJugador');
            turno2Color.removeAttribute('class')
            turno1Color.removeAttribute('class')
            break;
        case 0:
            break;
    }
}


function colorEliminado() {
    let numeroEliminado = 0;
    let calavera = '/img/eliminado/calavera.png';

    for (let index = 0; index < jugadores.length; index++) {
        const element = jugadores[index];
        if (element.eliminado == true) {
            numeroEliminado = index + 1;
        }
    }

    switch (numeroEliminado) {
        case 1:
            imagenJ1.setAttribute('src', calavera)
            break;
        case 2:
            imagenJ2.setAttribute('src', calavera)
            break;
        case 3:
            imagenJ3.setAttribute('src', calavera)
            break;
        default:
            break;
    }
}

function activarBoton() {
    jugadores.forEach(element => {
        if (element.turno == true) {
            if (element.saltarTurno() >= 1) {
                //debugger;
                botonPasarTurno.setAttribute('class', 'btnAccion')
                botonPasarTurno.removeAttribute('disabled')

            } else {

                botonPasarTurno.setAttribute('class', 'btnAccionMal')
                botonPasarTurno.setAttribute('disabled', true)

            }
        }
    })
}

function comprobarVictoria() {
    let contadorWin = 0;
    jugadores.forEach(element => {
        if (element.eliminado == true) {
            contadorWin++;
        }
    });
    if (contadorWin == 2) {
        victoria = true;
    }
}

function sumarDescarte(carta) {

    let nuevaEntrada = document.createElement('li')
    nuevaEntrada.innerHTML = carta.tipo;
    columnaDescartes.append(nuevaEntrada);
}


function robarCarta() {
    if (victoria) {
        jugadores.forEach(element => {
            if (!element.eliminado) {
                alert('Se acabo la partida, ' + element.nombre + ' ganó!')
            }
        });

    } else {
        let cartaElegida = barajaCreada.cartas.pop();

        imagenCarta.setAttribute('src', cartaElegida.enlace);

        jugadores.forEach(element => {
            if (element.turno == true && element.eliminado == false) {
                element.addCarta(cartaElegida);
                console.log('----Jugador que roba------')
                console.log(element)
            }
        });

        let todoOk = false;

        do {
            pasarTurno();
            jugadores.forEach(element => {
                if (element.turno == true) {
                    if (element.eliminado == true) {
                        pasarTurno();
                    }
                }
            });
        } while (todoOk)

        activarBoton();
        comprobarJugador();
        colorTurno();

        console.log('------------------------------situacion actual---------------------------------------')
        console.log(jugadores);

        comprobarVictoria();
        colorEliminado();
        actualizarContador();
    }
}

let victoria = false;
let barajaCreada = new Baraja();
let jugador1 = new Jugador("Jose", true);
let jugador2 = new Jugador("Juan");
let jugador3 = new Jugador("Pepe");
let jugadores = [];
jugadores.push(jugador1, jugador2, jugador3);
console.log(jugadores)
barajaCreada.inicializa();
barajaCreada.mezclar();


let botonPasarTurno = document.getElementById('btnPasar');
let botonRobarCarta = document.getElementById('btnRobar');

let imagenCarta = document.getElementById('imgCartaRobada');

let turno1Color = document.getElementById('turno1')
let turno2Color = document.getElementById('turno2')
let turno3Color = document.getElementById('turno3')

let imagenJ1 = document.getElementById('imgJ1');
let imagenJ2 = document.getElementById('imgJ2');
let imagenJ3 = document.getElementById('imgJ3');

let columnaDescartes = document.getElementById('listaDescarte');




//j1
let j1numCartas = document.getElementById('J1NumCartas');
let j1numPuntos = document.getElementById('J1Puntos');
let j1numSaltos = document.getElementById('J1saltoTurno');
let j1numDesactivacion = document.getElementById('J1Desactivacion');

//j2
let j2numCartas = document.getElementById('J2NumCartas');
let j2numPuntos = document.getElementById('J2Puntos');
let j2numSaltos = document.getElementById('J2saltoTurno');
let j2numDesactivacion = document.getElementById('J2Desactivacion');

//j3
let j3numCartas = document.getElementById('J3NumCartas');
let j3numPuntos = document.getElementById('J3Puntos');
let j3numSaltos = document.getElementById('J3saltoTurno');
let j3numDesactivacion = document.getElementById('J3Desactivacion');

function actualizarContador() {
    j1numCartas.textContent = ' ⚪️ Número de cartas: ' + `${jugador1.contarCartas()}`;
    j1numPuntos.textContent = ' ⚪️ Puntos totales: ' + `${jugador1.contarPuntos()}`;
    j1numSaltos.textContent = ' ⚪️ Cartas salto turno: ' + `${jugador1.saltarTurno()}`;
    j1numDesactivacion.textContent = ' ⚪️ Cartas desactivación: ' + `${jugador1.numDesactivar()}`;

    j2numCartas.textContent = ' ⚪️ Número de cartas: ' + `${jugador2.contarCartas()}`;
    j2numPuntos.textContent = ' ⚪️ Puntos totales: ' + `${jugador2.contarPuntos()}`;
    j2numSaltos.textContent = ' ⚪️ Cartas salto turno: ' + `${jugador2.saltarTurno()}`;
    j2numDesactivacion.textContent = ' ⚪️ Cartas desactivación: ' + `${jugador2.numDesactivar()}`;

    j3numCartas.textContent = ' ⚪️ Número de cartas: ' + `${jugador3.contarCartas()}`;
    j3numPuntos.textContent = ' ⚪️ Puntos totales: ' + `${jugador3.contarPuntos()}`;
    j3numSaltos.textContent = ' ⚪️ Cartas salto turno: ' + `${jugador3.saltarTurno()}`;
    j3numDesactivacion.textContent = ' ⚪️ Cartas desactivación: ' + `${jugador3.numDesactivar()}`;
}

botonRobarCarta.onclick = robarCarta;
botonPasarTurno.onclick = pasarTurno;

console.log('------------------------------situacion actual---------------------------------------')
console.log(jugadores)









