import { motion, AnimatePresence } from "framer-motion";
import { XCircle, TrendingDown } from "lucide-react";
import { TIME } from "../../constants/time";

interface IncorrectAnswerModalProps {
  onClose: () => void;
  tilePoints?: number;
}

export default function IncorrectAnswerModal({
  onClose,
  tilePoints,
}: IncorrectAnswerModalProps) {
  setTimeout(() => {
    onClose();
  }, TIME.MEDIUM_DELAY);

  // console.log("Renderizando IncorrectAnswerModal");

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            x: [0, -10, 10, -10, 10, 0],
          }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{
            scale: { type: "spring", stiffness: 300, damping: 25 },
            x: { duration: 0.5 },
          }}
          className="relative w-full max-w-md overflow-hidden rounded-lg border border-red-500/30 bg-gradient-to-br from-[#0f2027] to-[#12304d] shadow-2xl shadow-red-500/20"
        >
          {/* Efeito de brilho animado */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent"
          />

          {/* Ícone grande de erro */}
          <div className="flex justify-center pt-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="rounded-full bg-gradient-to-br from-red-500 to-rose-600 p-4 shadow-lg shadow-red-500/50"
            >
              <XCircle className="h-16 w-16 text-white" strokeWidth={2.5} />
            </motion.div>
          </div>

          {/* Conteúdo */}
          <div className="p-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-3 bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-3xl font-bold text-transparent"
            >
              Que Pena!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-5 text-base text-red-100"
            >
              Você errou a questão.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6 flex items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-slate-800/40 p-4 backdrop-blur-sm"
            >
              <TrendingDown className="h-6 w-6 text-red-400" />
              <p className="text-xl font-bold text-red-300">
                - {tilePoints} pontos
              </p>
            </motion.div>
          </div>

          {/* Partículas decorativas */}
          <div className="absolute top-0 left-0 h-20 w-20 rounded-tl-lg bg-gradient-to-br from-red-500/10 to-transparent" />
          <div className="absolute right-0 bottom-0 h-20 w-20 rounded-br-lg bg-gradient-to-tl from-rose-500/10 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
