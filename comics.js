const sheets = document.querySelectorAll(".sheet");
const leftBtn = document.querySelector(".arrow.left");
const rightBtn = document.querySelector(".arrow.right");

let current = 0;

function openPage() {
  if (current < sheets.length) {
    sheets[current].classList.add("flipped");
    current++;
  }
}

function closePage() {
  if (current > 0) {
    current--;
    sheets[current].classList.remove("flipped");
  }
}

rightBtn.addEventListener("click", openPage);
leftBtn.addEventListener("click", closePage);