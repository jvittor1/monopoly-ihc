import type { CornerTile } from "@/interfaces/corner-tile";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Smile } from "lucide-react";
import type { BaseModalProps } from "@/types/modal-type";

type FreeParkingModalProps = BaseModalProps<CornerTile>;

export default function FreeParkingModal({ onAction }: FreeParkingModalProps) {
  const handleContinue = () => {
    if (onAction) onAction({});
  };

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
          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md overflow-hidden rounded bg-gray-900/95 text-white shadow-2xl backdrop-blur-sm"
          style={{ border: "0.5px solid var(--color-border-light)" }}
        >
          {/* Header */}
          <div
            className="rounded-t bg-gradient-to-r from-purple-600 to-pink-600 p-4"
            style={{
              borderBottom: "0.5px solid var(--color-border-light)",
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <Coffee className="h-6 w-6 text-white" />
              <h2 className="text-xl font-bold tracking-wide text-white uppercase">
                Estacionamento Livre
              </h2>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-6">
            {/* Ícone de relaxamento */}
            <div className="mb-5 flex justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-4 shadow-lg"
              >
                <Smile className="h-12 w-12 text-white" />
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
                Tire um momento para descansar!
              </h3>
              <p className="mb-2 text-base text-gray-300">
                Você está no estacionamento livre
              </p>
              <p className="text-sm text-gray-400">
                Sem perguntas, sem aluguel. Apenas relaxe!
              </p>
            </motion.div>

            {/* Caixa de destaque */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="mb-5 rounded bg-purple-600/20 p-4 text-center backdrop-blur-sm"
              style={{ border: "0.5px solid var(--color-purple-border)" }}
            >
              <p className="text-lg font-semibold text-purple-300">
                💆‍♂️ Momento de pausa
              </p>
              <p className="mt-1 text-sm text-gray-300">
                Aproveite para respirar fundo
              </p>
            </motion.div>

            {/* Botão */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="w-full rounded bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-bold text-white uppercase shadow-lg transition-all"
              style={{ border: "0.5px solid var(--color-border-lighter)" }}
            >
              Continuar Jogando
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
