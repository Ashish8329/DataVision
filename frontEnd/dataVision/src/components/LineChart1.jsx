import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function LineChart() {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            // Destroy previous chart instance if it exists
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            // Generate labels from 0 to 11
            const labels = Array.from({ length: 12 }, (_, i) => i.toString());

            // Data points with NaN included
            const datapoints = [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170];

            // Define dataset
            const data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Cubic interpolation (monotone)',
                        data: datapoints,
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        cubicInterpolationMode: 'monotone',
                        tension: 0.4
                    },
                    {
                        label: 'Cubic interpolation',
                        data: datapoints,
                        borderColor: 'rgb(54, 162, 235)',
                        fill: false,
                        tension: 0.4
                    },
                    {
                        label: 'Linear interpolation (default)',
                        data: datapoints,
                        borderColor: 'rgb(75, 192, 75)',
                        fill: false
                    }
                ]
            };

            // Chart configuration
            const config = {
                type: 'line',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: 'Chart.js Line Chart - Cubic interpolation mode' }
                    },
                    interaction: { intersect: false },
                    scales: {
                        x: {
                            display: true,
                            title: { display: true }
                        },
                        y: {
                            display: true,
                            title: { display: true, text: 'Value' },
                            suggestedMin: -10,
                            suggestedMax: 200
                        }
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
        <div style={{ width: '1000px', height: '100%' }}>
            <canvas className='linechart1'ref={canvasRef} style={{ width: '100px', height: '100%' }}></canvas>
        </div>
    );
}

export default LineChart;
