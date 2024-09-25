"use client"
import { useEffect } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';

// Register the components required by Chart.js
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

const SchoolChart = ({ chartId, chartData, chartType = 'line' }) => {
  useEffect(() => {
    const ctx = document.getElementById(chartId).getContext('2d');
    const schoolChart = new Chart(ctx, {
      type: chartType,
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function (tooltipItem) {
                let label = tooltipItem.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += Math.round(tooltipItem.parsed.y * 100) / 100;
                return label;
              }
            }
          }
        }
      }
    });

    return () => schoolChart.destroy();
  }, [chartId, chartData, chartType]);

  return <canvas id={chartId}></canvas>;
};

export default SchoolChart;



{/*"use client";
// components/InteractiveGraph.js
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
//  graph
const InteractiveGraph = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        // label: "Dataset 1",
        data: [20, 40, 50, 60, 70, 75, 80, 85, 90, 95, 93, 95],
        borderColor: "#ADFF2F",
        backgroundColor: "#ADFF2F",
        tension: 0.4,
      },
      {
        // label: "Dataset 2",
        data: [10, 25, 35, 45, 55, 60, 65, 70, 80, 85, 87, 89],
        borderColor: "#FF00FF",
        backgroundColor: "#FF00FF",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#000000", // Change legend text color to black
        },
      },
      title: {
        display: true,
        text: "Interactive Graph",
        color: "#000000", // Change title color to black
      },
    },
    scales: {
      x: {
        grid: {
          color: "#d2d2d2",
        },
        ticks: {
          color: "#000000", // Change x-axis tick color to black
        },
      },
      y: {
        grid: {
          color: "#d2d2d2",
        },
        ticks: {
          color: "#000000", // Change y-axis tick color to black
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default InteractiveGraph;
*/}
