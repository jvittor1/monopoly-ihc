import { motion, AnimatePresence } from "framer-motion";
import { Home, CheckCircle2, Key } from "lucide-react";

interface PropertyAcquiredModalProps {
  onClose: () => void;
  propertyName?: string;
}

export default function PropertyAcquiredModal({
  onClose,
  propertyName,
}: PropertyAcquiredModalProps) {
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
            className="rounded-t bg-cyan-800 p-4"
            style={{
              borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <Home className="h-6 w-6 text-white" />
              <h2 className="text-xl font-bold tracking-wide text-white uppercase">
                Propriedade Adquirida
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
                className="relative"
              >
                <div className="rounded-full bg-cyan-800 p-4 shadow-lg">
                  <Home className="h-12 w-12 text-white" />
                </div>

                {/* Check sobreposto */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="absolute -top-2 -right-2 rounded-full bg-green-500 p-1.5 shadow-lg"
                  style={{ border: "2px solid rgb(17, 24, 39)" }}
                >
                  <CheckCircle2 className="h-5 w-5 text-white" />
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
                Parabéns pela conquista!
              </h3>
              <p className="text-base text-gray-300">
                Você acertou e ganhou a propriedade
              </p>
            </motion.div>

            {/* Card da propriedade */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="mb-5 rounded bg-cyan-600/20 p-4 text-center backdrop-blur-sm"
              style={{ border: "0.5px solid rgba(8, 145, 178, 0.3)" }}
            >
              <div className="mb-2 flex items-center justify-center gap-2">
                <Key className="h-5 w-5 text-cyan-400" />
                <p className="text-sm font-semibold text-cyan-300">
                  Nova Propriedade
                </p>
              </div>
              <h3 className="text-xl font-bold text-cyan-50">{propertyName}</h3>
              <p className="mt-2 text-xs text-gray-400">
                Agora esta propriedade é sua!
              </p>
            </motion.div>

            {/* Benefício */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-5 rounded bg-green-600/20 p-3 backdrop-blur-sm"
              style={{ border: "0.5px solid rgba(34, 197, 94, 0.3)" }}
            >
              <p className="text-center text-sm text-green-300">
                Outros jogadores pagarão aluguel quando caírem aqui
              </p>
            </motion.div>

            {/* Botão */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-full rounded bg-cyan-800 px-6 py-3 font-bold text-white uppercase shadow-lg transition-all"
              style={{ border: "0.5px solid rgba(255, 255, 255, 0.3)" }}
            >
              Continuar
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
