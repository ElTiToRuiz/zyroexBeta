export const orderTrendsChartConfig = (labels: string[], data: number[]) => {
    return {
        labels: labels,
        datasets: [
            {
                label: "Orders",
                data: data,
                borderColor: "#2ecc71", // Green
                backgroundColor: "rgba(46, 204, 113, 0.2)", // Light green
                tension: 0.3,
                fill: true,
                pointBackgroundColor: "#e67e22", // Orange
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: 6,
                hoverRadius: 8,
                hoverBorderWidth: 3,
            },
        ],
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    enabled: true,
                    mode: "nearest",
                    intersect: false,
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    callbacks: {
                        title: (tooltipItem: any) => `Date: ${tooltipItem[0].label}`,
                        label: (tooltipItem: any) => `Value: ${tooltipItem.raw}`,
                    },
                },
            },
            scales: {
                x: {
                    grid: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.1)",
                        lineWidth: 1,
                    },
                    ticks: {
                        font: {
                            size: 12,
                            family: "'Arial', sans-serif",
                            weight: "bold",
                        },
                    },
                },
                y: {
                    grid: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.1)",
                        lineWidth: 1,
                    },
                    ticks: {
                        font: {
                            size: 12,
                            family: "'Arial', sans-serif",
                            weight: "bold",
                        },
                        beginAtZero: true,
                        maxTicksLimit: 5,
                    },
                },
            },
            hover: {
                mode: "nearest",
                intersect: true,
            },
            elements: {
                line: {
                    borderWidth: 4,
                    borderCapStyle: "round",
                },
                point: {
                    radius: 6,
                    hitRadius: 10,
                },
            },
            animation: {
                duration: 1200,
                easing: "easeOutQuad",
            },
        },
    };
}
