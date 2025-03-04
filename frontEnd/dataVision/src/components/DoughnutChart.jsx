import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function DoughnutChart({ keysArray = [], valuesArray = [] }) {
  const canvasRef = useRef(null); // Canvas reference
  const chartRef = useRef(null); // Chart instance reference

  useEffect(() => {
    if (canvasRef.current && keysArray.length > 0 && valuesArray.length > 0) {
      const ctx = canvasRef.current.getContext("2d");

      // Destroy previous chart instance if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const data = {
        labels: keysArray,
        datasets: [
          {
            label: "Dataset",
            data: valuesArray,
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(153, 102, 255)",
              "rgb(255, 159, 64)",
            ],
            hoverOffset: 4,
          },
        ],
      };

      const config = {
        type: "pie",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                font: {
                  size: 14,
                },
              },
            },
          },
        },
      };

      // Create new chart instance
      chartRef.current = new Chart(ctx, config);
    }

    // Cleanup: Destroy chart on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [keysArray, valuesArray]); // Rerun effect when data changes

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }}></canvas>
    </div>
  );
}

export default DoughnutChart;
