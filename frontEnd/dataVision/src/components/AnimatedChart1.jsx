import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function TrendLineChart() {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            let data = [];
            let data2 = [];
            let prev = 100;
            let prev2 = 80;
            for (let i = 0; i < 1000; i++) {
                prev += 5 - Math.random() * 10;
                data.push({ x: i, y: prev });
                prev2 += 5 - Math.random() * 10;
                data2.push({ x: i, y: prev2 });
            }

            const easing = 'easeOutQuad';
            const totalDuration = 5000;
            const duration = (ctx) => (ctx.index / data.length) * totalDuration / data.length;
            const delay = (ctx) => (ctx.index / data.length) * totalDuration;
            const previousY = (ctx) =>
                ctx.index === 0
                    ? ctx.chart.scales.y.getPixelForValue(100)
                    : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;

            const animation = {
                x: {
                    type: 'number',
                    easing: 'linear',
                    duration: duration,
                    from: NaN,
                    delay(ctx) {
                        if (ctx.type !== 'data' || ctx.xStarted) {
                            return 0;
                        }
                        ctx.xStarted = true;
                        return delay(ctx);
                    }
                },
                y: {
                    type: 'number',
                    easing: 'linear',
                    duration: duration,
                    from: previousY,
                    delay(ctx) {
                        if (ctx.type !== 'data' || ctx.yStarted) {
                            return 0;
                        }
                        ctx.yStarted = true;
                        return delay(ctx);
                    }
                }
            };

            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [
                        {
                            borderColor: 'red',
                            borderWidth: 1,
                            radius: 0,
                            data: data,
                        },
                        {
                            borderColor: 'blue',
                            borderWidth: 1,
                            radius: 0,
                            data: data2,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation,
                    interaction: {
                        intersect: false
                    },
                    plugins: {
                        legend: false,
                        title: {
                            display: true,
                            text: 'Easing Animation'
                        }
                    },
                    scales: {
                        x: {
                            type: 'linear'
                        }
                    }
                }
            });
        }

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <div style={{ width: '500px', height: '350px' }}>  {/* Increase the width here */}
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }}></canvas>
        </div>
    );
}

export default TrendLineChart;
