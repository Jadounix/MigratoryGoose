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

//Fonction qui vérifie que la valeur du paramètre entrée est bien comprise dans le bon interval
const checkParameter = (name) => {
  let max = parameters[name].max;
  let min = parameters[name].min;
  parameters[name].value = (parameters[name].value >= min && parameters[name].value <= max) ? parameters[name].value : parameters[name].default;
}

const resetParameters = () => {
  setParameter("nbTrees", 200);
  setParameter("nbBirds", 10);
}

const confirmParameters = () => {
  for (parameter in parameters) {
    if (document.getElementById(parameter).value != "") {
      if (parameter == "nbBirds" || parameter == "nbTrees") //Sont des nombres entiers => besoin d'être covertis en cas d'erreur de l'utilisateur
      {
        parameters[parameter].value = parseInt(document.getElementById(parameter).value);
      } else {
        parameters[parameter].value = (document.getElementById(parameter).value);
      }
      checkParameter(parameter);
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

const addData = (chart, label) => {
  chart.data.labels.push(iteration);
  chart.data.datasets[0].data.push(nbMigratoryData);
  chart.data.datasets[1].data.push(nbSedentaryData);
  chart.update();
  iteration++;
}

let time;
const createInterval = () => {
  let inverseValue = (speedSlider.max * 1 + speedSlider.min * 1) - speedSlider.value;
  time = setInterval(function() {
    simulation.move();
    addData(birdsChart);
  }, inverseValue);
}

const stopSimulation = () => {
  clearInterval(time);
}

const changeSpeed = (event) => {
  if (event.target.value !== "undefined") {
    speedSlider.value = event.target.value;
  }
  clearInterval(time);
  createInterval();
}

const resetGraphic = () => {
  sedentaryBirdsData = [];
  migratoryBirdsData = []
  // for (i = 0; i < 2; i++) {
  //   birdsChart.data.datasets.splice(0, 1);
  // }
  // birdsChart.data.datasets[0] = migratoryBirdsData;
  // birdsChart.data.datasets[1] = sedentaryBirdsData;
  birdsChart.update();
  stopSimulation();
}
