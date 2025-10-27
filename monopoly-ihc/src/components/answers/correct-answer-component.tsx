import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, TrendingUp } from "lucide-react";
import { TIME } from "../../constants/time";

interface CorrectAnswerModalProps {
  onClose: () => void;
  tilePoints?: number;
}

export default function CorrectAnswerModal({
  onClose,
  tilePoints,
}: CorrectAnswerModalProps) {
  setTimeout(() => {
    onClose();
  }, TIME.EXTRA_LONG_DELAY);

  // console.log("Renderizando CorrectAnswerModal");

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
          initial={{ scale: 0.5, opacity: 0, rotateX: -90 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotateX: 90 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md overflow-hidden rounded-lg border border-emerald-500/30 bg-gradient-to-br from-[#0f2027] to-[#12304d] shadow-2xl shadow-emerald-500/20"
        >
          {/* Efeito de brilho animado */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent"
          />

          {/* Ícone grande de sucesso */}
          <div className="flex justify-center pt-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="rounded-full bg-gradient-to-br from-emerald-500 to-green-600 p-4 shadow-lg shadow-emerald-500/50"
            >
              <CheckCircle2
                className="h-16 w-16 text-white"
                strokeWidth={2.5}
              />
            </motion.div>
          </div>

          {/* Conteúdo */}
          <div className="p-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-3 bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-3xl font-bold text-transparent"
            >
              Parabéns!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-5 text-base text-emerald-100"
            >
              Você acertou a questão!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6 flex items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-slate-800/40 p-4 backdrop-blur-sm"
            >
              <TrendingUp className="h-6 w-6 text-emerald-400" />
              <p className="text-xl font-bold text-emerald-300">
                +{tilePoints} pontos
              </p>
            </motion.div>
          </div>

          {/* Partículas decorativas */}
          <div className="absolute top-0 left-0 h-20 w-20 rounded-tl-lg bg-gradient-to-br from-emerald-500/10 to-transparent" />
          <div className="absolute right-0 bottom-0 h-20 w-20 rounded-br-lg bg-gradient-to-tl from-green-500/10 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
