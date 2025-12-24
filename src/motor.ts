import { Carta, Tablero } from "./model";

const barajarCartas = (cartas: Carta[]): Carta[] => {
  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
  }
  return cartas;
};

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
  registroEstadoPartida(tablero, indice);
};

const registroEstadoPartida = (tablero: Tablero, indice: number): void => {
  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.indiceCartaVolteadaA = indice;
    tablero.estadoPartida = "UnaCartaLevantada";
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.indiceCartaVolteadaB = indice;
    tablero.estadoPartida = "DosCartasLevantadas";
  }
};

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

export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  const todasEncontradas = esPartidaCompleta(tablero);
  if (todasEncontradas) {
    tablero.estadoPartida = "PartidaCompleta";
  } else {
    resetearIndicesVolteados(tablero);
  }
};

const resetearIndicesVolteados = (tablero: Tablero): void => {
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};

export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  resetearIndicesVolteados(tablero);
};

export const esPartidaCompleta = (tablero: Tablero): boolean =>
  tablero.cartas.every((carta) => carta.encontrada);

/*
Iniciar partida
*/

export const iniciaPartida = (tablero: Tablero): void => {
  barajarCartas(tablero.cartas);
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
    carta.encontrada = false;
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
  });
  tablero.numeroIntentos = 0;
};
