import type { CornerTile } from "@/interfaces/corner-tile";
import { motion } from "framer-motion";
import { Coffee, Smile } from "lucide-react";
import type { BaseModalProps } from "@/types/modal-type";
import ModalWrapper from "./modal-wrapper";
import ButtonModal from "../button-modal";
import { usePlayer } from "@/contexts/player-context";
import { BotService } from "@/services/bot-service";
import { useEffect } from "react";

type FreeParkingModalProps = BaseModalProps<CornerTile>;

export default function FreeParkingModal({
  onAction,
  playerId,
}: FreeParkingModalProps) {
  const { getPlayerById } = usePlayer();
  const currentPlayer = getPlayerById(playerId);

  useEffect(() => {
    if (currentPlayer?.isBot) {
      const autoClick = async () => {
        await BotService.thinkingDelay();
        handleContinue();
      };
      autoClick();
    }
  }, [currentPlayer?.isBot]);

  const handleContinue = () => {
    if (onAction) onAction({});
  };

  return (
    <ModalWrapper isOpen={true} disableBackdropClick maxWidth="md">
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

      <div className="p-6">
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

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="mb-5 rounded bg-purple-600/20 p-4 text-center backdrop-blur-sm"
          style={{ border: "0.5px solid var(--color-purple-border)" }}
        >
          <p className="text-lg font-semibold text-purple-300">
            Momento de pausa
          </p>
          <p className="mt-1 text-sm text-gray-300">
            Aproveite para respirar fundo
          </p>
        </motion.div>

        <ButtonModal
          onClick={handleContinue}
          disabled={currentPlayer?.isBot}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
        >
          Continuar Jogando
        </ButtonModal>
      </div>
    </ModalWrapper>
  );
}
