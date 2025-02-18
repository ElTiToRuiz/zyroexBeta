import { motion } from "framer-motion";

interface IconButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export const IconButton = ({ onClick, icon, label }: IconButtonProps) => {
    return (
        <motion.button
            onClick={onClick}
            aria-label={label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-100 hover:bg-gray-200 "
        >
            {icon}
        </motion.button>
    );
};