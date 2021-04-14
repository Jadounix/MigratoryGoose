confirmParameters();

//Création d'une simulation
let simulation = new Simulation();
simulation.initialisation();

document.getElementById("downloadButton").addEventListener("click", saveGraph)
document.getElementById("buttonConfirm").addEventListener("click", generateSimulation);
document.getElementById("buttonReset").addEventListener("click", resetParameters);
document.getElementById("speedSlider").addEventListener("input", changeSpeed);
document.getElementById("buttonStart").addEventListener("click", createInterval);
document.getElementById("buttonStop").addEventListener("click", stopSimulation);
document.getElementById("buttonScenario1").addEventListener("click", paramScenario1);
document.getElementById("buttonScenario2").addEventListener("click", paramScenario2);
document.getElementById("buttonScenario2").addEventListener("click", paramScenario3);
