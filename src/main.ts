import { tablero } from "./model";
import { iniciaPartida } from "./motor";
import "./ui";

const buttonEmpezarPartida = document.getElementById("start-button");

if (buttonEmpezarPartida && buttonEmpezarPartida instanceof HTMLButtonElement) {
  buttonEmpezarPartida.addEventListener("click", () => iniciaPartida(tablero));
}
