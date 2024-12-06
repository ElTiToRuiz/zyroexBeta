export const formatPercentage = (value: number, total: number) => {
    return ((value / total) * 100).toFixed(2) + '%';
};

export const orderStateChartConfig = (labels: string[], data: number[]) => {
    const total = data.reduce((acc, value) => acc + value, 0);

    return {
        labels: labels,
        datasets: [{
            label: 'Number of Orders',
            data: data,
            backgroundColor: labels.map(label => {
                switch (label) {
                    case 'Pending': return '#f1c40f';
                    case 'Processing': return '#e67e22';
                    case 'Shipped': return '#3498db';
                    case 'Delivered': return '#2ecc71';
                    case 'On Hold': return '#f39c12';
                    case 'Cancelled': return '#e74c3c';
                    default: return '#cccccc';
                }
            }),
            borderColor: labels.map(label => {
                switch (label) {
                    case 'Pending': return '#f39c12';
                    case 'Processing': return '#d35400';
                    case 'Shipped': return '#2980b9';
                    case 'Delivered': return '#27ae60';
                    case 'On Hold': return '#e67e22';
                    case 'Cancelled': return '#c0392b';
                    default: return '#999999';
                }
            }),
            borderWidth: 1
        }],
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context: any) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += context.parsed;
                                label += ' (' + formatPercentage(context.parsed, total) + ')';
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };
}
