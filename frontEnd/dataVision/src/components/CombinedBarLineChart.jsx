import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function CombinedBarLineChart() {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            // Destroy previous chart instance if it exists
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            // Labels for the X-axis
            const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

            // Generate random data for datasets
            const generateRandomData = (count, min, max) =>
                Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1) + min));

            // Define dataset
            const data = {
                labels: labels,
                datasets: [
                    {
                        label: 'data (Bar)',
                        data: generateRandomData(7, -100, 100),
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        order: 1
                    },
                    {
                        label: 'likelihood (Line)',
                        data: generateRandomData(7, -100, 100),
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        type: 'line',
                        order: 0
                    }
                ]
            };

            // Chart configuration
            const config = {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'Combined Line & Bar Chart'
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Months'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Values'
                            },
                            beginAtZero: true
                        }
                    }
                }
            };

            // Create new chart instance
            chartRef.current = new Chart(ctx, config);
        }

        // Cleanup function to destroy chart on unmount
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }}></canvas>
        </div>
    );
}

export default CombinedBarLineChart;
