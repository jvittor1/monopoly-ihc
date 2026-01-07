import type { DiceResultOverlayInterface } from "@/interfaces/dice-result-overlay";
import { motion } from "framer-motion";
import { Dices, MoveRight } from "lucide-react";

export default function DiceResultOverlay({
  value,
}: DiceResultOverlayInterface) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      {/* Card principal */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative overflow-hidden rounded bg-gray-900/95 px-16 py-8 shadow-2xl backdrop-blur-sm"
        style={{ border: "0.5px solid rgba(255, 255, 255, 0.2)" }}
      >
        {/* Ícone de dado no topo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="mb-4 flex justify-center"
        >
          <div className="rounded-lg bg-cyan-700 p-3 shadow-lg">
            <Dices className="h-10 w-10 text-white" />
          </div>
        </motion.div>

        {/* Texto "Avance" */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-2 text-center text-4xl font-bold text-white"
        >
          Avance
        </motion.h2>

        {/* Número do dado */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          className="my-6 flex items-center justify-center"
        >
          <span className="text-8xl font-bold text-cyan-50">{value}</span>
        </motion.div>

        {/* Texto "Casa(s)" com ícone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2"
        >
          <MoveRight className="h-6 w-6 text-cyan-400" />
          <h2 className="text-center text-4xl font-bold text-white">
            {value === 1 ? "Casa" : "Casas"}
          </h2>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
