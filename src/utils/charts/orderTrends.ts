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
    };
}
