const colors = document.getElementById("colors");
let difficultyVal = 4;
let winningColor;
const infotext = document.getElementById("infoText");
let gameWon;

function updateValue(value) {
  document.getElementById("difficulty").innerHTML = "Colors: " + value;
  difficultyVal = value;
  setUp();
}

function randomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const hexColor = `#${red.toString(16).padStart(2, "0")}${green
    .toString(16)
    .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;

  return hexColor;
}

function setUp() {
  gameWon = false;
  infotext.innerText = ''

  colors.innerHTML = "";

  const winningIndex = Math.floor(Math.random() * difficultyVal);

  for (let i = 0; i < difficultyVal; i++) {
    const color = document.createElement("button");
    color.classList.add("color-button");

    const buttonColor = randomColor();
    color.style.backgroundColor = buttonColor;

    if (i === winningIndex) {
      document.getElementById("colortext").innerHTML =
        buttonColor.toUpperCase();
    }

    color.addEventListener("click", function () {
      if (!gameWon) {
        if (i === winningIndex) {
          infotext.innerText = "Congrats, that's the color!";
          gameWon = true;
        } else {
          infotext.innerText = "Wrong! That's not the color!";
          color.style.opacity = "10%";
          color.style.backgroundColor = "gray";
        }
      } else {
        infotext.innerText = "you must press reset to play again!";
      }
    });

    colors.appendChild(color);
  }

  winningColor = randomColor();
  document.getElementById("color-to-guess").style.backgroundColor =
    winningColor;
}
