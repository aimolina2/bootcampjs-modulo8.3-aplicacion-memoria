import { Carta, Tablero } from "./model";

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
  if (tablero.cartas[indice].encontrada || tablero.cartas[indice].estaVuelta) {
    return false;
  } else {
    return true;
  }
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  tablero.cartas[indice].estaVuelta = true;
  const imgCarta = document.getElementById(`img-card-${indice}`);
  if (imgCarta && imgCarta instanceof HTMLImageElement) {
    imgCarta.src = tablero.cartas[indice].imagen;
  }
  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    tablero.indiceCartaVolteadaA = tablero.cartas[indice].idFoto;
    tablero.estadoPartida = "UnaCartaLevantada";
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    tablero.indiceCartaVolteadaB = tablero.cartas[indice].idFoto;
    tablero.estadoPartida = "DosCartasLevantadas";
  }
  if (tablero.estadoPartida === "DosCartasLevantadas") {
    sonPareja(
      tablero.indiceCartaVolteadaA!,
      tablero.indiceCartaVolteadaB!,
      tablero
    );
    // Aquí iría la lógica para manejar si son pareja o no
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
    console.log("¡Son pareja!");
    return true;
  } else {
    console.log("No son pareja");
    return false;
  }
};

/*
Iniciar partida
*/

export const iniciaPartida = (tablero: Tablero): void => {
  barajarCartas(tablero.cartas);
  tablero.estadoPartida = "CeroCartasLevantadas";
  console.log("Partida iniciada", tablero);
};
