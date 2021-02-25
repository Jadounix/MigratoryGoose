//Création d'une nouvelle simulation
let simulation = new Simulation();
//Initialisation de la simulation
simulation.initialisation();

let time;

const createInterval = () => {
  let inverseValue = (speedSlider.max*1 + speedSlider.min*1)  - speedSlider.value;
  time = setInterval(function() {
    simulation.move();
  }, inverseValue);
}

const changeSpeed = (event) => {
  if (event.target.value !== "undefined") {
    speedSlider.value = event.target.value;
  }
  clearInterval(time);
  createInterval();
}


document.getElementById("buttonStart").addEventListener("click", createInterval);
document.getElementById("buttonStop").addEventListener("click", function() {
  clearInterval(time);
});
speedSlider.addEventListener("input", changeSpeed);
