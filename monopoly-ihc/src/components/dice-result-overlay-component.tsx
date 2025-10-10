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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      {/* Container principal */}
      <motion.div
        initial={{ scale: 0.5, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0.5, rotate: 10 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="relative"
      >
        {/* Círculos de pulso ao fundo */}
        <motion.div
          animate={{
            scale: [1, 2, 2],
            opacity: [0.4, 0, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="h-64 w-64 rounded-full border-4 border-cyan-400" />
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 2, 2],
            opacity: [0.3, 0, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.3,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="h-64 w-64 rounded-full border-4 border-blue-400" />
        </motion.div>

        {/* Card principal */}
        <div className="relative overflow-hidden rounded-lg border-2 border-cyan-500/50 bg-gradient-to-br from-[#0f2027] to-[#12304d] px-20 py-8 shadow-2xl shadow-cyan-500/30">
          {/* Brilho animado */}
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
          />

          {/* Ícone de dado no topo */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-4 flex justify-center"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-3 shadow-lg shadow-cyan-500/50"
            >
              <Dices className="h-10 w-10 text-white" strokeWidth={2.5} />
            </motion.div>
          </motion.div>

          {/* Texto "Avance" */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-titan mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-center text-4xl font-bold text-transparent"
          >
            Avance
          </motion.h2>

          {/* Número do dado - DESTAQUE */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.4,
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
            className="relative my-6 flex items-center justify-center"
          >
            {/* Círculo de fundo pulsante */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute h-32 w-32 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/30 blur-xl"
            />

            {/* Número */}
            <motion.span
              animate={{
                textShadow: [
                  "0 0 20px rgba(34, 211, 238, 0.5)",
                  "0 0 40px rgba(34, 211, 238, 0.8)",
                  "0 0 20px rgba(34, 211, 238, 0.5)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="font-titan relative text-8xl font-bold text-cyan-50"
              style={{
                textShadow:
                  "0 0 30px rgba(34, 211, 238, 0.6), 0 4px 8px rgba(0, 0, 0, 0.5)",
              }}
            >
              {value}
            </motion.span>
          </motion.div>

          {/* Texto "Casa(s)" com ícone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.div
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MoveRight className="h-6 w-6 text-cyan-400" strokeWidth={2.5} />
            </motion.div>
            <h2 className="font-titan bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-center text-4xl font-bold text-transparent">
              {value === 1 ? "Casa" : "Casas"}
            </h2>
          </motion.div>

          {/* Decoração inferior */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6 h-1 w-full rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />
        </div>

        {/* Partículas decorativas */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: [0, (i % 2 === 0 ? 50 : -50) * (1 + i * 0.3)],
              y: [0, -50 - i * 10],
            }}
            transition={{
              duration: 1.5,
              delay: 0.5 + i * 0.1,
              ease: "easeOut",
            }}
            className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-cyan-400"
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
