import { IMGCARTA } from "./constantes";
import { tablero, Tablero } from "./model";
import {
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  sonPareja,
  parejaEncontrada,
  esPartidaCompleta,
  parejaNoEncontrada,
  iniciaPartida,
} from "./motor";

// Función para mostrar la imagen de la carta volteada en la interfaz
const mostrarImagenCarta = (tablero: Tablero, indice: number): void => {
  const imgCarta = document.getElementById(`img-card-${indice}`);
  if (imgCarta && imgCarta instanceof HTMLImageElement) {
    imgCarta.src = tablero.cartas[indice].imagen;
  }
};

const ocultarImagenCarta = (index: number): void => {
  const imgCarta = document.getElementById(`img-card-${index}`);
  if (imgCarta && imgCarta instanceof HTMLImageElement) {
    imgCarta.src = IMGCARTA.srcCardEmpty;
  }
};

const resetearCartasUI = (): void => {
  tablero.cartas.forEach((_, index) => {
    ocultarImagenCarta(index);
  });
};

const mostrarMensajePartidaCompleta = (): void => {
  console.log("¡Partida completa!");
};

const comprobarPareja = (): void => {
  if (tablero.estadoPartida !== "DosCartasLevantadas") return;
  const indiceA = tablero.indiceCartaVolteadaA!;
  const indiceB = tablero.indiceCartaVolteadaB!;
  const emparejados: boolean = sonPareja(indiceA, indiceB, tablero);
  if (emparejados) {
    parejaEncontrada(tablero, indiceA, indiceB);
    const partidaCompleta = esPartidaCompleta(tablero);
    if (partidaCompleta) {
      mostrarMensajePartidaCompleta();
    }
  } else {
    setTimeout(() => {
      parejaNoEncontrada(tablero, indiceA, indiceB);
      ocultarImagenCarta(indiceA);
      ocultarImagenCarta(indiceB);
    }, 1000);
  }
};

export const inicializarEventosCartas = (): void => {
  tablero.cartas.forEach((_, index) => {
    const contenedorCarta = document.querySelector(
      `[data-indice-id="${index}"]`
    );
    if (contenedorCarta && contenedorCarta instanceof HTMLDivElement) {
      contenedorCarta.addEventListener("click", () => handleClickCarta(index));
    }
  });
};

const handleClickCarta = (index: number): void => {
  if (sePuedeVoltearLaCarta(tablero, index)) {
    voltearLaCarta(tablero, index);
    mostrarImagenCarta(tablero, index);
    comprobarPareja();
  }
};

export const ponerEnMarchaPartida = (): void => {
  iniciaPartida(tablero);
  resetearCartasUI();
  console.log("Partida iniciada", tablero);
};
