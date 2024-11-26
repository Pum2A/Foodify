import { motion } from "framer-motion";

const LoadingSpinner = () => (
  <motion.div
    className="flex justify-center items-center"
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 1 }}
  >
    <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
  </motion.div>
);

export default LoadingSpinner;
