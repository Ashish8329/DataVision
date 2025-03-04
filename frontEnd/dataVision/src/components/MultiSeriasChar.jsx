import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function PieChart() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      // Destroy previous chart instance if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Data labels
      const labels = [
        // "Overall Yay",
        // "Overall Nay",
        // "Group A Yay",
        // "Group A Nay",
        // "Group B Yay",
        // "Group B Nay",
        // "Group C Yay",
        // "Group C Nay",
      ];

      // Dataset configuration
      const data = {
        labels: labels,
        datasets: [
          {
            backgroundColor: ["#AAA", "#777"],
            data: [21, 79],
          },
          {
            backgroundColor: ["hsl(0, 100%, 60%)", "hsl(0, 100%, 35%)"],
            data: [33, 67],
          },
          {
            backgroundColor: ["hsl(100, 100%, 60%)", "hsl(100, 100%, 35%)"],
            data: [20, 80],
          },
          {
            backgroundColor: ["hsl(180, 100%, 60%)", "hsl(180, 100%, 35%)"],
            data: [10, 90],
          },
        ],
      };

      // Custom legend generation
      function generateLabels(chart) {
        const original = Chart.overrides.pie.plugins.legend.labels.generateLabels;
        const labelsOriginal = original.call(this, chart);

        let datasetColors = chart.data.datasets.map((e) => e.backgroundColor).flat();

        labelsOriginal.forEach((label) => {
          label.datasetIndex = Math.floor(label.index / 2);
          label.hidden = !chart.isDatasetVisible(label.datasetIndex);
          label.fillStyle = datasetColors[label.index];
        });

        return labelsOriginal;
      }

      // Chart configuration
      const config = {
        type: "pie",
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: { generateLabels },
              onClick: (mouseEvent, legendItem, legend) => {
                const datasetMeta = legend.chart.getDatasetMeta(legendItem.datasetIndex);
                datasetMeta.hidden = legend.chart.isDatasetVisible(legendItem.datasetIndex);
                legend.chart.update();
              },
            },
            tooltip: {
              callbacks: {
                title: (context) => {
                  const labelIndex = context[0].datasetIndex * 2 + context[0].dataIndex;
                  return `${context[0].chart.data.labels[labelIndex]}: ${context[0].formattedValue}`;
                },
              },
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

export default PieChart;
