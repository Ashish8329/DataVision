import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function LineChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      // Destroy previous chart instance if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Generate labels (months)
      const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

      // Generate random numbers
      const generateNumbers = (count, min, max) =>
        Array.from({ length: count }, () =>
          Math.floor(Math.random() * (max - min + 1) + min)
        );

      // Data configuration
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Unfilled",
            fill: false,
            backgroundColor: "rgb(54, 162, 235)", // Blue
            borderColor: "rgb(54, 162, 235)",
            data: generateNumbers(7, -100, 100),
          },
          {
            label: "Dashed",
            fill: false,
            backgroundColor: "rgb(75, 192, 75)", // Green
            borderColor: "rgb(75, 192, 75)",
            borderDash: [5, 5], // Dashed line
            data: generateNumbers(7, -100, 100),
          },
          {
            label: "Filled",
            backgroundColor: "rgba(255, 99, 132, 0.5)", // Red with transparency
            borderColor: "rgb(255, 99, 132)",
            data: generateNumbers(7, -100, 100),
            fill: true,
          },
        ],
      };

      // Chart configuration
      const config = {
        type: "line",
        data: data,
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: "Chart.js Line Chart" },
          },
          interaction: {
            mode: "index",
            intersect: false,
          },
          scales: {
            x: {
              display: true,
              title: { display: true, text: "Month" },
            },
            y: {
              display: true,
              title: { display: true, text: "Value" },
            },
          },
        },
      };

      // Create chart instance
      chartRef.current = new Chart(ctx, config);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }}></canvas>
    </div>
  );
}

export default LineChart;
