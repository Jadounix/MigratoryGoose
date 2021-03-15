confirmParameters();

//Création d'une simulation
let simulation = new Simulation();
simulation.initialisation();

let time;

const createInterval = () => {
  let inverseValue = (speedSlider.max * 1 + speedSlider.min * 1) - speedSlider.value;
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

document.getElementById("buttonConfirm").addEventListener("click", generateSimulation);
document.getElementById("buttonReset").addEventListener("click", resetParameters);
document.getElementById("speedSlider").addEventListener("input", changeSpeed);
document.getElementById("buttonStart").addEventListener("click", createInterval);
document.getElementById("buttonStop").addEventListener("click", function() {
  clearInterval(time);
});
