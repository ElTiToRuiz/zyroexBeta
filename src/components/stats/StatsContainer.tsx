import { useEffect, useState } from "react";
// import { Filters } from "./StatsFilters";
import { SummaryStats } from "./SummaryStats";
import { ChartCard } from "./ChartCard";
import { OrdersProvider, useOrders } from "../../context/orderContext";
import { fetchOrderTrends } from "../../services/fetch/fetchStats";
import { topProductChartConfig } from "../../utils/charts/topProducts";
import { orderTrendsChartConfig } from "../../utils/charts/orderTrends";
import { orderStateChartConfig } from "../../utils/charts/orderState";
import { teamMembersChartConfig } from "../../utils/charts/teamMembers";


export const Statistics = () => {
	return (
		<OrdersProvider>
			<StatisticsDashboard />
		</OrdersProvider>
	)
}


type StatsData = {
	labels: string[]
	data: number[]
}


const StatisticsDashboard = () => {
	const [totalRevenue, setTotalRevenue] = useState<number>(0);
	const [orderTrendsData, setOrderTrendsData] = useState<StatsData>({labels: [], data: []});
	const [topProducts, setTopProducts] = useState<StatsData>({labels: [], data: []});
	const [ordersState, setOrdersState] = useState<StatsData>({labels: [], data: []});
	const [teamMembers, setTeamMembers] = useState<StatsData>({labels: [], data: []});
	const {orders, getRevenue} = useOrders();


	useEffect(() => {
		(async () => { 
			const data = await fetchOrderTrends();
			setOrderTrendsData({
				labels: data.totalOrdersEachWeek.labels,
				data: data.totalOrdersEachWeek.data,
			})
			setTopProducts({
				labels: data.topProducts.labels,
				data: data.topProducts.data,
			})
			setOrdersState({
				labels: data.orderStatus.labels,
				data: data.orderStatus.data,
			})
			setTeamMembers({
				labels: data.teamMembers.labels,
				data: data.teamMembers.data,
			})
		})()
	}, [])

	useEffect(() => {
		(async () => {
			const total = await getRevenue();
			setTotalRevenue(total);
		})()
	}, [orders])

	const STATSOrderTrendsData = orderTrendsChartConfig(orderTrendsData.labels, orderTrendsData.data);
	const STATSTopProducts = topProductChartConfig(topProducts.labels, topProducts.data);
	const STATSOrderState = orderStateChartConfig(ordersState.labels, ordersState.data);
	const STATSTeamMembers = teamMembersChartConfig(teamMembers.labels, teamMembers.data);
    

    const stats = [
      { label: "Total Orders", value: `${orders.length}`, color: "blue" },
      { label: "Total Revenue", value: `$ ${totalRevenue.toFixed(2)}`, color: "green" },
      { label: "Top Product", value: `${topProducts.labels[0]}`, color: "yellow" },
    ];

    return (
		<div className="p-8 bg-gray-50 min-h-screen">
			<h1 className="text-3xl font-bold text-gray-800">Statistics Dashboard</h1>
			<p className="text-gray-600 mt-1 mb-10">Monitor key metrics and performance at a glance.</p>

			{/* Filters */}
			{/* <Filters onApply={handleFiltersApply} /> */}

			{/* Summary Stats */}
			<SummaryStats stats={stats} />

			{/* Charts */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
				<ChartCard title="Order Trends" data={STATSOrderTrendsData} type="line" />
				<ChartCard title="Most Sales Products" data={STATSTopProducts} type="bar" />
				<ChartCard title="Team Members" data={STATSTeamMembers} type="radar" />
				<ChartCard title="Order State" data={STATSOrderState} type="doughnut" />
			</div>
		</div>
    );
};
