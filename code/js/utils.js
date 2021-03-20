//Fonctions et méthodes

//Permet de convertir des coordonnées de grille en position en pixels
const convertGridCellToPixel = (cellPosition) => { //le padding est la marge de décalage de départ. Le + 1 permet de ne pas recouvrir la grille
  let pixel = padding + 1 + cellSize * cellPosition;
  return (pixel)
}

const getParameter = (name) => {
  return parameters[name].value;
}

const setParameter = (name, newValue) => {
  parameters[name].value = newValue;
}

const resetParameters = () => {
  setParameter("nbTrees",200);
  setParameter("nbBirds",10);
}

const confirmParameters = () => {
  for(parameter in parameters)
  {
    if (document.getElementById(parameter).value != "") {
      parameters[parameter].value = parseInt(document.getElementById(parameter).value);
    } else {
      parameters[parameter].value = parameters[parameter].default;
    }
  }
}

const generateSimulation = () => {
  confirmParameters();
  //Initialisation de la simulation avec les nouveaux paramètres
  simulation.initialisation();
}

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
