import selecionaCotacao from "./imprimeCotacao.js";

const graficoDolar = document.getElementById("graficoDolar");
const graficoParaDolar = new Chart(graficoDolar, {
    
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dolar',
        data: [],
        borderWidth: 1
      }]
    }
  });

const graficoIene = document.getElementById("graficoIene");
const graficoParaIene = new Chart(graficoIene, {
    
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Iene',
        data: [],
        borderColor: "purple",
        borderWidth: 1
      }]
    }
  });

const graficoDolarCanadense = document.getElementById("graficoDolarCanadense");
const graficoParaDolarCanadense = new Chart(graficoDolarCanadense, {
    
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dolar Canadense',
        data: [],
        borderColor: "orange",
        borderWidth: 1
      }]
    }
  });

function geraHorario() {
    
    let data = new Date();
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    console.log(horario);
    
    return horario;
};

function adicionaDados(grafico, label, dados) {
    
    grafico.data.labels.push(label);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados);
    });
    grafico.update();
};

let workerDolar = new Worker('./scripts/workers/workerDolar.js');
workerDolar.postMessage('usd');

workerDolar.addEventListener("message", event => {
    
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao('dolar', valor);
    adicionaDados(graficoParaDolar, tempo, valor);
});

let workerIene = new Worker('./scripts/workers/workerIene.js');
workerIene.postMessage('iene');

workerIene.addEventListener("message", event => {
    
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao('iene', valor);
    adicionaDados(graficoParaIene, tempo, valor);
});

let workerDolarCanadense = new Worker('./scripts/workers/workerDolarCanadense.js');
workerDolarCanadense.postMessage('DolarCanadense');

workerDolarCanadense.addEventListener("message", event => {
    
    let tempo = geraHorario();
    let valor = event.data.ask;
    selecionaCotacao("CAD", valor);
    adicionaDados(graficoParaDolarCanadense, tempo, valor);
});