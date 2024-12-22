import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceChart = ({ historicalPerformance }) => {
  const data = {
    labels: historicalPerformance.map((_, index) => `Sprint ${index + 1}`),
    datasets: [
      {
        label: 'Velocity',
        data: historicalPerformance,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Historical Performance Velocity',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 2,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PerformanceChart;