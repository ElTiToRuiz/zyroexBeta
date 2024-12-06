import { Order } from "../../context/orderContext";

type HanddleOrder = {
    order: Order;
    orderList: Order[];
    setOrderList: (orders: Order[]) => void;
}

export const handleNewOrder = ({order, orderList, setOrderList}:HanddleOrder) => {
    console.log(order);
    setOrderList([...orderList, order]);
    // localStorage.setItem('orders', JSON.stringify([...orderList, order]));
}

export const handleUpdateOrder = ({order, orderList, setOrderList}:HanddleOrder) => {
    const updatedOrderList = orderList.map((item: Order) => item.id === order.id ? order : item);
    setOrderList(updatedOrderList);
}