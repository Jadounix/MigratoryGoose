let config = {
  type: 'line',
  data: {
    labels: ['0'],
    datasets: [{
        label: "Population d'oiseaux migrateurs",
        backgroundColor: "#ff8080",
        borderColor: "#ff8080",
        data: migratoryBirdsData,
        fill: false,
      },
      {
        label: "Population d'oiseaux sédentaires",
        fill: false,
        backgroundColor: "#ffff80",
        borderColor: "#ffff80",
        data: sedentaryBirdsData,
        fill: false,
      }
    ]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Evolution des populations d'oiseau en fonction du temps"
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Temps en nombre de déplacements'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Nombre d'individus dans la population"
        }
      }]
    }
  }
};

let birdsChart = new Chart(canvasGraphContext, config);
