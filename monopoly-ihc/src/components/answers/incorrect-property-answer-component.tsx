import { motion, AnimatePresence } from "framer-motion";
import { Home, XCircle, Lock, AlertTriangle } from "lucide-react";
import { TIME } from "../../constants/time";

interface PropertyFailedModalProps {
  onClose: () => void;
  propertyName?: string;
}

export default function PropertyFailedModal({
  onClose,
  propertyName,
}: PropertyFailedModalProps) {
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
          {/* Efeito de alerta piscante */}
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-orange-600/20"
          />

          {/* Partículas de erro */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                x: [0, (i % 2 === 0 ? 25 : -25) * (1 + i * 0.2)],
                y: [0, -35 - i * 8],
              }}
              transition={{
                duration: 1.2,
                delay: 0.4 + i * 0.1,
                ease: "easeOut",
              }}
              className="absolute top-1/2 left-1/2"
            >
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </motion.div>
          ))}

          {/* Ícone grande */}
          <div className="flex justify-center pt-8">
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="rounded-full bg-gradient-to-br from-red-500 to-orange-600 p-4 shadow-lg shadow-red-500/50">
                <Home className="h-16 w-16 text-white" strokeWidth={2.5} />
              </div>

              {/* X vermelho sobreposto */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                className="absolute -top-2 -right-2 rounded-full bg-red-600 p-1.5 shadow-lg ring-2 ring-slate-900"
              >
                <XCircle className="h-5 w-5 text-white" strokeWidth={3} />
              </motion.div>
            </motion.div>
          </div>

          {/* Conteúdo */}
          <div className="relative z-10 p-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-3 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-3xl font-bold text-transparent"
            >
              Que Pena!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-5 text-base text-red-100"
            >
              Você errou e não conseguiu a propriedade
            </motion.p>

            {/* Card da propriedade perdida */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="mb-5 rounded-lg border border-red-500/30 bg-slate-800/60 p-4 backdrop-blur-sm"
            >
              <div className="mb-3 flex items-center justify-center gap-2">
                <Lock className="h-5 w-5 text-red-400" />
                <p className="text-sm font-semibold text-red-300">
                  Propriedade Bloqueada
                </p>
              </div>

              <motion.div
                animate={{
                  opacity: [1, 0.6, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <h3 className="text-xl font-bold text-red-100 line-through decoration-2">
                  {propertyName}
                </h3>
              </motion.div>

              <p className="mt-2 text-xs text-slate-400">
                Esta propriedade continua disponível
              </p>
            </motion.div>

            {/* Informação */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                <p className="text-sm font-semibold text-yellow-300">
                  Outros jogadores ainda podem conquistá-la
                </p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              onClick={onClose}
              className="mt-5 w-full transform rounded-lg border border-red-500/50 bg-gradient-to-r from-slate-700 to-slate-600 px-6 py-3 text-sm font-semibold text-red-50 shadow-lg transition-all duration-300 hover:scale-105 hover:border-red-500 hover:shadow-red-500/20"
            >
              Continuar
            </motion.button>
          </div>

          {/* Decoração de cantos */}
          <div className="absolute top-0 left-0 h-20 w-20 rounded-tl-lg bg-gradient-to-br from-red-500/10 to-transparent" />
          <div className="absolute right-0 bottom-0 h-20 w-20 rounded-br-lg bg-gradient-to-tl from-orange-500/10 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
