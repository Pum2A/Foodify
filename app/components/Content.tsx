import { motion } from "framer-motion";

const Content = ({ title, message }: { title: string; message: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="max-w-lg mx-auto"
  >
    <h2 className="text-3xl font-bold">{title}</h2>
    <p className="mt-4 text-gray-400">{message}</p>
  </motion.div>
);

export default Content;
