import { tablero } from "./model";
import {
  iniciaPartida,
  sePuedeVoltearLaCarta,
  voltearLaCarta,
} from "./motor.js";

const buttonEmpezarPartida = document.getElementById("start-button");

if (buttonEmpezarPartida && buttonEmpezarPartida instanceof HTMLButtonElement) {
  buttonEmpezarPartida.addEventListener("click", () => iniciaPartida(tablero));
}

tablero.cartas.map((carta, index) => {
  const contenedorCarta = document.querySelector(`[data-indice-id="${index}"]`);
  if (contenedorCarta && contenedorCarta instanceof HTMLDivElement) {
    contenedorCarta.addEventListener("click", () => {
      console.log(`Carta clicada: `, carta);
      const cartaQuePodemosVoltear = sePuedeVoltearLaCarta(tablero, index);
      console.log(`¿Se puede voltear la carta? `, cartaQuePodemosVoltear);
      if (cartaQuePodemosVoltear) {
        voltearLaCarta(tablero, index);
      }
    });
  }
});

// cartasArray.map((carta, index) => {
//   const contenedorCarta = document.querySelector(`[data-indice-id="${index}"]`);
//   if (contenedorCarta && contenedorCarta instanceof HTMLDivElement) {
//     contenedorCarta.addEventListener("click", () => {
//       const imgCarta = contenedorCarta.querySelector("img");
//       if (imgCarta && imgCarta instanceof HTMLImageElement) {
//         imgCarta.src = carta.imagen;
//       }
//     });
//   }
// });
