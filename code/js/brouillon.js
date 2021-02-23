var graphDiagonal = new Graph([
		[1,1,1,1],
		[0,1,1,0],
		[0,0,1,1]
	], { diagonal: true });

	var start = graphDiagonal.grid[0][0];
	var end = graphDiagonal.grid[1][2];
	var resultWithDiagonals = astar.search(graphDiagonal, start, end, { heuristic: astar.heuristics.diagonal });
	// Weight can easily be added by increasing the values within the graph, and where 0 is infinite (a wall)
	var graphWithWeight = new Graph([
		[1,1,2,30],
		[0,4,1.3,0],
		[0,0,5,1]
	]);
	var startWithWeight = graphWithWeight.grid[0][0];
	var endWithWeight = graphWithWeight.grid[1][2];
	var resultWithWeight = astar.search(graphWithWeight, startWithWeight, endWithWeight);


//





let Node = {
  constructor(x, y, cost, heuristique) {
    this.x = x;
    this.y = y;
    this.cost = cost;
    this.heuristique = heuristique;
  }

  //calcule la distance euclidienne entre les points (x1,y1) et (x2,y2)
  distance(x1, y1, x2, y2) {
    return sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  }

  compare2nodes(n1, n2) {
    n1.heuristique = distance(n1.x, n1.y, goal.x, goal.y);
    n2.heuristique = distance(n2.x, n2.y, goal.x, goal.y);

    if (n1.heuristique < n2.heuristique) {
      return 1;
    } else if (n1.heuristique == n2.heuristique) {
      return 0;
    } else {
      return -1;
    }
  }

  isInList(n, tab) {
    for (let i = 0; i < tab.length; i++) {
      if (n == tab[i]) return [true, tab[i]];
      else return [false, 0];
    }
  }

  bestNode(tab)
  {
    bestNode = tab[0];
    for (let i = 0; i < tab.length; i++) {
      if(i.cost < bestNode.cost)
      {
        bestNode = i;
      }
    }
    return bestNode;
  }

  addClosedLlist(n, closedList, openList)
  {
    openList.pop(n);
    openList.push(n);
  }

  addOpenList() {

    let possibilities = [
      new Node(this.x, this.y + step, 0, 0),
      new Node(this.x, this.y - step, 0, 0),
      new Node(this.x + step, this.y, 0, 0),
      new Node(this.x - step, this.y, 0, 0)
    ]

    for (let k of possibilities) {
      if (checkCellDisponibility(tab, donner un x et un y)) {
        let isInListClosedBool = isInList(n, closedList)[0];
        let isInListClosedElement = isInList(n, closedList)[1];
        if (isInList(n, closedList) == false) //Le noeud n'est pas présent dans la liste des fermés
        {
          //Calcul des couts H et G
          //..
          let isInListOpenBool = isInList(n, openList)[0];
          let isInListOpenElement = isInList(n, openList)[1];
          //L'élement appartient à la liste des ouverts
          if (isInListOpenBool) {
            //On compare les couts : s'il est inférieur on actualise la liste des ouverts
            if (isInLisElement.cost > n.cost) {
              openList.push(n);
              openList.pop(isInListOpenElement);
            }
          }
          //Si le noeud n'est pas présent dans les ouvert on l'y ajoute
          else {
            openList.push(n);
          }
        }
      }
    }
  }


  Astar(graphe, start, goal) {
    let openList = [start]; //liste des ouverts ne contenant que le noeud de départ puisque c'est le seul noeud connu
    let closedList = []; //Liste des fermés

    openList = FilePrioritaire(comparateur = compare2Noeuds)
    while (openSet.length > 0) {
      u = openList.defiler()
      si u.x == objectif.x et u.y == objectif.y
      reconstituerChemin(u)
      terminer le programme
      pour chaque voisin v de u dans g
      si non(v existe dans closedList ou v existe dans openList avec un coût inférieur)
      v.cout = u.cout + 1
      v.heuristique = v.cout + distance([v.x, v.y], [objectif.x, objectif.y])
      openList.ajouter(v)
      closedList.ajouter(u)
    }

    terminer le programme(avec erreur)

  }


}

let startNode = new Node(1, 1, 0, 0);
