import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function TrendChart({ keysArray = [], valuesArray = [] }) {
  const canvasRef = useRef(null); // Store canvas reference
  const chartRef = useRef(null); // Store chart instance

  useEffect(() => {
    if (canvasRef.current && keysArray.length > 0 && valuesArray.length > 0) {
      const ctx = canvasRef.current.getContext("2d");

      // Destroy the previous chart instance before creating a new one
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const data = {
        labels: keysArray, // Dynamic labels from API
        datasets: [
          {
            label: "Yearly Trend Data",
            data: valuesArray, // Dynamic data from API
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };

      // Create new chart instance and store it
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Cleanup: Destroy chart on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [keysArray, valuesArray]); // Re-render when props change

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }}></canvas>
    </div>
  );
}

export default TrendChart;
