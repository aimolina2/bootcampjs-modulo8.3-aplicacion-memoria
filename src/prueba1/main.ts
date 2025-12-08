let cartas: string[] = ["🐹", "🐰", "🐨", "🐻", "🐼", "🐸", "🐮", "🐵"];

function shuffle(array: string[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

console.log("Cartas iniciales:", cartas);

shuffle(cartas);
console.log("Cartas mezcladas:", cartas);
shuffle(cartas);
console.log("Cartas mezcladas:", cartas);
shuffle(cartas);
console.log("Cartas mezcladas:", cartas);
shuffle(cartas);
console.log("Cartas mezcladas:", cartas);
