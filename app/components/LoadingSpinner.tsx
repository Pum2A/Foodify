import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text }) => (
  <motion.div
    className="flex flex-col justify-center items-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    {text && <p className="mt-2 text-gray-300 text-sm">{text}</p>}
  </motion.div>
);

export default LoadingSpinner;
