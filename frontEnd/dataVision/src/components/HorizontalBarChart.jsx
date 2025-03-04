import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function HorizontalBarChart() {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            // Destroy previous chart instance if it exists
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            // Define dataset labels (Months)
            const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

            // Generate random numbers between -100 and 100
            const generateRandomData = (count, min, max) => {
                return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1) + min));
            };

            // Define dataset
            const data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Energy',
                        data: generateRandomData(7, -100, 100),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        label: 'Financial services',
                        data: generateRandomData(7, -100, 100),
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    }
                ]
            };

            // Chart configuration
            const config = {
                type: 'bar',
                data: data,
                options: {
                    indexAxis: 'y', // Horizontal Bar
                    elements: {
                        bar: {
                            borderWidth: 2,
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'right' },
                        title: { display: true, text: 'Chart.js Horizontal Bar Chart' }
                    }
                }
            };

            // Create new chart instance
            chartRef.current = new Chart(ctx, config);
        }

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

export default HorizontalBarChart;
