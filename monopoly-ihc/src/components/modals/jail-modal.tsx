import type { CornerTile } from "@/interfaces/corner-tile";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, AlertTriangle } from "lucide-react";
import type { BaseModalProps } from "@/types/modal-type";
import { POINTS_VARIABLES } from "@/constants/points-variables";

type JailModalProps = BaseModalProps<CornerTile>;

export default function JailModal({ onAction }: JailModalProps) {
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
            className="rounded-t bg-gradient-to-r from-orange-600 to-red-600 p-4"
            style={{
              borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <Lock className="h-6 w-6 text-white" />
              <h2 className="text-xl font-bold tracking-wide text-white uppercase">
                Prisão
              </h2>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-6">
            {/* Ícone */}
            <div className="mb-5 flex justify-center">
              <motion.div
                initial={{ scale: 0, rotate: 90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="relative rounded-full bg-gradient-to-br from-orange-500 to-red-500 p-4 shadow-lg"
              >
                <Lock className="h-12 w-12 text-white" />
                {/* Badge de alerta */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="absolute -top-1 -right-1 rounded-full bg-yellow-500 p-1 shadow-lg"
                >
                  <AlertTriangle className="h-4 w-4 text-white" />
                </motion.div>
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
                Você está visitando a prisão
              </h3>
              <p className="mb-4 text-base text-gray-300">
                Apenas de passagem, sem consequências
              </p>

              {/* Info */}
              <div
                className="inline-block rounded bg-orange-600/20 px-4 py-2 backdrop-blur-sm"
                style={{ border: "0.5px solid rgba(249, 115, 22, 0.3)" }}
              >
                <p className="text-sm text-gray-300">
                  Penalidade:{" "}
                  <span className="font-bold text-orange-400">
                    -{POINTS_VARIABLES.JAIL_TURNS_QUANTITY}
                  </span>{" "}
                  turnos
                </p>
              </div>
            </motion.div>

            {/* Botão */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className="w-full rounded bg-gradient-to-r from-orange-600 to-red-600 px-6 py-3 font-bold text-white uppercase shadow-lg transition-all"
              style={{ border: "0.5px solid rgba(255, 255, 255, 0.3)" }}
            >
              Entendi
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
