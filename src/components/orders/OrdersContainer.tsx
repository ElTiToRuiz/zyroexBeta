import { useEffect, useState } from "react";
import { useOrders } from "../../context/orderContext";
// import { OrderCalendar } from "./OrderCalendar";
import { OrderCard } from "./OrderCard";
import { OrderFilters } from "./OrderFilter";
import { FiDatabase, FiTable } from "react-icons/fi";
import { OrderTable } from "./OrderTable";

export const Orders = () => {

    useEffect(()=>{
        const ordersView = localStorage.getItem('ordersView');
        if(ordersView){
            setView(ordersView);
        }
    }, [])
    const [view, setView] = useState("list");

    const { filteredOrders, filteredByStatus  } = useOrders();
    const handdleOrdersViewType = (type: string) => { 
        localStorage.setItem('ordersView', type);
        setView(type);
    }
    return (
        <div className="container mx-auto p-6 h-full">

            {/* Calendar View Toggle */}
            <div className="mb-6 flex flex-column justify-between border-b-2 border-opacity-40 border-grey-100">
                <h1 className="text-3xl font-bold mb-4">Orders</h1>
                
                <div>
                    <button
                        className={`p-2 rounded ml-4 ${view == 'list' ? 'bg-gray-200' : 'bg-white'}`}
                        onClick={()=>{handdleOrdersViewType('list')}}
                    >
                        <FiDatabase className="inline-block mr-2" /> List
                    </button>
                    <button
                        className={`p-2 rounded mr-4 ${view == 'table' ? 'bg-gray-200' : 'bg-white'}`}
                        onClick={()=>{handdleOrdersViewType('table')}}
                    >
                        <FiTable className="inline-block mr-2" /> Table 
                    </button>
                </div>
            </div>        
            
            {
                view == 'table' ? (
                    filteredByStatus && <OrderTable/>
                ) : 
                (
                    <div>
                        <OrderFilters />
                        {/* Order List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
                        {
                            filteredOrders.map((order) => (
                                <OrderCard key={order.id} order={order} type="list" />
                            )) 
                        }
                        </div>
                    </div>
                )
            }
        </div>
    );
};