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
    };
};
