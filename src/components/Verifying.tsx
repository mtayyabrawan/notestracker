import { motion } from "motion/react";
function Verifying() {
  return (
    <div>
      {"Verifying".split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.01, repeat: Infinity }}
          className="text-xl font-medium text-neutral-600"
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

export default Verifying;
