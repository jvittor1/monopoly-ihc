import { TIME } from "@/constants/time";
import { usePlayer } from "@/contexts/player-context";
import type { Player } from "@/interfaces/player";
import type { QuestionCard } from "@/interfaces/question-card";
import type { BaseModalProps } from "@/types/modal-type";
import { motion, AnimatePresence } from "framer-motion";
import { Home, TrendingDown, ArrowRight, User, Coins } from "lucide-react";
import { useEffect } from "react";

type QuestionModalProps = BaseModalProps<QuestionCard>;

export default function PropertyRentModal({
  tile,
  playerId,
  onAction,
}: QuestionModalProps) {
  const { getPlayerById } = usePlayer();
  const currentPlayer = getPlayerById(playerId) as Player;
  const owner = getPlayerById(tile.ownerId!) as Player;

  const handleContinue = () => {
    if (onAction) onAction({});
  };

  useEffect(() => {
    const timer = setTimeout(handleContinue, TIME.EXTRA_LONG_DELAY);
    return () => clearTimeout(timer);
  }, []);
  const propertyName = tile.text;
  const rentAmount = tile.rentPrice || 0;

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
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          exit={{ scale: 0.5, opacity: 0, y: -50 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className="relative w-full max-w-md overflow-hidden rounded-lg border border-yellow-500/40 bg-gradient-to-br from-[#0f2027] to-[#12304d] shadow-2xl shadow-yellow-500/20"
        >
          {/* Efeito de brilho animado */}
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent"
          />

          {/* Ícone da propriedade */}
          <div className="flex justify-center pt-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
              }}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 p-4 shadow-lg shadow-yellow-500/50"
              >
                <Home className="h-16 w-16 text-white" strokeWidth={2.5} />
              </motion.div>

              {/* Pulso ao redor */}
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full border-2 border-yellow-400"
              />
            </motion.div>
          </div>

          {/* Conteúdo */}
          <div className="p-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-2xl font-bold text-transparent"
            >
              Propriedade Ocupada!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 text-sm text-yellow-100"
            >
              Você caiu em uma propriedade de outro jogador
            </motion.p>

            {/* Card da propriedade */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="mb-4 rounded-lg border border-yellow-500/30 bg-gradient-to-r from-slate-800/60 to-slate-700/60 p-4 backdrop-blur-sm"
            >
              <div className="mb-3 flex items-center justify-center gap-2">
                <Home className="h-5 w-5 text-yellow-400" />
                <h3 className="text-lg font-bold text-yellow-50">
                  {propertyName}
                </h3>
              </div>

              <div className="flex items-center justify-center gap-2 rounded-md border border-slate-600/50 bg-slate-900/50 px-3 py-2">
                <User className="h-4 w-4 text-slate-400" />
                <p className="text-xs text-slate-400">Proprietário:</p>
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ background: owner.color }}
                  >
                    {owner.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-slate-200">
                    {owner.name}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Transação de pagamento */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-5"
            >
              <p className="mb-3 text-xs font-semibold tracking-wider text-yellow-400 uppercase">
                Pagamento de Aluguel
              </p>

              <div className="flex items-center justify-center gap-3">
                {/* Jogador atual */}
                <div className="flex flex-col items-center">
                  <div
                    className="mb-2 flex h-12 w-12 items-center justify-center rounded-full font-bold text-white shadow-lg ring-2 ring-red-500"
                    style={{ background: currentPlayer.color }}
                  >
                    <span className="text-base">
                      {currentPlayer.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-400">
                    {currentPlayer.name}
                  </p>
                </div>

                {/* Seta com valor */}
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight
                      className="h-6 w-6 text-red-400"
                      strokeWidth={3}
                    />
                  </motion.div>
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                    className="mt-2 flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 shadow-lg shadow-red-600/40"
                  >
                    <Coins className="h-4 w-4 text-white" />
                    <span className="text-sm font-bold text-white">
                      {rentAmount}
                    </span>
                  </motion.div>
                </div>

                {/* Proprietário */}
                <div className="flex flex-col items-center">
                  <div
                    className="mb-2 flex h-12 w-12 items-center justify-center rounded-full font-bold text-white shadow-lg ring-2 ring-green-500"
                    style={{ background: owner.color }}
                  >
                    <span className="text-base">
                      {owner.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-400">
                    {owner.name}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Resumo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-6 rounded-lg border border-red-500/30 bg-red-950/40 p-3 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-400" />
                <p className="text-sm font-semibold text-red-300">
                  Você perdeu {rentAmount} pontos
                </p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={handleContinue}
              className="w-full transform rounded-lg bg-gradient-to-r from-yellow-600 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-yellow-500/30 transition-all duration-300 hover:scale-105 hover:shadow-yellow-500/50"
            >
              Continuar
            </motion.button>
          </div>

          {/* Decoração de cantos */}
          <div className="absolute top-0 left-0 h-20 w-20 rounded-tl-lg bg-gradient-to-br from-yellow-500/10 to-transparent" />
          <div className="absolute right-0 bottom-0 h-20 w-20 rounded-br-lg bg-gradient-to-tl from-orange-500/10 to-transparent" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
