console.log("Prueba concepto 4");

const changeCardsrcA = (): void => {
  const imgCard = document.getElementById("img-card-A");
  if (imgCard && imgCard instanceof HTMLImageElement) {
    imgCard.src =
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/1.png";
  }
};

const cardDivA = document.getElementById("card-A");
if (cardDivA && cardDivA instanceof HTMLDivElement) {
  cardDivA.addEventListener("click", changeCardsrcA);
}

const changeCardsrcB = (): void => {
  const imgCard = document.getElementById("img-card-B");
  if (imgCard && imgCard instanceof HTMLImageElement) {
    imgCard.src =
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/2.png";
  }
};

const cardDivB = document.getElementById("card-B");
if (cardDivB && cardDivB instanceof HTMLDivElement) {
  cardDivB.addEventListener("click", changeCardsrcB);
}
