import { motion } from "framer-motion";
import { XCircle, TrendingDown } from "lucide-react";
import { TIME } from "../../constants/time";
import ModalWrapper from "../modals/modal-wrapper";

interface IncorrectAnswerModalProps {
  onClose: () => void;
  points?: number;
}

export default function IncorrectAnswerModal({
  onClose,
  points,
}: IncorrectAnswerModalProps) {
  setTimeout(onClose, TIME.EXTRA_LONG_DELAY);

  return (
    <ModalWrapper
      isOpen={true}
      onClose={() => {}}
      maxWidth="md"
      disableBackdropClick
    >
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

      <div className="p-6">
        <div className="mb-5 flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="rounded-full bg-gradient-to-br from-red-500 to-orange-500 p-4 shadow-lg"
          >
            <XCircle className="h-12 w-12 text-white" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-center"
        >
          <h3 className="mb-2 text-xl font-bold text-red-400">
            Que pena! Você errou
          </h3>
          <p className="text-sm leading-relaxed text-gray-300">
            Não desanime! Continue tentando!
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="rounded bg-gradient-to-r from-red-900/50 to-orange-900/50 p-4 backdrop-blur-sm"
          style={{ border: "0.5px solid rgba(239, 68, 68, 0.3)" }}
        >
          <div className="flex items-center justify-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-400" />
            <p className="text-2xl font-bold text-red-300">-{points} pontos</p>
          </div>
        </motion.div>
      </div>
    </ModalWrapper>
  );
}
