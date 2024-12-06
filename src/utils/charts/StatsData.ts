const getLast7Days = () => {
    const date = new Date();
    const last7Days = [];
    for (let i = 0; i < 7; i++) {
        const last7DaysDate = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
        last7Days.push(last7DaysDate.toDateString());
    }
    return last7Days.reverse();
}

export const statsData = {
    totalOrdersEachWeek: {
        labels: getLast7Days(),
        data: [5, 10, 15, 20, 25, 30, 35]
    },
    topProducts: {
        labels: ['Product A', 'Product B', 'Product C', 'Product D'],
        data: [10, 20, 15, 30]
    },
    orderStatus: {
        labels: ['Pending', 'Processing', 'On Hold', 'Shipped', 'Delivered', 'Cancelled'],
        data: [10, 20, 15, 30, 25, 10]
    },
    teamMembers: {
        labels: ['Team A', 'Team B', 'Team C', 'Team D'],
        data: [8, 4, 6, 5]
    }
}

