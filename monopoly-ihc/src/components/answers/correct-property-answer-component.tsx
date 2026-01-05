import { motion, AnimatePresence } from "framer-motion";
import { Home, CheckCircle2, Key, Sparkles } from "lucide-react";

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
          initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotateY: 90 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md overflow-hidden rounded-lg border border-cyan-500/30 bg-gradient-to-br from-[#0f2027] to-[#12304d] shadow-2xl shadow-cyan-500/20"
        >
          {/* Efeito de brilho animado */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
          />

          {/* Partículas flutuantes */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: [0, (i % 2 === 0 ? 30 : -30) * (1 + i * 0.2)],
                y: [0, -40 - i * 10],
              }}
              transition={{
                duration: 1.5,
                delay: 0.5 + i * 0.15,
                ease: "easeOut",
              }}
              className="absolute top-1/2 left-1/2"
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
            </motion.div>
          ))}

          {/* Ícone grande */}
          <div className="flex justify-center pt-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-4 shadow-lg shadow-cyan-500/50">
                <Home className="h-16 w-16 text-white" strokeWidth={2.5} />
              </div>

              {/* Check sobreposto */}
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                className="absolute -top-2 -right-2 rounded-full bg-green-500 p-1.5 shadow-lg ring-2 ring-slate-900"
              >
                <CheckCircle2 className="h-5 w-5 text-white" strokeWidth={3} />
              </motion.div>
            </motion.div>
          </div>

          {/* Conteúdo */}
          <div className="p-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-3xl font-bold text-transparent"
            >
              Propriedade Adquirida!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-5 text-base text-cyan-100"
            >
              Você acertou e ganhou a propriedade!
            </motion.p>

            {/* Card da propriedade */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="mb-5 rounded-lg border border-cyan-500/30 bg-slate-800/60 p-4 backdrop-blur-sm"
            >
              <div className="mb-3 flex items-center justify-center gap-2">
                <Key className="h-5 w-5 text-cyan-400" />
                <p className="text-sm font-semibold text-cyan-300">
                  Nova Propriedade
                </p>
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <h3 className="text-xl font-bold text-cyan-50">
                  {propertyName}
                </h3>
              </motion.div>

              <p className="mt-2 text-xs text-slate-400">
                Agora esta propriedade é sua!
              </p>
            </motion.div>

            {/* Benefício */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-lg border border-green-500/30 bg-green-950/40 p-3 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 text-green-400" />
                <p className="text-sm font-semibold text-green-300">
                  Outros jogadores pagarão aluguel quando caírem aqui
                </p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 10 }}
              transition={{ delay: 0.5 }}
              onClick={onClose}
              className="w-full transform rounded-lg border border-green-500/30 bg-gradient-to-r from-[#0f2027] to-[#12304d] px-6 py-3 text-sm font-semibold text-orange-50 shadow-lg transition-all duration-300 hover:scale-105 hover:border-green-500 hover:shadow-green-500/20"
            >
              Entendi
            </motion.button>
          </div>

          {/* Decoração de cantos */}
          <div className="absolute top-0 left-0 h-20 w-20 rounded-tl-lg bg-gradient-to-br from-cyan-500/10 to-transparent" />
          <div className="absolute right-0 bottom-0 h-20 w-20 rounded-br-lg bg-gradient-to-tl from-blue-500/10 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
