//Nombre de tests réalisés
let nbTests = 0;
//Nombre de tests ayant échoués
let failedTests = 0;

/* ========================================================================== */
//Tests unitaires des fonctions du fichier utils
/* ========================================================================== */

const testConvertGridCellToPixel = () => {
  nbTests++;
  const expectPixel = 251;
  if (convertGridCellToPixel(12) !== expectPixel) {
    console.error('Function convertGridCellToPixel failed');
  }
}
testConvertGridCellToPixel();

const testGetParameters = () => {
  nbTests++;
  const expectParam = 0.01;
  if (getParameter("disasterRatePurple") !== expectParam) {
    failedTests++;
    console.error('Function getParameter failed');
  }
}
testGetParameters();

const testSetParameters = () => {
  nbTests++;
  const expectParam = 0.02;
  setParameter("disasterRatePurple", 0.02);
  if (getParameter("disasterRatePurple") !== expectParam) {
    failedTests++;
    console.error('Function setParameter failed');
  }
}
testSetParameters();

const testCheckParameter = () => {
  nbTests++;
  const expectParam = 0.02;
  checkParameter("disasterRatePurple");
  if (getParameter("disasterRatePurple") !== expectParam) {
    failedTests++;
    console.error('Function checkParameter failed');
  }
}
testCheckParameter();

const testResetParameters = () => {
  nbTests++;
  const expectParam = 200;
  resetParameters();
  if (getParameter("nbTrees") !== expectParam) {
    failedTests++;
    console.error('Function resetParameters failed');
  }
}
testResetParameters();

const testConfirmParameters = () => {
  nbTests++;
  confirmParameters();
  const expectParam = 0.01;
  if (getParameter("disasterRatePurple") !== expectParam) {
    failedTests++;
    console.error('Function confirmParameters failed');
  }
}
testConfirmParameters();


/* ========================================================================== */
//Tests unitaires des fonctions de la classe Map
/* ========================================================================== */
const testTurnOccupied = () => {
  nbTests++;
  simulation.map.turnOccupied(2, 2);
  const expectParam = 0.01;
  if (simulation.map.matrice[2][2] !== true) {
    failedTests++;
    console.error('Function turnOccupied failed');
  }
}
testTurnOccupied();

const testTurnUnoccupied = () => {
  nbTests++;
  simulation.map.turnUnoccupied(3, 3);
  if (simulation.map.matrice[3][3] !== false) {
    failedTests++;
    console.error('Function turnUnoccupied failed');
  }
}
testTurnUnoccupied();

/* ========================================================================== */
//Affichage des tests
/* ========================================================================== */
console.log("Lancement des tests unitaires :");
console.log("Tests effectués : " + nbTests);
console.log("Nombre de tests échoués : " + failedTests);
console.log("Nombre de tests réussis : " + (nbTests - failedTests));
console.log("Fin des tests unitaires.");
