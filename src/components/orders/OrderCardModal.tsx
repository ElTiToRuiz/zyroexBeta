import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Order, Product } from '../../utils/types';
import { useOrders } from '../../context/orderContext';
import { useSettings } from '../../context/settingContext';

export type SpecialProduct = Product & { quantity: number; stock: number };

interface OrderModalProps {
  order: Order;
  close: () => void;
  openUrgent: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: -50, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    y: 50,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

const productItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export const OrderModal: React.FC<OrderModalProps> = ({ order, close, openUrgent }) => {
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [products, setProducts] = useState<SpecialProduct[]>([]);
  const { getProductsFromOrder, saveStatusChange } = useOrders();
  const { currencySymbol } = useSettings();
  const urgentAcceptStatus = ['pending', 'processing'];

  useEffect(() => {
    const fetchProducts = async () => {
      const prods = await getProductsFromOrder(order);
      setProducts(prods as SpecialProduct[]);
    };
    fetchProducts();
  }, [order, getProductsFromOrder]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderStatus(e.target.value);
  };

  const saveChanges = () => {
    saveStatusChange({ order, newValue: orderStatus });
    close();
  };

  const calculateTotal = () =>
    order.products.reduce(
      (acc, prod) => acc + prod.quantity * prod.product.price,
      0
    );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl overflow-hidden w-full md:w-3/4 lg:w-1/2"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Creative Urgent Ribbon */}
          {order.urgent && (
            <motion.div
              className="absolute top-4 right-20 transform -rotate-45 bg-red-500 px-4 py-1 shadow-lg rounded-lg"
              initial={{ scale: 0.8, opacity: 0.1}}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { duration: 1, ease: 'easeOut', repeat: Infinity, repeatType: 'mirror' },
              }}
            >
              <span className="text-white font-bold uppercase text-xs  tracking-wider">
                Urgent
              </span>
            </motion.div>
          )}

          {/* Header with a gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-white font-extrabold">Order Details</h2>
              <button onClick={close} className="text-white text-3xl leading-none hover:text-gray-200">
                &times;
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Customer Info & Order Summary */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Customer Information</h3>
                <p className="text-sm text-gray-600"><span className="font-medium">Name:</span> {order.customerName}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {order.customerEmail}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Address:</span> {order.customerAddress}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Order Summary</h3>
                <p className="text-sm text-gray-600"><span className="font-medium">Order ID:</span> #{order.id}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-600 font-medium">Status:</span>
                  <select
                    value={orderStatus}
                    onChange={handleStatusChange}
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="on_hold">On Hold</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column: Product List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Products</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                <AnimatePresence>
                  {products.map((prod) => (
                    <motion.div
                      key={prod.id}
                      className="flex justify-between items-center p-2 border border-gray-200 rounded"
                      variants={productItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <div className="text-sm text-gray-700">
                        {prod.quantity} x {prod.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Stock: {prod.stock}
                      </div>
                      <div className="text-sm text-gray-800 font-semibold">
                        {currencySymbol}
                        {(prod.quantity * prod.price).toFixed(2)}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-300 mt-2">
                <span className="text-xl font-bold text-gray-800">Total</span>
                <span className="text-xl font-bold text-gray-800">
                  {currencySymbol}
                  {calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="p-4 bg-gray-100 flex justify-end space-x-4">
            <button
              onClick={saveChanges}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition rounded-lg"
            >
              Save Changes
            </button>
            {!order.urgent && urgentAcceptStatus.includes(orderStatus) && (
              <button
                onClick={openUrgent}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-6ru00 transition rounded-lg"
              >
                Mark as Urgent
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
