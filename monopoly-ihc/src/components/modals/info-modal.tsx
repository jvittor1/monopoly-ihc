import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import ModalWrapper from "./modal-wrapper";
import ButtonModal from "../button-modal";
import { usePlayer } from "@/contexts/player-context";
import { BotService } from "@/services/bot-service";
import { useEffect, useRef, type ReactNode } from "react";

interface InfoModalProps {
  headerColor: string;
  headerIcon: LucideIcon | React.ComponentType<{ className?: string }>;
  headerTitle: string;
  mainIcon: LucideIcon | React.ComponentType<{ className?: string }>;
  mainIconColor: string;
  mainIconAnimation?: {
    initial?: Record<string, number>;
    animate?: Record<string, number>;
  };
  title: string;
  description: string;
  infoCard?: ReactNode;
  buttonText: string;
  buttonColor: string;
  playerId: number;
  onAction?: (params?: any) => void;
}

export default function InfoModal({
  headerColor,
  headerIcon: HeaderIcon,
  headerTitle,
  mainIcon: MainIcon,
  mainIconColor,
  mainIconAnimation,
  title,
  description,
  infoCard,
  buttonText,
  buttonColor,
  playerId,
  onAction,
}: InfoModalProps) {
  const { getPlayerById } = usePlayer();
  const currentPlayer = getPlayerById(playerId);
  const hasAutoClicked = useRef(false);

  const handleContinue = () => {
    if (onAction) onAction({});
  };

  useEffect(() => {
    if (currentPlayer?.isBot && !hasAutoClicked.current) {
      hasAutoClicked.current = true;
      const autoClick = async () => {
        await BotService.thinkingDelay();
        handleContinue();
      };
      autoClick();
    }
  }, [currentPlayer?.isBot]);

  const defaultAnimation = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
  };

  const iconAnimation = mainIconAnimation || defaultAnimation;

  return (
    <ModalWrapper isOpen={true} disableBackdropClick maxWidth="md">
      <div
        className={`rounded-t ${headerColor} p-4`}
        style={{
          borderBottom: "0.5px solid var(--color-border-light)",
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
            initial={iconAnimation.initial}
            animate={iconAnimation.animate}
            transition={{ delay: 0.2, type: "spring" }}
            className={`rounded-full ${mainIconColor} p-4 shadow-lg`}
          >
            <MainIcon className="h-12 w-12 text-white" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-5 text-center"
        >
          <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>
          <p className="mb-4 text-base text-gray-300">{description}</p>

          {infoCard}
        </motion.div>

        <ButtonModal
          onClick={handleContinue}
          disabled={currentPlayer?.isBot}
          className={`w-full ${buttonColor} text-white opacity-75 shadow-lg hover:opacity-90`}
        >
          {buttonText}
        </ButtonModal>
      </div>
    </ModalWrapper>
  );
}
