import { IMGCARTA } from "./constantes";
import { Carta, Tablero } from "./model";
import { mostrarImagenCarta } from "./ui";

/*
En el motor nos va a hacer falta un método para barajar cartas
*/
const barajarCartas = (cartas: Carta[]): Carta[] => {
  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }
  return cartas;
};

/*
  Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
*/
export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  if (
    tablero.cartas[indice].encontrada ||
    tablero.cartas[indice].estaVuelta ||
    tablero.estadoPartida === "PartidaCompleta" ||
    tablero.estadoPartida === "PartidaNoIniciada"
  ) {
    return false;
  } else {
    return true;
  }
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  tablero.cartas[indice].estaVuelta = true;
  mostrarImagenCarta(tablero, indice);
  registroEstadoPartida(tablero, indice);
  comprobarSiSonPareja(tablero);
};

// Actualiza el estado de la partida según cuántas cartas estén volteadas
const registroEstadoPartida = (tablero: Tablero, indice: number): void => {
  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.indiceCartaVolteadaA = indice;
    tablero.estadoPartida = "UnaCartaLevantada";
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.indiceCartaVolteadaB = indice;
    tablero.estadoPartida = "DosCartasLevantadas";
  }
};

const comprobarSiSonPareja = (tablero: Tablero): void => {
  if (tablero.estadoPartida === "DosCartasLevantadas") {
    const emparejados: boolean = sonPareja(
      tablero.indiceCartaVolteadaA!,
      tablero.indiceCartaVolteadaB!,
      tablero
    );
    actualizarIndiceTrasComprobarPareja(tablero, emparejados);
  }
};

const actualizarIndiceTrasComprobarPareja = (
  tablero: Tablero,
  emparejados: boolean
): void => {
  if (emparejados) {
    parejaEncontrada(
      tablero,
      tablero.indiceCartaVolteadaA!,
      tablero.indiceCartaVolteadaB!
    );
  } else {
    setTimeout(() => {
      parejaNoEncontrada(
        tablero,
        tablero.indiceCartaVolteadaA!,
        tablero.indiceCartaVolteadaB!
      );
    }, 1000);
  }
};

/*
  Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
*/
export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  if (tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto) {
    return true;
  } else {
    return false;
  }
};

/*
  Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
*/
const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  const todasEncontradas = esPartidaCompleta(tablero);
  if (todasEncontradas) {
    tablero.estadoPartida = "PartidaCompleta";
    console.log("¡Partida completa!");
  } else {
    tablero.estadoPartida = "CeroCartasLevantadas";
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
  }
};

/*
  Aquí asumimos que no son pareja y las volvemos a poner boca abajo
*/
const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  const imgCartaA = document.getElementById(`img-card-${indiceA}`);
  const imgCartaB = document.getElementById(`img-card-${indiceB}`);
  if (imgCartaA && imgCartaA instanceof HTMLImageElement) {
    imgCartaA.src = IMGCARTA.srcCardEmpty;
  }
  if (imgCartaB && imgCartaB instanceof HTMLImageElement) {
    imgCartaB.src = IMGCARTA.srcCardEmpty;
  }
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};

/*
  Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
*/
export const esPartidaCompleta = (tablero: Tablero): boolean =>
  tablero.cartas.every((carta) => carta.encontrada);

/*
Iniciar partida
*/

export const iniciaPartida = (tablero: Tablero): void => {
  barajarCartas(tablero.cartas);
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.cartas.map((carta, index) => {
    carta.estaVuelta = false;
    carta.encontrada = false;
    const imgCarta = document.getElementById(`img-card-${index}`);
    if (imgCarta && imgCarta instanceof HTMLImageElement) {
      imgCarta.src = IMGCARTA.srcCardEmpty;
    }
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
  });
  console.log("Partida iniciada", tablero);
};
