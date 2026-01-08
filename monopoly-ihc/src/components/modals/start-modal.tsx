import { POINTS_VARIABLES } from "@/constants/points-variables";
import type { CornerTile } from "@/interfaces/corner-tile";
import type { BaseModalProps } from "@/types/modal-type";
import { motion } from "framer-motion";
import { TrendingUp, Coins } from "lucide-react";
import ModalWrapper from "./modal-wrapper";

type StartModalProps = BaseModalProps<CornerTile>;

export default function StartModal({ onAction }: StartModalProps) {
  const handleContinue = () => {
    if (onAction) onAction({});
  };

  const bonusAmount = POINTS_VARIABLES.START;

  return (
    <ModalWrapper isOpen={true} disableBackdropClick maxWidth="md">
      {/* Header */}
      <div
        className="rounded-t bg-gradient-to-r from-green-600 to-emerald-600 p-4"
        style={{
          borderBottom: "0.5px solid var(--color-border-light)",
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
            style={{
              border: "0.5px solid var(--color-green-border-medium)",
            }}
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
          onClick={handleContinue}
          className="w-full cursor-pointer rounded bg-green-800 px-6 py-3 font-bold text-white uppercase shadow-lg transition-all hover:bg-green-900"
          style={{ border: "0.5px solid var(--color-green-border-medium)" }}
        >
          Continuar Jogando
        </motion.button>
      </div>
    </ModalWrapper>
  );
}
