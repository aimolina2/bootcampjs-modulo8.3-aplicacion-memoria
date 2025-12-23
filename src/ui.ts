import { tablero } from "./model";
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
