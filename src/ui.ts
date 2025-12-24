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

const animacionMostrarImagenCarta = (indice: number): void => {
  const divCard = document.getElementById(`card-${indice}`);
  if (divCard && divCard instanceof HTMLDivElement) {
    divCard.classList.add("flip-animation");
  }
};

const animacionSalidaImagenCarta = (indiceA: number, indiceB: number): void => {
  const divCardA = document.getElementById(`card-${indiceA}`);
  const divCardB = document.getElementById(`card-${indiceB}`);
  if (
    divCardA &&
    divCardA instanceof HTMLDivElement &&
    divCardB &&
    divCardB instanceof HTMLDivElement
  ) {
    divCardA.classList.remove("flip-animation");
    divCardB.classList.remove("flip-animation");
    divCardA.classList.add("flip-animation-toexit");
    divCardB.classList.add("flip-animation-toexit");
    setTimeout(() => {
      divCardA.classList.remove("flip-animation-toexit");
      divCardB.classList.remove("flip-animation-toexit");
    }, 400);
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
      animacionSalidaImagenCarta(indiceA, indiceB);
      ocultarImagenCarta(indiceA);
      ocultarImagenCarta(indiceB);
    }, 1000);
  }
  tablero.numeroIntentos += 1;
  mostrarNumeroIntentos();
};

const mostrarNumeroIntentos = (): void => {
  const movesCounter = document.getElementById("moves-counter");
  if (movesCounter && movesCounter instanceof HTMLParagraphElement) {
    movesCounter.textContent = `Número de intentos: ${tablero.numeroIntentos}`;
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
  textoAviso(index);
  if (sePuedeVoltearLaCarta(tablero, index)) {
    animacionMostrarImagenCarta(index);
    voltearLaCarta(tablero, index);
    setTimeout(() => {
      mostrarImagenCarta(tablero, index);
    }, 150);
    comprobarPareja();
  }
};

const textoAviso = (index: number): void => {
  if (tablero.cartas[index].estaVuelta === true) {
    const warning = document.getElementById("warning");
    if (warning && warning instanceof HTMLParagraphElement) {
      warning.classList.add("warning");
      warning.textContent = "¡Esta carta ya está volteada! Prueba con otra.";
      setTimeout(() => {
        warning.textContent = "";
        warning.classList.remove("warning");
      }, 2000);
    }
  }
};

export const ponerEnMarchaPartida = (): void => {
  iniciaPartida(tablero);
  resetearCartasUI();
  mostrarNumeroIntentos();
  console.log("Partida iniciada", tablero);
};
