//Fonctions et méthodes

//Permet de convertir des coordonnées de grille en position en pixels
const convertGridCellToPixel = (cellPosition) => { //le padding est la marge de décalage de départ. Le + 1 permet de ne pas recouvrir la grille
  let pixel = padding + 1 + cellSize * cellPosition;
  return (pixel)
}

const resetParameters = () => {
  nbTrees = 200;
  nbBirds = 10;
}

const confirmParameters = () => {
  if (document.getElementById("nbTreesOnMap").value != "") {
    nbTrees = parseInt(document.getElementById("nbTreesOnMap").value);
  } else {
    nbTrees = 200;
  }

  if (document.getElementById("nbBirdsOnMap").value != "") {
    nbBirds = parseInt(document.getElementById("nbBirdsOnMap").value);
  } else {
    nbBirds = 10;
  }

  if (document.getElementById("disasterRatePurple").value != "") {
    disasterRatePurple = parseInt(document.getElementById("nbBirdsOnMap").value);
  } else {
    disasterRatePurple = 0.3;
  }

  if (document.getElementById("foodRatePurple").value != "") {
    foodRatePurple = parseInt(document.getElementById("nbBirdsOnMap").value);
  } else {
    foodRatePurple = 0.3;
  }

  if (document.getElementById("reproRatePurple").value != "") {
    reproRatePurple = parseInt(document.getElementById("nbBirdsOnMap").value);
  } else {
    reproRatePurple = 0.8;
  }

}

const generateSimulation = () => {
  confirmParameters();
  //Initialisation de la simulation avec les nouveaux paramètres
  simulation.initialisation();
}


// //Creer un intervalle dans laquelle la fonction de déplacement move est appelée
// let time;
// const createInterval = () => {
//   let inverseValue = (speedSlider.max*1 + speedSlider.min*1)  - speedSlider.value;
//   let time = setInterval(function() {
//     simulation.move();
//   }, inverseValue);
//   console.log(inverseValue);
// }
//
// //Actualise la vitesse de la simulation à partir de la vitesse donnée par le slider
// const changeSpeed = (event) => {
//   if (event.target.value !== "undefined") {
//     speedSlider.value = event.target.value;
//   }
//   clearInterval(time);
//   createInterval();
// }
