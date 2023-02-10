console.log("Deck of Cards");

const mega = document.querySelector("#mega");

let removedCards = JSON.parse(localStorage.getItem("removedCards"));
let winner;
if (removedCards === null) {
  removedCards = [];
  winner = 0;
} else {
  winner = removedCards.length;
  for (let card of removedCards) {
    const imgBox = document.getElementById(`${card}`);
    imgBox.remove();
  }
}

const toRestart = () => {
  if (winner === 5) {
    $(document).ready(function () {
      $(".won").show();
    });
  }
};

if (winner === null) {
  winner = 0;
} else if (winner === 5) {
  toRestart();
}

const shuffleButton = document.getElementById("shuffle");
shuffleButton.addEventListener("click", (e) => {
  e.preventDefault();
  // suffleDeck();
  $(document).ready(function () {
    winner = 0;
    var a = $("#deck > div").remove().toArray();
    for (var i = a.length - 1; i >= 1; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var bi = a[i];
      var bj = a[j];
      a[i] = bj;
      a[j] = bi;
    }
    $("#deck").append(a);
    // location.replace(location.href.split("#")[0]);
  });
  const imgboxes = document.querySelectorAll(".whitebox");
  console.log(imgboxes);
});

var showed = true;
console.log("This is drag and drop utility");

const imgboxes = document.querySelectorAll(".whitebox");
const whiteBoxes = document.getElementsByClassName("placed");

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", (e) => {
  console.log("resetClicked");
  e.preventDefault();
  localStorage.clear();
  window.location.reload(true);
});

// Event listeners for draggable element imgBox
for (let imgBox of imgboxes) {
  imgBox.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", imgBox.children[0].id);
    console.log("DragStart has been triggered");
    e.target.className += " hold";
    setTimeout(() => {
      e.target.className = "hide";
    }, 0);
  });

  imgBox.addEventListener("dragend", (e) => {
    console.log("DragEnd has been triggered");
    e.target.className = "imgsbox";
  });
}

for (let whiteBox of whiteBoxes) {
  whiteBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    console.log("DragOver has been triggered");
  });

  whiteBox.addEventListener("dragenter", (e) => {
    console.log("DragEnter has been triggered");
    // e.target.className += " dashed";
  });

  whiteBox.addEventListener("dragleave", (e) => {
    console.log("DragLeave has been triggered");
    e.target.className = "whiteBox";
    this.className = "empty";
  });

  whiteBox.addEventListener("drop", (e) => {
    e.preventDefault();
    console.log("Drop has been triggered");
    const containerID = parseInt(e.target.id);
    const cardID = parseInt(e.dataTransfer.getData("text/plain"));
    if (!removedCards.includes(cardID)) {
      removedCards.push(cardID);
    }
    console.log(removedCards);
    localStorage.setItem("removedCards", JSON.stringify(removedCards));
    const imgBox = document.getElementById(`${cardID}`);
    if (!(imgBox.id >= 100 && imgBox.id <= 104)) {
      console.log(imgBox);
      console.log(containerID, cardID);
      if (containerID === 100) {
        if (cardID % 4 === 0) {
          winner += 1;
          imgBox.remove();
          toRestart();
        }
      } else if (containerID === 101) {
        if (cardID % 4 === 1) {
          winner += 1;
          imgBox.remove();
          toRestart();
        }
      } else if (containerID === 102) {
        if (cardID % 4 === 2) {
          winner += 1;
          imgBox.remove();
          toRestart();
        }
      } else if (containerID === 103) {
        if (cardID % 4 === 3) {
          winner += 1;
          imgBox.remove();
          toRestart();
        }
      }
    }
  });
}
