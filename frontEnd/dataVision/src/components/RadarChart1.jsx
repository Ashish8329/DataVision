import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function RadarChart() {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            // Destroy previous chart instance if it exists
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            // Define dataset labels
            const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

            // Define dataset
            const data = {
                labels: labels,
                datasets: [{
                    label: 'relevance',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1,
                    data: [10, 20, 30, 40, 50, 0, 5],
                }]
            };

            // Chart configuration
            const config = {
                type: 'radar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            angleLines: {
                                color: 'red', // Red angle lines
                            }
                        }
                    },
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Radar Chart Example' }
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

export default RadarChart;
