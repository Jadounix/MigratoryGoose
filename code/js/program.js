//Création d'une nouvelle simulation
let simulation = new Simulation();
//Initialisation de la simulation
simulation.initialisation();
simulation.createTree();

let time;

document.getElementById("buttonStart").addEventListener("click", function() {
  time = setInterval(function() {
    simulation.move();
  }, 500);
});

document.getElementById("buttonStop").addEventListener("click", function() {
  clearInterval(time);
});
