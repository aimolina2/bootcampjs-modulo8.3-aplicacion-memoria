# Módulo 8.1 - Aplicación juego de memoria

Pasos:

- Clonate el proyecto.
- Instala las dependencias con `npm install`.
- Ejecuta el sandbox con `npm run dev`.
- Abre el navegador en `http://localhost:5173/` (si ese puerto no te funciona, mira en la consola donde has hecho el build, puede que este ocupado y se haya abierto en otro puerto).

Antes de poner el marcha el juego realizamos una serie de pruebas de concepto. Cada una de estas pruebas estará dentro de una carpeta independiente en el archivo _src_. Y para poder acceder al index de cada prueba deberemos modificar la url de entrada para llegar hasta la carpeta correspondiente.

## Prueba 1 - barajar las cartas

URL: http://localhost:5173/src/prueba1/index.html

Partimos de un array de cartas que debemos "mezclar". Devolvemos el array pero con los elementos "desordenados" para conseguir un resultado aleatorio.

Con la `function shuffle` recorremos todos los elementos modificando la posición de forma aleatoria.

<img src="./images/shuffle.png" alt="shuffle" title="shuffle cards" />

## Prueba 2 - Mostrar imagen y volver la carta

URL: http://localhost:5173/src/prueba2/index.html

Creamos un div con la imagen "vacía" y al hacer click de cambia por la imagen que definimos en la función.

Primero, en main.ts describimos el cambio y despues lo ejecutamos al hacer click sobre el div.

## Prueba 3 - Mostrar un grid de cartas

URL: http://localhost:5173/src/prueba3/index.html

Duplicamos las card hasta tener 12 y desde el style.css aplicamos los estilos:

```#app {
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 60px;
  background-color: rgb(167, 212, 255);
  border-radius: 10px;
}
```

<img src="./images/grid.png" alt="grid" title="grid cards" />

## Prueba 4 - mostrar 2 cartas

Duplicamos lo creado en el htlm y el main.ts de la Prueba 2, solo que diferenciando entre la card A y la card B.
Después, cogemos los estilos aplicados en el css de la Prueba 3 y los aplicamos a las cards. En este caso al tener solo 2 cards, en lugar de 12 debemos ajustar la grid para que funcione con 2 columnas en lugar de con 4.

<img src="./images/two-cards.png" alt="gridtwo-cards" title="two-cards" />

## Prueba 5 - mapear el DIV y asignar las img correspondientes teniendo en cuenta su data-indice-id

Definimos el array incluyendo el idFoto (del 1 al 6 x2, ya que se repiten las tarjetas) y asignando las url a las imágenes.

En el html cada card cuenta con una imagen y le asignamos un data-indice-id (del 0 al 11 para que coincida con el índice del array). Hacemos un `.map´para recorrer el array completo y asignar a cada card su imagen.

<img src="./images/div-images.png" alt="grid" title="grid cards" />

## Implementación

### HTML

En index.html montamos la grid con las tarjetas (tal y como hemos hecho en la prueba 5) + el botón de "Empezar partida", que será el encargado de barajar y resetear la partida.

### Iniciar partida

En el botón "Empezar partida", al hacer click cargamos el tablero, barajamos y modificamos el estado a "CeroCartasLevantadas".

Es en el `motor.ts` donde definimos las funciones de `barajarCartas` e `iniciaPartida`.

### OPCIONALES. Mostrar número de intentos.

Creamos un div con un párrafo en el index.html con el texto "Mostrar número de intentos". En el `ui.ts`, creamos la funcion encargada de mostrar el numero de intentos, y la llamamos dentro de la función `comprobarPareja`.

Hacemos que sume +1 cada vez que comprueba si las cards volteadas son pareja y lo actualizamos en el html.

### OPCIONALES. Mostra animación cuando el usuario pinche la carta.

En el ui.ts creamos las funciones de entrada y de salida de la animación, indicando que se apliquen al div. En el css creamos la clase a aplicar con las características de la animación.

Llamamos a la funcion de entrada `const animacionMostrarImagenCarta` en `const handleClickCarta` para que se ponga en marcha una vez hagamos click sobre la carta. Para afinar el resultado, haremos que se muestre la imagen una vez pasen unos segundos.

Por otro lado la función de salida `const animacionSalidaImagenCarta`se ejecuta tras comprobar que las dos cartas volteadas no son pareja. Esta función, elimina la animación de entrada y aplica la de salida, que también hemos creado en el css, y trancurridos unos segundos borra la animación para resetear los estilos del div que contiene la carta.
