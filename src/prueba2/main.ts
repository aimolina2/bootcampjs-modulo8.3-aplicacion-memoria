console.log("Hola desde prueba2 main.ts");

const changeCardsrc = (): void => {
  const imgCard = document.getElementById("img-card");
  if (imgCard && imgCard instanceof HTMLImageElement) {
    imgCard.src =
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/1.png";
  }
};

const cardDiv = document.getElementById("card");
if (cardDiv && cardDiv instanceof HTMLDivElement) {
  cardDiv.addEventListener("click", changeCardsrc);
}
