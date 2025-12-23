import { tablero, Tablero } from "./model";
import { sePuedeVoltearLaCarta, voltearLaCarta } from "./motor";

tablero.cartas.map((_, index) => {
  const contenedorCarta = document.querySelector(`[data-indice-id="${index}"]`);
  if (contenedorCarta && contenedorCarta instanceof HTMLDivElement) {
    contenedorCarta.addEventListener("click", () => {
      const cartaQuePodemosVoltear = sePuedeVoltearLaCarta(tablero, index);
      if (cartaQuePodemosVoltear) {
        voltearLaCarta(tablero, index);
      }
    });
  }
});

// Función para mostrar la imagen de la carta volteada en la interfaz
export const mostrarImagenCarta = (tablero: Tablero, indice: number): void => {
  const imgCarta = document.getElementById(`img-card-${indice}`);
  if (imgCarta && imgCarta instanceof HTMLImageElement) {
    imgCarta.src = tablero.cartas[indice].imagen;
  }
};
