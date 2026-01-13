import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import ModalWrapper from "../modals/modal-wrapper";
import ButtonModal from "../button-modal";
import { useEffect } from "react";
import { usePlayer } from "@/contexts/player-context";
import { BotService } from "@/services/bot-service";

interface PropertyAnswerModalProps {
  headerBg: string;
  headerIcon: LucideIcon;
  headerTitle: string;
  mainGradient: string;
  badgeIcon: LucideIcon;
  badgeBg: string;
  title: string;
  titleColor: string;
  propertyCardBg: string;
  propertyCardBorder: string;
  propertyTextColor: string;
  infoMessage: ReactNode;
  infoCardBg: string;
  infoTextColor: string;
  buttonBg: string;
  propertyName?: string;
  playerId: number;
  onClose: () => void;
}

export default function PropertyAnswerModal({
  headerBg,
  headerIcon: HeaderIcon,
  headerTitle,
  mainGradient,
  badgeIcon: BadgeIcon,
  badgeBg,
  title,
  titleColor,
  propertyCardBg,
  propertyCardBorder,
  propertyTextColor,
  infoMessage,
  infoCardBg,
  infoTextColor,
  buttonBg,
  propertyName,
  playerId,
  onClose,
}: PropertyAnswerModalProps) {
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
        className={`rounded-t ${headerBg} p-4`}
        style={{
          borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <HeaderIcon className="h-6 w-6 text-white" />
          <h2 className="text-xl font-bold tracking-wide text-white uppercase">
            {headerTitle}
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
            <div
              className={`rounded-full bg-gradient-to-br ${mainGradient} p-4 shadow-lg`}
            >
              <HeaderIcon className="h-12 w-12 text-white" />
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className={`absolute -right-1 -bottom-1 rounded-full ${badgeBg} p-1 shadow-lg`}
            >
              <BadgeIcon className="h-6 w-6 text-white" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 text-center"
        >
          <h3 className={`mb-2 text-xl font-bold ${titleColor}`}>{title}</h3>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className={`mb-4 rounded ${propertyCardBg} p-4 backdrop-blur-sm`}
          style={{ border: `0.5px solid ${propertyCardBorder}` }}
        >
          <p className={`text-center text-lg font-bold ${propertyTextColor}`}>
            {propertyName}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`mb-4 rounded ${infoCardBg} p-3 backdrop-blur-sm`}
        >
          <div
            className={`flex items-center justify-center gap-2 px-3 text-center ${infoTextColor}`}
          >
            {infoMessage}
          </div>
        </motion.div>

        <ButtonModal
          onClick={onClose}
          disabled={currentPlayer?.isBot}
          className={`w-full ${buttonBg} text-white shadow-lg`}
        >
          Continuar
        </ButtonModal>
      </div>
    </ModalWrapper>
  );
}
