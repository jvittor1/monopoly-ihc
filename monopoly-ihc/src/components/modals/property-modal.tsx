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
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md overflow-hidden rounded bg-gray-900/95 text-white shadow-2xl backdrop-blur-sm"
          style={{ border: "0.5px solid rgba(255, 255, 255, 0.2)" }}
        >
          {/* Header */}
          <div
            className={`rounded-t p-4 ${
              isOwner ? "bg-green-800" : "bg-yellow-800"
            }`}
            style={{
              borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <Home className="h-6 w-6 text-white" />
              <h2 className="text-xl font-bold tracking-wide text-white uppercase">
                {isOwner ? "Sua Propriedade" : "Pagar Aluguel"}
              </h2>
            </div>
          </div>

          <div className="p-6">
            {/* Ícone */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="mb-4 flex justify-center"
            >
              <div
                className={`rounded-full p-3 shadow-lg ${
                  isOwner ? "bg-green-800" : "bg-yellow-800"
                }`}
              >
                {isOwner ? (
                  <CheckCircle className="h-12 w-12 text-white" />
                ) : (
                  <Home className="h-12 w-12 text-white" />
                )}
              </div>
            </motion.div>

            {isOwner ? (
              // Versão quando é o próprio dono
              <>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-3 text-center text-2xl font-bold text-white"
                >
                  Você está em casa!
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-5 text-center text-sm text-gray-300"
                >
                  Esta é sua propriedade
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-5 rounded bg-green-600/20 p-4 text-center backdrop-blur-sm"
                  style={{ border: "0.5px solid rgba(34, 197, 94, 0.3)" }}
                >
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <Home className="h-5 w-5 text-green-400" />
                    <h3 className="text-lg font-bold text-green-50">
                      {propertyName}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-400">
                    Valor do aluguel: {rentAmount} pts
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-5 rounded bg-green-600/20 p-3 backdrop-blur-sm"
                  style={{ border: "0.5px solid rgba(34, 197, 94, 0.3)" }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <p className="text-sm text-green-300">
                      Nenhum pagamento necessário
                    </p>
                  </div>
                </motion.div>
              </>
            ) : (
              // Versão quando tem que pagar aluguel
              <>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-3 text-center text-2xl font-bold text-white"
                >
                  Propriedade Ocupada
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-5 text-center text-sm text-gray-300"
                >
                  Você caiu em uma propriedade de outro jogador
                </motion.p>

                {/* Info da propriedade */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-4 rounded bg-yellow-700/20 p-3 text-center backdrop-blur-sm"
                  style={{ border: "0.5px solid rgba(161, 98, 7, 0.3)" }}
                >
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <Home className="h-4 w-4 text-yellow-400" />
                    <h3 className="text-base font-bold text-yellow-50">
                      {propertyName}
                    </h3>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-xs text-gray-400">Proprietário:</p>
                    <div
                      className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
                      style={{ background: owner.color }}
                    >
                      {owner.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-semibold text-gray-200">
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
                    className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white shadow-lg"
                    style={{
                      background: currentPlayer.color,
                      border: "2px solid rgb(239, 68, 68)",
                    }}
                  >
                    <span className="text-sm">
                      {currentPlayer.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <ArrowRight className="h-5 w-5 text-red-400" />

                  {/* Valor */}
                  <div className="flex items-center gap-1.5 rounded-full bg-red-700 px-3 py-1 shadow-lg">
                    <Coins className="h-3.5 w-3.5 text-white" />
                    <span className="text-sm font-bold text-white">
                      {rentAmount}
                    </span>
                  </div>

                  <ArrowRight className="h-5 w-5 text-red-400" />

                  {/* Proprietário */}
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white shadow-lg"
                    style={{
                      background: owner.color,
                      border: "2px solid rgb(34, 197, 94)",
                    }}
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
                  className="mb-5 rounded bg-red-600/20 p-3 backdrop-blur-sm"
                  style={{ border: "0.5px solid rgba(220, 38, 38, 0.3)" }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <TrendingDown className="h-4 w-4 text-red-400" />
                    <p className="text-sm text-red-300">-{rentAmount} pontos</p>
                  </div>
                </motion.div>
              </>
            )}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: isOwner ? 0.6 : 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
              className={`w-full rounded px-6 py-3 font-bold text-white uppercase shadow-lg transition-all ${
                isOwner ? "bg-green-800" : "bg-yellow-800"
              }`}
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
