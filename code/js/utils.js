//Fonctions et méthodes

//Permet de convertir des coordonnées de grille en position en pixels
const convertGridCellToPixel = (cellPosition) => { //le padding est la marge de décalage de départ. Le + 1 permet de ne pas recouvrir la grille
  let pixel = padding + 1 + cellSize * cellPosition;
  return (pixel)
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
