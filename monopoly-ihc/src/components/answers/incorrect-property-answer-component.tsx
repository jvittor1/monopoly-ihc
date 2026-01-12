import { motion } from "framer-motion";
import { Home, XCircle, AlertTriangle } from "lucide-react";
import ModalWrapper from "../modals/modal-wrapper";
import ButtonModal from "../button-modal";
import { BotService } from "@/services/bot-service";
import { usePlayer } from "@/contexts/player-context";
import { useEffect } from "react";

interface PropertyFailedModalProps {
  onClose: () => void;
  propertyName?: string;
  playerId: number;
}

export default function PropertyFailedModal({
  onClose,
  propertyName,
  playerId,
}: PropertyFailedModalProps) {
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
        className="rounded-t bg-red-900 p-4"
        style={{
          borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <XCircle className="h-6 w-6 text-white" />
          <h2 className="text-xl font-bold tracking-wide text-white uppercase">
            Resposta Incorreta
          </h2>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-5 flex justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="relative"
          >
            <div className="rounded-full bg-gradient-to-br from-gray-700 to-gray-800 p-4 shadow-lg">
              <Home className="h-12 w-12 text-white" />
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="absolute -right-1 -bottom-1 rounded-full bg-red-500 p-1 shadow-lg"
            >
              <XCircle className="h-6 w-6 text-white" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 text-center"
        >
          <h3 className="mb-2 text-xl font-bold text-red-400">
            Que pena! Resposta Errada
          </h3>
          {/* <p className="text-sm leading-relaxed text-gray-300">
            Você não conseguiu adquirir a propriedade desta vez.
          </p> */}
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="mb-4 rounded bg-red-900/30 p-4 backdrop-blur-sm"
          style={{ border: "0.5px solid rgba(239, 68, 68, 0.3)" }}
        >
          <p className="text-center text-lg font-bold text-red-300">
            {propertyName}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-4 rounded bg-yellow-900/30 p-3 backdrop-blur-sm"
        >
          <div className="flex items-start gap-2 text-yellow-400">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <p className="text-sm">
              A propriedade continua disponível para tentativas futuras
            </p>
          </div>
        </motion.div>

        <ButtonModal
          onClick={onClose}
          disabled={currentPlayer?.isBot}
          className="w-full bg-red-900/70 text-white shadow-lg hover:bg-red-900/90"
        >
          Continuar
        </ButtonModal>
      </div>
    </ModalWrapper>
  );
}
