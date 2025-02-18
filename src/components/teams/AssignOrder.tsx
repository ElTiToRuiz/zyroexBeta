import { useEffect, useState } from "react";
import { useOrders } from "../../context/orderContext";
import { useTeams } from "../../context/teamContext";
import { IoMdAdd } from "react-icons/io";
import { useAuthUser } from "../../context/authContext";
import { Order } from "../../utils/types";
import { OrderCard } from "../orders/OrderCard";
import { IoClose } from "react-icons/io5";

export const AssignOrdersToTeam = () => {
    const { orders} = useOrders();
    const { activeTeam } = useTeams();
    const { hasAdminRole } = useAuthUser();

    const [teamOrder, setTeamOrder] = useState<Order[]>([]);
    const [restOrder, setRestOrder] = useState<Order[]>([]);
    if(!activeTeam) return null;

    useEffect(() => {
        setTeamOrder(orders.filter(order => order.assignedTeam && order.assignedTeam.includes(activeTeam.id)));
        setRestOrder(orders.filter(order => !teamOrder.includes(order) && !order.assignedTeam));
    }, [activeTeam, orders]);

    // Handle adding an order to the team
    const handleAddOrder = (order: Order) => {
        setTeamOrder(prev => [...prev, order]);
        setRestOrder(prev => prev.filter(o => o.id !== order.id));
    };

    // Handle removing an order from the team
    const handleRemoveOrder = (order: Order) => {
        setTeamOrder(prev => prev.filter(o => o.id !== order.id));
        setRestOrder(prev => [...prev, order]);
    };


    return (
        <div>
            <div className="mt-4 flex flex-col items-center w-full p-4">
                <h2 className="text-4xl font-semibold text-gray-700 mb-6">Orders Assigned</h2>

                {/* Display orders assigned to the active team */}
                {teamOrder.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {teamOrder.map(order => (
                            <div className="relative bg-white border shadow-sm rounded hover:shadow-md transition-shadow">
                            <OrderCard order={order} type="team" />
                            <button
                                onClick={() => handleRemoveOrder(order)}
                                className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                title="Assign to team"
                            >
                                <IoClose size={20} />
                            </button>
                        </div>
                        ))}
                    </div>
                ) : (
                    <p>No orders assigned to the current team.</p>
                )}
            </div>
            {
                hasAdminRole() && <div className="mt-10 flex flex-col items-center w-full p-4">
                    <h3 className="text-4xl font-semibold text-gray-700 mb-4">Add Order To Team</h3>
                    
                    {/* Display orders that are not yet assigned */}
                    {restOrder.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
                            {restOrder.map(order => (
                                <div className="relative bg-white border shadow-sm rounded hover:shadow-md transition-shadow">
                                    <OrderCard order={order} type="team" />
                                    <button
                                        onClick={() => handleAddOrder(order)}
                                        className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                                        title="Assign to team"
                                    >
                                        <IoMdAdd size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No unassigned orders available.</p>
                    )}
                </div>
            }
            
        </div>
    );
};