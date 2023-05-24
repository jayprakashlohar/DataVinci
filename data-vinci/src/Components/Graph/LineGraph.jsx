import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar,  } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const LineGraph = ({ data }) => {
  var LineData = {
    labels: data?.data?.map((x) => x.sector),
    datasets: [
      {
        label: "Intensity",
        data: data?.data?.map((x) => x.intensity),
        borderWidth: 1,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: [createColor(255)],
        fill: false,
        tension: 0.1,
      },
      {
        label: "Likelihood",
        data: data?.data?.map((x) => x.likelihood),
        borderWidth: 1,
        borderColor: "rgb(255, 99, 132)",
        fill: false,
        backgroundColor: [createColor(255)],
        tension: 1,
      },
    ],
  };

  var options = {
    responsive: true,
    maintainAspectRation: false,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  function random(num) {
    return Math.floor(Math.random() * num);
  }

  function createColor() {
    return `rgb(${random(255)},${random(255)},${random(255)})`;
  }

  return (
    <Box
      border="1px solid teal"
      borderRadius="10px"
      w="50%"
      m="auto"
    >
      <Bar data={LineData} options={options} />
    </Box>
  );
};

export default LineGraph;

LineGraph.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        sector: PropTypes.string,
        intensity: PropTypes.number,
        likelihood: PropTypes.number,
      })
    ),
  }),
};
