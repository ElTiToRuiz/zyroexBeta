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
    };
}
