import { m } from "framer-motion";

export default function AnimateSection({ children, className = "", delay = 0, immediate = false }) {
  return (
    <m.div
      initial={immediate ? false : { opacity: 0, y: 24 }}
      animate={immediate ? { opacity: 1, y: 0 } : undefined}
      whileInView={immediate ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </m.div>
  );
}
