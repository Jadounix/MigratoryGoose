//Création d'une simulation
let simulation = new Simulation();
simulation.initialisation();

//Listeners des différents boutons. Les fonctions sont toutes dans le fichier utils.js
document.getElementById("downloadButton").addEventListener("click", saveGraph)
document.getElementById("buttonConfirm").addEventListener("click", confirmParameters);
document.getElementById("buttonReset").addEventListener("click", resetParameters);
document.getElementById("speedSlider").addEventListener("input", changeSpeed);
document.getElementById("buttonStart").addEventListener("click", createInterval);
document.getElementById("buttonStop").addEventListener("click", stopSimulation);
document.getElementById("buttonScenario1").addEventListener("click", paramScenario1);
document.getElementById("buttonScenario2").addEventListener("click", paramScenario2);
document.getElementById("buttonScenario3").addEventListener("click", paramScenario3);
