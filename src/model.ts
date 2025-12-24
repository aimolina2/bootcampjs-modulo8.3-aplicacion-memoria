import { IMGCARTA } from "./constantes";

export interface Carta {
  idFoto: number;
  imagen: string;
  estaVuelta: boolean;
  encontrada: boolean;
}

interface InfoCarta {
  idFoto: number;
  imagen: string;
}

const infoCartas: InfoCarta[] = [
  {
    idFoto: 1,
    imagen: IMGCARTA.srcImg1,
  },

  {
    idFoto: 2,
    imagen: IMGCARTA.srcImg2,
  },

  {
    idFoto: 3,
    imagen: IMGCARTA.srcImg3,
  },

  {
    idFoto: 4,
    imagen: IMGCARTA.srcImg4,
  },

  {
    idFoto: 5,
    imagen: IMGCARTA.srcImg5,
  },

  {
    idFoto: 6,
    imagen: IMGCARTA.srcImg6,
  },
];

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
});

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
  let cartas: Carta[] = [];
  infoCartas.forEach((infoCarta) => {
    const carta1 = crearCartaInicial(infoCarta.idFoto, infoCarta.imagen);
    const carta2 = crearCartaInicial(infoCarta.idFoto, infoCarta.imagen);
    cartas.push(carta1, carta2);
  });
  return cartas;
};

export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas);

/*
  Aquí definimos el tipo de estado de la partida, la idea es que cuando empiece la partida todas las cartas estén boca abajo y si se hacen click sobre ellas no se volteen.
  EstadoPartida = "PartidaNoIniciada", una vez que se pulse Iniciar partida el estado de la partida cambiaría a "CeroCartasLevantadas" y así sucesivamente.
*/

type EstadoPartida =
  | "PartidaNoIniciada"
  | "CeroCartasLevantadas"
  | "UnaCartaLevantada"
  | "DosCartasLevantadas"
  | "PartidaCompleta";

export interface Tablero {
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
  numeroIntentos: number;
}

const crearTableroInicial = (): Tablero => ({
  cartas: cartas,
  estadoPartida: "PartidaNoIniciada",
  numeroIntentos: 0,
});

export let tablero: Tablero = crearTableroInicial();
