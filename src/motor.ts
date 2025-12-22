import { Carta, Tablero } from "./model.js";

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
  console.log("tablero", tablero);
  console.log("indice", indice);

  tablero.cartas[indice].estaVuelta = true;
  const imgCarta = document.getElementById(`img-card-${indice}`);
  if (imgCarta && imgCarta instanceof HTMLImageElement) {
    imgCarta.src = tablero.cartas[indice].imagen;
  }
};

/*
Iniciar partida
*/

export const iniciaPartida = (tablero: Tablero): void => {
  barajarCartas(tablero.cartas);
  tablero.estadoPartida = "CeroCartasLevantadas";
};
