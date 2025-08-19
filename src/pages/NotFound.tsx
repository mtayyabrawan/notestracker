import { motion } from "motion/react";
import { Link } from "react-router";
function NotFound() {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-neutral-900">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col items-center justify-center space-y-5"
      >
        <h1 className="text-4xl font-bold text-white">404</h1>
        <p className="text-white">
          {"Page not found".split("").map((letter) => (
            <motion.span
              initial={{ y: 200, filter: "blur(5px)", opacity: 0 }}
              whileInView={{ y: 0, filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              {letter}
            </motion.span>
          ))}
        </p>
        <Link
          to="/"
          className="rounded-md bg-neutral-200 px-3 py-2 text-sm shadow-[0px_0px_5px_0px_var(--color-neutral-400)]"
        >
          Go to Home
        </Link>
      </motion.div>
    </main>
  );
}

export default NotFound;
