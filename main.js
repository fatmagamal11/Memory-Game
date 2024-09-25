let nameValue = document.getElementById("value");
let nameSpan = document.querySelector(".name span");
let controls = document.querySelector(".control-buttons");
let wrongTries = document.querySelector(".tries span");
let blocksContainer = document.querySelector(".memory-game-blocks");
let tryNumber = wrongTries.innerHTML;
let win = 0;
// duration in two blocks rotation
let duration = 1000;

document.querySelector(".control-buttons span").onclick = function () {
  var yourName = nameValue.value;
  if (yourName == "" || yourName == null) {
    nameSpan.innerHTML = "Player ☺";
  } else {
    nameSpan.innerHTML = yourName;
  }
  controls.remove();
  blocks.forEach((block) => {
    block.classList.add("is-flipped");
    setTimeout(() => {
      block.classList.remove("is-flipped");
    }, duration);
  });
};

//blocks into container as array to iterate on
let blocks = Array.from(blocksContainer.children); //Array.from() ==> take elements and add it to array

// create range of keys as same length of block number
// let orderRange=[...Array(blocks.length).keys()]
let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);

//add order to each block
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    // Update the active index
    activeIndex = this.getAttribute("data-animals");
    block.classList.toggle("is-flipped");
    //collect all flipped array
    let allFlippedBlocks = blocks.filter((flippedBlock) =>
      flippedBlock.classList.contains("is-flipped")
    );
    if (allFlippedBlocks.length === 2) {
      //block selecting
      non_clicking();
      //check matcking
      checkMatch(allFlippedBlocks);
      console.log(win);
      if (win === 6) {
        document.getElementById("Win").play();
        createBalloons(300);
        setTimeout(() => {
          location.reload();
        }, 20 * duration);
      }
    }
  });
});

function checkMatch(allFlippedBlocks) {
  if (
    allFlippedBlocks[0].getAttribute("data-animals") ===
    allFlippedBlocks[1].getAttribute("data-animals")
  ) {
    win++;
    document.getElementById("success").play();
    allFlippedBlocks.forEach((flipped) => {
      flipped.classList.remove("is-flipped");
      flipped.classList.add("is-match");
    });
  } else {
    document.getElementById("fail").play();
    tryNumber++;
    wrongTries.innerHTML = tryNumber;
    setTimeout(() => {
      allFlippedBlocks.forEach((flipped) => {
        flipped.classList.remove("is-flipped");
      });
    }, duration);
  }
}
function non_clicking() {
  blocksContainer.classList.add("stop-click");
  setTimeout(() => {
    blocksContainer.classList.remove("stop-click");
  }, duration);
}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

// ballons section
const balloonContainer = document.getElementById("balloon-container");

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(50);
  var dur = random(5) + 5;
  return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `;
}

function createBalloons(num) {
  for (var i = num; i > 0; i--) {
    var balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();
    balloonContainer.append(balloon);
  }
}
