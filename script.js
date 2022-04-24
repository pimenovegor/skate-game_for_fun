const barrier = document.getElementsByClassName("barrier")[0];
const skater = document.getElementsByClassName("skater")[0];
const counter = document.getElementsByClassName("counter")[0];
const btn = document.getElementsByClassName("btn")[0];

let speed = 1;
const count = function () {
  counter.innerHTML = Number(counter.innerHTML) + 1;
  speedUp();
};
let countInterval;

const positionCheck = function () {
  const skaterTop = parseInt(getComputedStyle(skater).getPropertyValue("top"));
  const barrierLeft = parseInt(
    getComputedStyle(barrier).getPropertyValue("left")
  );

  if (barrierLeft > 80 && barrierLeft < 170 && skaterTop > 70) {
    barrier.classList.add("stop");
    clearInterval(countInterval);
    clearInterval(positionCheckInterval);
    btn.style = "visibility: visible";
  }
};
let positionCheckInterval;

const skaterJump = function () {
  skater.classList.add("jump");
  setTimeout(() => {
    skater.classList.remove("jump");
  }, 600);
};

const speedUp = function () {
  if (!(Number(counter.innerHTML) % 10)) {
    speed = (speed - 0.05).toFixed(2);
    barrier.classList.remove("move");
    barrier.style = "animation-duration: " + speed + "s";
    clearInterval(countInterval);
    clearInterval(positionCheckInterval);
    setTimeout(() => {
      barrier.classList.add("move");
      countInterval = setInterval(count, speed * 1000);
      positionCheckInterval = setInterval(positionCheck, 10);
    }, 15);
  }
};

const start = function () {
  barrier.style = "animation-duration: " + speed + "s";
  skaterJump();
  setTimeout(() => {
    barrier.classList.add("move");
    countInterval = setInterval(count, 1000);
  }, 500);
  positionCheckInterval = setInterval(positionCheck, 10);
};

const restart = function () {
  speed = 1;
  counter.innerHTML = 0;
  barrier.style = "animation-duration: " + speed + "s";
  barrier.classList.remove("stop");
  barrier.classList.remove("move");
  btn.style = "visibility: hidden";
  start();
};

document.addEventListener("keydown", start, {once:true});
document.addEventListener("keydown", skaterJump);
btn.addEventListener("click", restart);
