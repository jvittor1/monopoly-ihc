import { motion } from "framer-motion";
import { Home, CheckCircle2, Key } from "lucide-react";
import ModalWrapper from "../modals/modal-wrapper";
import ButtonModal from "../button-modal";
import { useEffect } from "react";
import { usePlayer } from "@/contexts/player-context";
import { BotService } from "@/services/bot-service";

interface PropertyAcquiredModalProps {
  onClose: () => void;
  propertyName?: string;
  playerId: number;
}

export default function PropertyAcquiredModal({
  onClose,
  propertyName,
  playerId,
}: PropertyAcquiredModalProps) {
  const { getPlayerById } = usePlayer();
  const currentPlayer = getPlayerById(playerId);

  useEffect(() => {
    if (currentPlayer?.isBot) {
      const autoClose = async () => {
        await BotService.thinkingDelay();
        onClose();
      };
      autoClose();
    }
  }, [currentPlayer?.isBot, onClose]);

  return (
    <ModalWrapper
      isOpen={true}
      onClose={onClose}
      maxWidth="md"
      disableBackdropClick
    >
      <div
        className="rounded-t bg-cyan-900 p-4"
        style={{
          borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-white" />
          <h2 className="text-xl font-bold tracking-wide text-white uppercase">
            Propriedade Conquistada!
          </h2>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-5 flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <div className="rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 p-4 shadow-lg">
              <Home className="h-12 w-12 text-white" />
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -right-1 -bottom-1 rounded-full bg-green-500 p-1 shadow-lg"
            >
              <CheckCircle2 className="h-6 w-6 text-white" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 text-center"
        >
          <h3 className="mb-2 text-xl font-bold text-cyan-400">
            Parabéns! Você é o novo proprietário!
          </h3>
          {/* <p className="text-sm leading-relaxed text-gray-300">
            Resposta correta! A propriedade agora é sua.
          </p> */}
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="mb-4 rounded bg-cyan-900/30 p-4 backdrop-blur-sm"
          style={{ border: "0.5px solid rgba(34, 211, 238, 0.3)" }}
        >
          <p className="text-center text-lg font-bold text-cyan-300">
            {propertyName}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-4 rounded bg-green-900/30 p-3 backdrop-blur-sm"
        >
          <p className="flex items-center justify-center gap-2 text-center text-sm text-green-300">
            <Key className="h-4 w-4 text-green-400" />
            Agora você cobra aluguel de quem cair aqui!
          </p>
        </motion.div>

        <ButtonModal
          onClick={onClose}
          disabled={currentPlayer?.isBot}
          className="w-full bg-cyan-900/70 text-white shadow-lg hover:bg-cyan-900/90"
        >
          Continuar
        </ButtonModal>
      </div>
    </ModalWrapper>
  );
}
