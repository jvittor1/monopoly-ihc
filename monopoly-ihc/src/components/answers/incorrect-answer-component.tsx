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
  }, TIME.EXTRA_LONG_DELAY);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
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
            className="rounded-t bg-red-800 p-4"
            style={{
              borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <XCircle className="h-6 w-6 text-white" />
              <h2 className="text-xl font-bold tracking-wide text-white uppercase">
                Resposta Incorreta
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
                className="rounded-full bg-red-800 p-4 shadow-lg"
              >
                <XCircle className="h-12 w-12 text-white" />
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
                Não foi dessa vez
              </h3>
              <p className="text-base text-gray-300">
                Continue tentando, você vai conseguir!
              </p>
            </motion.div>

            {/* Caixa de pontos */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="rounded bg-red-600/20 p-4 text-center backdrop-blur-sm"
              style={{ border: "0.5px solid rgba(220, 38, 38, 0.3)" }}
            >
              <div className="flex items-center justify-center gap-2">
                <TrendingDown className="h-6 w-6 text-red-400" />
                <p className="text-xl font-bold text-red-300">
                  -{tilePoints} pontos
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
