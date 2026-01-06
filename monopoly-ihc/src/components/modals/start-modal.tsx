import { POINTS_VARIABLES } from "@/constants/points-variables";
import type { CornerTile } from "@/interfaces/corner-tile";
import type { BaseModalProps } from "@/types/modal-type";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Coins } from "lucide-react";

type StartModalProps = BaseModalProps<CornerTile>;

export default function StartModal({ onAction }: StartModalProps) {
  const handleContinue = () => {
    if (onAction) onAction({});
  };

  const bonusAmount = POINTS_VARIABLES.START;

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
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: -30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md overflow-hidden rounded bg-gray-900/95 text-white shadow-2xl backdrop-blur-sm"
          style={{ border: "0.5px solid rgba(255, 255, 255, 0.2)" }}
        >
          {/* Header */}
          <div
            className="rounded-t bg-gradient-to-r from-green-600 to-emerald-600 p-4"
            style={{
              borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="h-6 w-6 text-white" />
              <h2 className="text-xl font-bold tracking-wide text-white uppercase">
                Início
              </h2>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-6">
            {/* Ícone de moedas */}
            <div className="mb-5 flex justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 p-4 shadow-lg"
              >
                <Coins className="h-12 w-12 text-white" />
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
                Você passou pelo Início!
              </h3>
              <p className="mb-4 text-base text-gray-300">
                Receba seu bônus por completar a volta
              </p>

              {/* Valor do bônus */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="inline-block rounded bg-green-600/30 px-6 py-3 backdrop-blur-sm"
                style={{ border: "0.5px solid rgba(34, 197, 94, 0.5)" }}
              >
                <span className="text-3xl font-bold text-green-400">
                  +{bonusAmount}
                </span>
                <span className="ml-2 text-sm text-gray-300">pontos</span>
              </motion.div>
            </motion.div>

            {/* Botão */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="w-full rounded bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-bold text-white uppercase shadow-lg transition-all"
              style={{ border: "0.5px solid rgba(255, 255, 255, 0.3)" }}
            >
              Continuar Jogando
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
