import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function LineChart({ keysArray, valuesArray }) {
    const canvasRef = useRef(null); // Canvas reference
    const chartRef = useRef(null); // Chart instance reference

    useEffect(() => {
        if (!keysArray.length || !valuesArray.length) {
            console.log("Waiting for data...");
            return; // Avoid rendering if data is empty
        }

        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");

            // Destroy previous chart instance if it exists
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            const data = {
                labels: keysArray,
                datasets: [
                    {
                        label: "Intensity",
                        data: valuesArray,
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        tension: 0.1,
                    },
                ],
            };

            const config = {
                type: "line",
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "top",
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "End Year",
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Intensity",
                            },
                            beginAtZero: true,
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
    }, [keysArray, valuesArray]); // Ensure effect runs when data changes

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }}></canvas>
        </div>
    );
}

export default LineChart;
