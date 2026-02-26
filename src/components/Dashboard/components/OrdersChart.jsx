import { Bar } from "react-chartjs-2";
import { useRef } from "react";

const OrdersChart = ({ data }) => {
  const chartRef = useRef(null);

  if (!data?.length) return null;

  return (
    <div className="orders-chart-card">
      <h3>Orders Overview</h3>
      <div className="chart-wrapper">
        <Bar
          ref={chartRef}
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Orders",
                data,
                backgroundColor: "#c7a27c",
                borderRadius: 10,
                hoverBackgroundColor: "#b89067",
                barThickness: 26,
              },
            ],
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
          options={{
            responsive: true,
            maintainAspectRatio: false,
            transitions: {
              show: {
                animations: {
                  x: {
                    from: 0,
                  },
                  y: {
                    from: 0,
                  },
                },
              },
              hide: {
                animations: {
                  x: {
                    to: 0,
                  },
                  y: {
                    to: 0,
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default OrdersChart;
