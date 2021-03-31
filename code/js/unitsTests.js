let nbTests = 0;
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

const testCheckParameter = () => { //A REVOIR
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

/* ========================================================================== */
//Tests unitaires des fonctions de la classe Bird
/* ========================================================================== */

/* ========================================================================== */
//Tests unitaires des fonctions de la classe Area
/* ========================================================================== */

/* ========================================================================== */
//Tests unitaires des fonctions de la classe Simulation
/* ========================================================================== */

/* ========================================================================== */
//Affichage des tests
/* ========================================================================== */
console.log("Lancement des tests unitaires :");
console.log("Tests effectués : "+nbTests);
console.log("Nombre de tests échoués : "+failedTests);
console.log("Nombre de tests réussis : "+(nbTests-failedTests));
console.log("Fin des tests unitaires.");
