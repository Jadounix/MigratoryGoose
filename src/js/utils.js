//Fonctions et méthodes du programme hors classe

/* ========================================================================== */
//Fonction permettant de convertir des coordonnées de grille en position en pixels
/* ========================================================================== */
const convertGridCellToPixel = (cellPosition) => { //le padding est la marge de décalage de départ. Le + 1 permet de ne pas recouvrir la grille
  let pixel = padding + 1 + cellSize * cellPosition;
  return (pixel)
}

/* ========================================================================== */
//Fonction qui permet de récupérer les graphes sous format jpg
/* ========================================================================== */
const saveGraph = () => {
  //Récupéaration de l'image du canvas
  let url_base64jp = document.getElementById("graph").toDataURL("image/jpg");
  //Récupération du boutton
  let a = document.getElementById("downloadButton");

  a.href = url_base64jp;
}

/* ========================================================================== */
//Fonction(s) concernant les paramètres
/* ========================================================================== */
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

//Fonction qui réinitialise les paramètres à leurs valeurs de défaut
const resetParameters = () => {
  for (parameter in parameters) {
    setParameter(parameter, parameters[parameter].default);
    document.getElementById(parameter).placeholder = parameters[parameter].default;
  }
}

//Fonction qui permet de confirmer les nouveaux paramètres entrés par l'utilisateur
const confirmParameters = () => {
  for (parameter in parameters) {
    if (document.getElementById(parameter).value != "") {
      if (parameter == "nbBirds" || parameter == "nbTrees") //Sont des nombres entiers => besoin d'être covertis en cas d'erreur de l'utilisateur
      {
        parameters[parameter].value = parseInt(document.getElementById(parameter).value);
      } else {
        parameters[parameter].value = parseFloat(document.getElementById(parameter).value);
      }
      checkParameter(parameter);
    } else {
      parameters[parameter].value = parameters[parameter].default;
    }
    document.getElementById(parameter).placeholder = parameters[parameter].value;
  }
}

//Fonctions qui mettent automatiquement les paramètres des différents scénarios
const paramScenario1 = () => {
  for (parameter in parameters) {
    setParameter(parameter, parameters[parameter].scenario1Value);
    document.getElementById(parameter).placeholder = parameters[parameter].scenario1Value;
  }
}

const paramScenario2 = () => {
  for (parameter in parameters) {
    setParameter(parameter, parameters[parameter].scenario2Value);
    document.getElementById(parameter).placeholder = parameters[parameter].scenario2Value;
  }
}

const paramScenario3 = () => {
  for (parameter in parameters) {
    setParameter(parameter, parameters[parameter].scenario3Value);
    document.getElementById(parameter).placeholder = parameters[parameter].scenario3Value;
  }
}

//Fonction qui empêche l'utilisateur de modifier les paramètres uen fois la simulation lancée
const readOnlyParamaters = () => {
  if (simulationState == false) {
    for (parameter in parameters) {
      document.getElementById(parameter).readOnly = false;
    }
  } else {
    for (parameter in parameters) {
      document.getElementById(parameter).readOnly = true;
      document.getElementById("buttonReset").disabled = true;
      document.getElementById("buttonConfirm").disabled = true;
    }
  }
}

/* ========================================================================== */
//Fonction(s) concernant l'interface utilisateur
/* ========================================================================== */
const showErrorMsg = () => {
  document.getElementById("errorMessage").innerHTML = errorMsg;
}

/* ========================================================================== */
//Fonction(s) concernant les graphes
/* ========================================================================== */
const addData = (chart, label) => {
  chart.data.labels.push(iteration); //Abcisse du graph
  //Valeurs en ordonnée des deux courbes
  chart.data.datasets[0].data.push(nbMigratoryData);
  chart.data.datasets[1].data.push(nbSedentaryData);
  chart.update();

  //Récupération des données sous forme de tableaux pour pouvoir faire des statistiques descriptives
  sedentaryBirdsData = sedentaryBirdsData.concat([nbSedentaryData]);
  migratoryBirdsData = migratoryBirdsData.concat([nbMigratoryData]);
  iteration++;
}

/* ========================================================================== */
//Fonction(s) concernant les intervalles de temps de la simulation
/* ========================================================================== */
let time;
let first = true;

const createInterval = () => {
  //Si c'est la première fois que je rentre dans cette fonction j'initialise la simulation. Ensuite first devient false et l'initialisation n'est plus appelée
  if (first == true) {
    simulation.initiateNbBirdsAndTrees();
    first = false;
  }
  let inverseValue = (speedSlider.max * 1 + speedSlider.min * 1) - speedSlider.value;
  simulationState = true;
  readOnlyParamaters();
  time = setInterval(function() {
    simulation.move();
    addData(birdsChart);
  }, inverseValue);
}

//Fonction pour mettre la simulation en pause
const stopSimulation = () => {
  clearInterval(time);
  readOnlyParamaters();
}

//Fonction qui modifie la vitesse de déplacement
const changeSpeed = (event) => {
  if (event.target.value !== "undefined") {
    speedSlider.value = event.target.value;
  }
  clearInterval(time);
  createInterval();
}
