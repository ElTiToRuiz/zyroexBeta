import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getStatusBGColor, OrderCard } from "./OrderCard";
import { Order, useOrders } from '../../context/orderContext';

export interface Status {
    statusId: string;
    status: string;
    orders: Order[];
}

export interface OrdersByStatus {
    pending: Status;
    processing: Status;
    shipped: Status;
    on_hold: Status;
    delivered: Status;
}


export const OrderTable = () => {  
    const { orders, rowFilter, saveStatusChange} = useOrders();

    const [ordersTable, setOrders] = useState<OrdersByStatus>();

    useEffect(() => { 
        setOrders(rowFilter());
    }, [orders]);
    
    const onDragEnd = (result: any) => {
        const { source, destination } = result;

        // If dropped outside a valid drop target
        if (!destination) return;
        
        const sourceColumnId = source.droppableId as keyof OrdersByStatus;
        const destinationColumnId = destination.droppableId as keyof OrdersByStatus;

        // If dropped in the same list and position
        if (sourceColumnId === destinationColumnId) return; 
        
        // Get source and destination columns
        if (!ordersTable) return;
        const sourceOrders = [...ordersTable[sourceColumnId].orders];
        const destinationOrders = [...ordersTable[destinationColumnId].orders];

        // Find the moved order and update its status
        const movedOrder = sourceOrders.find(order => order.id === result.draggableId);
        const destinationStatus = ordersTable[destinationColumnId].status;
        console.log('movedOrder', destinationStatus);
        if (movedOrder){
            movedOrder.status = destinationStatus;
            saveStatusChange({order: movedOrder, newValue: movedOrder.status});
        }

        // Move the item in the source array
        const [movedItem] = sourceOrders.splice(source.index, 1);
        destinationOrders.splice(destination.index, 0, movedItem);

        // Update the state with the new order lists
        setOrders(prevState => {
            if (!prevState) return prevState;
            return {
                ...prevState,
                [sourceColumnId]: {
                    ...prevState[sourceColumnId],
                    orders: sourceOrders,
                },
                [destinationColumnId]: {
                    ...prevState[destinationColumnId],
                    orders: destinationOrders,
                },
            };
        });
    };



    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">            
                {ordersTable && Object.entries(ordersTable).map(([columnId, status]) => (
                    <Droppable key={columnId} droppableId={columnId}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`border p-4 rounded ${getStatusBGColor(status.status)}`}
                            >
                                <h2 className="text-lg font-semibold text-gray-600 capitalize mb-4">
                                    {status.status === 'on_hold' ? 'On Hold' : status.status}
                                </h2>
                                <ul className="space-y-2 list-none">
                                    {status.orders.map((order:Order, index:number) => (
                                        <Draggable
                                            key={order.id}
                                            draggableId={order.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="w-full"
                                                >
                                                    <OrderCard order={order} type="hidden" />
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};
