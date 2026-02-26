import { Line } from "react-chartjs-2";
import { useRef } from "react";

const RevenueChart = ({ data }) => {
  const chartRef = useRef(null);

  if (!data?.length) return null;

  return (
    <div className="revenue-chart-card">
      <h3> Revenue Overview</h3>
      <div className="chart-wrapper">
        <Line
          ref={chartRef}
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Revenue",
                data,
                tension: 0.4,
                borderColor: "#c7a27c",
                backgroundColor: "rgba(199, 162, 124, 0.25)",
                pointBackgroundColor: "#5a3e2b",
                pointRadius: 4,
                fill: true,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animations: {
              tension: {
                duration: 1000,
                easing: "linear",
                from: 1,
                to: 0,
                loop: true,
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: "#3a2518",
                  font: { weight: "600" },
                },
              },
            },

            scales: {
              x: {
                grid: { display: false },
                ticks: { color: "#3a2518" },
              },
              y: {
                grid: { color: "rgba(58,37,24,0.15)" },
                ticks: { color: "#3a2518" },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default RevenueChart;
