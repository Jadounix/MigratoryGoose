//Création d'une nouvelle simulation
let simulation = new Simulation();
//Initialisation de la simulation
simulation.initialisation();
simulation.createTree();

let time;
//
const changeSpeed = (event) => {
  if(event.target.value !== "undefined")
  {
    speedSlider.value = event.target.value;
  }
  return speedSlider.value;
}

document.getElementById("buttonStart").addEventListener("click", function() {
  time = setInterval(function() {
    simulation.move();
  }, speedSlider.value);
});

// document.getElementById("buttonStart").addEventListener("click", function() {
//   time = setInterval(function() {
//     simulation.move();
//   }, function() {
//     changeSpeed();
//   });
// });


document.getElementById("buttonStop").addEventListener("click", function() {
  clearInterval(time);
});

speedSlider.addEventListener("input", changeSpeed);
