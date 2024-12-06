export const teamMembersChartConfig = (labels: string[], data: number[]) => {
    return {
        labels: labels,
        datasets: [{
            label: 'Number of Team Members',
            data: data,
            backgroundColor: 'rgba(52, 152, 219, 0.2)',
            borderColor: '#2980b9',
            borderWidth: 2,
            pointBackgroundColor: '#2980b9',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 8,
            hoverBackgroundColor: '#2980b9',
            hoverBorderColor: '#fff',
            hoverBorderWidth: 2
        }],
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: '#ddd'
                    },
                    suggestedMin: 0,
                    suggestedMax: Math.max(...data) + 10,
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                        color: '#777'
                    },
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#333'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#2980b9',
                    borderWidth: 1
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    };
};
