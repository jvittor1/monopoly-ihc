import { TIME } from "@/constants/time";
import { usePlayer } from "@/contexts/player-context";
import type { Player } from "@/interfaces/player";
import type { QuestionCard } from "@/interfaces/question-card";
import type { BaseModalProps } from "@/types/modal-type";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  TrendingDown,
  ArrowRight,
  Coins,
  CheckCircle,
} from "lucide-react";
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
  const isOwner = currentPlayer.id === owner.id;

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
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          exit={{ scale: 0.8, opacity: 0, y: -30 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className={`relative w-full max-w-md overflow-hidden rounded-lg border bg-gradient-to-br from-[#0f2027] to-[#12304d] shadow-2xl ${
            isOwner
              ? "border-green-500/40 shadow-green-500/20"
              : "border-yellow-500/40 shadow-yellow-500/20"
          }`}
        >
          {/* Barra de progresso */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{
              duration: TIME.EXTRA_LONG_DELAY / 1000,
              ease: "linear",
            }}
            className={`absolute top-0 right-0 left-0 h-1 origin-left ${
              isOwner
                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                : "bg-gradient-to-r from-yellow-500 to-orange-500"
            }`}
          />

          <div className="p-6">
            {/* Ícone */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="mb-4 flex justify-center"
            >
              <div
                className={`rounded-full p-3 shadow-lg ${
                  isOwner
                    ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/50"
                    : "bg-gradient-to-br from-yellow-500 to-orange-600 shadow-yellow-500/50"
                }`}
              >
                {isOwner ? (
                  <CheckCircle
                    className="h-12 w-12 text-white"
                    strokeWidth={2.5}
                  />
                ) : (
                  <Home className="h-12 w-12 text-white" strokeWidth={2.5} />
                )}
              </div>
            </motion.div>

            {isOwner ? (
              // Versão quando é o próprio dono
              <>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-center text-2xl font-bold text-transparent"
                >
                  Sua Propriedade!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-5 text-center text-sm text-green-100"
                >
                  Você está visitando sua própria propriedade
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-5 rounded-lg border border-green-500/30 bg-slate-800/60 p-4 text-center backdrop-blur-sm"
                >
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <Home className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-bold text-green-50">
                      {propertyName}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    Valor do aluguel: {rentAmount} pts
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-5 rounded-lg border border-green-500/30 bg-green-950/40 p-3 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <p className="text-sm font-semibold text-green-300">
                      Nenhum pagamento necessário
                    </p>
                  </div>
                </motion.div>
              </>
            ) : (
              // Versão quando tem que pagar aluguel
              <>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-center text-2xl font-bold text-transparent"
                >
                  Pagar Aluguel
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-5 text-center text-sm text-yellow-100"
                >
                  Você caiu em uma propriedade de outro jogador
                </motion.p>

                {/* Info da propriedade */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-4 rounded-lg border border-yellow-500/30 bg-slate-800/60 p-3 text-center backdrop-blur-sm"
                >
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <Home className="h-4 w-4 text-yellow-400" />
                    <h3 className="text-base font-bold text-yellow-50">
                      {propertyName}
                    </h3>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-xs text-slate-400">Proprietário:</p>
                    <div
                      className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ background: owner.color }}
                    >
                      {owner.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-semibold text-slate-200">
                      {owner.name}
                    </span>
                  </div>
                </motion.div>

                {/* Pagamento */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-4 flex items-center justify-center gap-3"
                >
                  {/* Jogador atual */}
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white shadow-lg ring-2 ring-red-500"
                    style={{ background: currentPlayer.color }}
                  >
                    <span className="text-sm">
                      {currentPlayer.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Valor */}
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight
                      className="h-5 w-5 text-red-400"
                      strokeWidth={3}
                    />
                  </motion.div>

                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 shadow-lg"
                  >
                    <Coins className="h-3.5 w-3.5 text-white" />
                    <span className="text-sm font-bold text-white">
                      {rentAmount}
                    </span>
                  </motion.div>

                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight
                      className="h-5 w-5 text-red-400"
                      strokeWidth={3}
                    />
                  </motion.div>

                  {/* Proprietário */}
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white shadow-lg ring-2 ring-green-500"
                    style={{ background: owner.color }}
                  >
                    <span className="text-sm">
                      {owner.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </motion.div>

                {/* Resumo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-5 rounded-lg border border-red-500/30 bg-red-950/40 p-3 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center gap-2">
                    <TrendingDown className="h-4 w-4 text-red-400" />
                    <p className="text-sm font-semibold text-red-300">
                      -{rentAmount} pontos
                    </p>
                  </div>
                </motion.div>
              </>
            )}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isOwner ? 0.6 : 0.7 }}
              onClick={handleContinue}
              className={`w-full transform rounded-lg px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 ${
                isOwner
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 shadow-green-500/30 hover:shadow-green-500/50"
                  : "bg-gradient-to-r from-yellow-600 to-orange-600 shadow-yellow-500/30 hover:shadow-yellow-500/50"
              }`}
            >
              Continuar
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
