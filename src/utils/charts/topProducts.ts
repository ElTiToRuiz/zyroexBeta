export const topProductChartConfig = (labels: string[], data: number[]) => {
    return {
        labels: labels,
        datasets: [
            {
                label: "Top Products",
                data: data,
                borderColor: "#3498db",
                backgroundColor: "rgba(52, 152, 219, 0.6)",
                borderWidth: 1,
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
                        title: (tooltipItem: any) => `Product: ${tooltipItem[0].label}`,
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
            animation: {
                duration: 1200,
                easing: "easeOutQuad",
            },
        },
    };
}
