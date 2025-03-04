import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

function DoughnutChart() {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            // Destroy previous chart instance if it exists
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            // Define initial dataset
            const data = {
                labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                datasets: [
                    {
                        label: 'Dataset 1',
                        data: [12, 19, 10, 7, 15],
                        backgroundColor: ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB'],
                    }
                ]
            };

            // Chart configuration
            const config = {
                type: 'doughnut',
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: true, text: 'Doughnut Chart Example' }
                    }
                }
            };

            // Create new chart instance
            const newChart = new Chart(ctx, config);
            chartRef.current = newChart;
            setChartInstance(newChart);
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    // Action Handlers
    const randomizeData = () => {
        if (chartInstance) {
            chartInstance.data.datasets.forEach(dataset => {
                dataset.data = dataset.data.map(() => Math.floor(Math.random() * 100));
            });
            chartInstance.update();
        }
    };

    const addDataset = () => {
        if (chartInstance) {
            const data = chartInstance.data;
            const newDataset = {
                label: `Dataset ${data.datasets.length + 1}`,
                backgroundColor: ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB'],
                data: data.labels.map(() => Math.floor(Math.random() * 100))
            };

            data.datasets.push(newDataset);
            chartInstance.update();
        }
    };

    const removeDataset = () => {
        if (chartInstance) {
            chartInstance.data.datasets.pop();
            chartInstance.update();
        }
    };

    const addData = () => {
        if (chartInstance) {
            const newLabel = `Data ${chartInstance.data.labels.length + 1}`;
            chartInstance.data.labels.push(newLabel);

            chartInstance.data.datasets.forEach(dataset => {
                dataset.data.push(Math.floor(Math.random() * 100));
            });

            chartInstance.update();
        }
    };

    const removeData = () => {
        if (chartInstance && chartInstance.data.labels.length > 0) {
            chartInstance.data.labels.pop();
            chartInstance.data.datasets.forEach(dataset => dataset.data.pop());

            chartInstance.update();
        }
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <canvas style={{ width: '100%', height: '100%' }} ref={canvasRef}></canvas>
        </div>
         
    );
}

export default DoughnutChart;
