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
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md overflow-hidden rounded bg-gray-900/95 text-white shadow-2xl backdrop-blur-sm"
          style={{ border: "0.5px solid rgba(255, 255, 255, 0.2)" }}
        >
          {/* Header */}
          <div
            className="rounded-t bg-green-800 p-4"
            style={{
              borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-white" />
              <h2 className="text-xl font-bold tracking-wide text-white uppercase">
                Resposta Correta
              </h2>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-6">
            {/* Ícone */}
            <div className="mb-5 flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="rounded-full bg-green-800 p-4 shadow-lg"
              >
                <CheckCircle2 className="h-12 w-12 text-white" />
              </motion.div>
            </div>

            {/* Mensagem */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-5 text-center"
            >
              <h3 className="mb-3 text-2xl font-bold text-white">
                Você acertou!
              </h3>
              <p className="text-base text-gray-300">
                Continue assim e domine o tabuleiro
              </p>
            </motion.div>

            {/* Caixa de pontos */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="rounded bg-green-600/20 p-4 text-center backdrop-blur-sm"
              style={{ border: "0.5px solid rgba(34, 197, 94, 0.3)" }}
            >
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-400" />
                <p className="text-xl font-bold text-green-300">
                  +{tilePoints} pontos
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
