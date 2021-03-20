confirmParameters();

//Création d'une simulation
let simulation = new Simulation();
simulation.initialisation();

document.getElementById("buttonConfirm").addEventListener("click", generateSimulation);
document.getElementById("buttonReset").addEventListener("click", resetParameters);
document.getElementById("speedSlider").addEventListener("input", changeSpeed);
document.getElementById("buttonStart").addEventListener("click", createInterval);
document.getElementById("buttonStop").addEventListener("click", function() {
  clearInterval(time);
});
