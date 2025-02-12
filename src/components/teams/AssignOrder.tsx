import { useEffect, useState } from "react";
import { useOrders } from "../../context/orderContext";
import { useTeams } from "../../context/teamContext";
import { IoMdAdd } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { useAuthUser } from "../../context/authContext";
import { OrderModal } from "../orders/OrderCardModal";
import { UrgentConfirmation } from "../orders/MakeUrgent";
import { Order } from "../../utils/types";

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
                            <AddOrderCard key={order.id} order={order} added={true} handle={handleRemoveOrder}/>
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                            {restOrder.map(order => (
                                <AddOrderCard key={order.id} order={order} added={false} handle={handleAddOrder} />
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


const AddOrderCard = ({ order, added, handle }:{order:Order, added: boolean, handle:(order:Order)=>void}) => {
    const [showModal, setShowModal] = useState(false);
    const [showUrgent, setShowUrgent] = useState(false);
    const { hasAdminRole } = useAuthUser();
    
    return (
        <>
            <div className="relative group cursor-pointer flex flex-col justify-between bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                onClick={()=>{setShowModal(true)}} 
            >
                {/* Main Card Content */}
                <div className="flex flex-col p-6 space-y-4 max-h-[250px] sm:max-h-[250px] lg:max-h-[300px]">
                    {/* Header: Customer Information */}
                    <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-gray-900">{order.customerName}</h3>
                        <p className="text-xs text-gray-500 truncate">{order.customerEmail}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600 space-y-1 sm:space-y-0">
                        <div>
                            <p>Order ID: #{order.id.slice(0, 10)}...</p>
                            <p>Placed: {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Urgent Badge */}
                    {order.urgent && (
                        <div className="bg-red-100 rounded-full p-2 text-center">
                            <h2 className="text-xl text-red-500 font-bold">URGENT</h2>
                        </div>
                    )}
                </div>
                
                
                {/* Add Icon Button (Visible only on hover) */}
                {
                    hasAdminRole() && <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                        onClick={() => handle(order)}
                    >
                        {
                            !added ? 
                                <IoMdAdd size={24} className="text-gray-800" /> :
                                <FaCheck size={24} className="text-green-500" />
                        }
                    </div>
                }
            </div>
            
            {showModal && <OrderModal order={order} close={() => setShowModal(false)}  openUrgent={()=>setShowUrgent(true)}/>}
            {showUrgent && <UrgentConfirmation close={() => setShowUrgent(false)} order={order}/>}
            
        </>
    )
};