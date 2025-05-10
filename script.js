const bmiZonesPlugin = {
  id: 'bmiZones',
  beforeDraw: (chart) => {
    const { ctx, chartArea, scales: { y } } = chart;

    function drawZone(yMin, yMax, color) {
      const top = y.getPixelForValue(yMax);
      const bottom = y.getPixelForValue(yMin);
      ctx.fillStyle = color;
      ctx.fillRect(chartArea.left, top, chartArea.right - chartArea.left, bottom - top);
    }

    drawZone(0, 18.5, 'rgba(147,197,253,0.2)');
    drawZone(18.5, 24.9, 'rgba(134,239,172,0.2)');
    drawZone(25, 29.9, 'rgba(253,224,71,0.2)');
    drawZone(30, 50, 'rgba(252,165,165,0.2)');
  }
};

let bmiHistory = [];

const resultDiv = document.getElementById("result");
const historyList = document.getElementById("historyList");
const chartCtx = document.getElementById("bmiChart").getContext("2d");

let bmiChart = new Chart(chartCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'BMI Value',
      data: [],
      borderColor: 'rgba(59,130,246,1)',
      backgroundColor: 'rgba(59,130,246,0.2)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 50,
        ticks: {
          stepSize: 5
        }
      }
    },
    plugins: {
      legend: { display: true }
    }
  },
  plugins: [bmiZonesPlugin]
});

function updateHistory() {
  historyList.innerHTML = "";
  bmiHistory.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.date} - BMI: ${entry.bmi} (${entry.status})`;
    historyList.appendChild(li);
  });

  updateChart();
}

function updateChart() {
  bmiChart.data.labels = bmiHistory.map((_, i) => `#${i + 1}`);
  bmiChart.data.datasets[0].data = bmiHistory.map(entry => entry.bmi);
  bmiChart.update();
}

document.getElementById("calculateBtn").addEventListener("click", () => {
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);

  if (!height || !weight || height <= 0 || weight <= 0) {
    resultDiv.textContent = "Please enter valid height and weight.";
    resultDiv.className = "text-red-600 font-semibold text-center mt-6";
    return;
  }

  const bmi = weight / ((height / 100) ** 2);
  let status = "";
  if (bmi < 18.5) status = "Underweight";
  else if (bmi < 24.9) status = "Normal weight";
  else if (bmi < 29.9) status = "Overweight";
  else status = "Obese";

  resultDiv.className = "text-center text-lg font-semibold text-gray-800 mt-6";
  resultDiv.innerHTML = `Your BMI is <span class="text-blue-600">${bmi.toFixed(2)}</span> (${status})`;

  const entry = {
    date: new Date().toLocaleDateString(),
    bmi: parseFloat(bmi.toFixed(2)),
    status
  };

  bmiHistory.push(entry);
  updateHistory();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  document.getElementById("height").value = "";
  document.getElementById("weight").value = "";
  resultDiv.textContent = "";
});

document.getElementById("clearHistoryBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear the history?")) {
    bmiHistory = [];
    updateHistory();
  }
});

// Initial load
updateHistory();
