import { useEffect } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/contexts/game-context";
import { BotService } from "@/services/bot-service";

interface BotAwareButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  autoClickDelay?: number;
}

export default function BotAwareButton({
  onClick,
  children,
  className = "",
  disabled = false,
}: BotAwareButtonProps) {
  const { currentPlayer } = useGame();
  const isBotTurn = currentPlayer?.isBot || false;

  useEffect(() => {
    if (isBotTurn && !disabled) {
      const autoClick = async () => {
        await BotService.thinkingDelay();
        onClick();
      };
      autoClick();
    }
  }, [isBotTurn, disabled, onClick]);

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled || isBotTurn}
      className={`flex cursor-pointer items-center justify-center gap-2 rounded px-6 py-3 font-semibold uppercase transition-all disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {children}
    </motion.button>
  );
}
