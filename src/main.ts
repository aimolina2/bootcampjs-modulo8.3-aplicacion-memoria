import { inicializarEventosCartas, ponerEnMarchaPartida } from "./ui";

document.addEventListener("DOMContentLoaded", () => inicializarEventosCartas());

const buttonEmpezarPartida = document.getElementById("start-button");

if (buttonEmpezarPartida && buttonEmpezarPartida instanceof HTMLButtonElement) {
  buttonEmpezarPartida.addEventListener("click", ponerEnMarchaPartida);
}
