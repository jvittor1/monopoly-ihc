import type { QuestionCard } from "@/interfaces/question-card";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { HelpCircle, X } from "lucide-react";
import type { BaseModalProps } from "@/types/modal-type";
import ModalWrapper from "./modal-wrapper";
import { BotService } from "@/services/bot-service";
import { usePlayer } from "@/contexts/player-context";
import { ANSWER_COST_BY_DIFFICULTY } from "@/constants/cost-by-difficulty";
import { MdAttachMoney } from "react-icons/md";

type ChoiceModalProps = BaseModalProps<QuestionCard>;

export default function ChoiceModal({
  tile,
  playerId,
  onAction,
}: ChoiceModalProps) {
  const hasSubmitted = useRef(false);
  const { getPlayerById } = usePlayer();
  const currentPlayer = getPlayerById(playerId);
  const isBot = currentPlayer?.isBot ?? false;
  const cost = ANSWER_COST_BY_DIFFICULTY[tile.difficulty] ?? 15;

  if (!currentPlayer) return null;

  const canAfford = currentPlayer.money - cost >= 0;

  // Bot logic: decide automatically
  useEffect(() => {
    if (!isBot) return;

    const playBotTurn = async () => {
      await BotService.thinkingDelay();

      if (!canAfford) {
        if (onAction) {
          onAction({ playerId, wantsToAnswer: false });
        }
        return;
      }
      // Bot decides based on difficulty
      const shouldAnswer = BotService.shouldAnswerProperty(
        currentPlayer!.botDifficulty,
      );

      if (hasSubmitted.current) return;
      hasSubmitted.current = true;

      if (onAction) {
        onAction({ playerId, wantsToAnswer: shouldAnswer });
      }
    };

    playBotTurn();
  }, [isBot, playerId, tile, onAction]);

  const handleAnswer = () => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    if (onAction) {
      onAction({ playerId, wantsToAnswer: true });
    }
  };

  const handleIgnore = () => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    if (onAction) {
      onAction({ playerId, wantsToAnswer: false });
    }
  };

  return (
    <ModalWrapper isOpen={true} disableBackdropClick maxWidth="md">
      <div className="relative max-h-[90vh] w-full overflow-x-hidden overflow-y-auto">
        <div
          className="rounded-t bg-gray-800 p-4"
          style={{
            borderBottom: "0.5px solid var(--color-border-light)",
          }}
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-bold tracking-wide text-blue-400 uppercase">
              Propriedade disponível
            </h2>
          </div>
        </div>

        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mb-5 rounded bg-gray-800/90 bg-gradient-to-br to-gray-900/90 p-5 backdrop-blur-sm"
            style={{ border: "0.5px solid var(--color-border-subtle)" }}
          >
            <h3 className="mb-2 text-lg font-semibold text-white">
              {tile.text}
            </h3>
            <p className="text-base leading-relaxed text-gray-300">
              Deseja arriscar e responder a pergunta para adquirir esta
              propriedade?
            </p>
            <p className="mt-3 flex items-center gap-3 text-sm font-medium text-gray-300 uppercase">
              Custo:{" "}
              <span className="-gap-2 flex items-center rounded-xs border border-green-500 bg-green-700/60 py-[1px] pr-[18px] pl-4 text-green-500">
                <MdAttachMoney size={18} /> {cost}
              </span>
            </p>
          </motion.div>

          <div className="flex gap-3">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              disabled={isBot}
              onClick={handleIgnore}
              className="flex w-full cursor-pointer items-center gap-2 rounded px-6 py-2.5 text-center text-sm font-bold text-gray-300 uppercase transition-all duration-300 hover:bg-gray-700/70 disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                border: "0.5px solid var(--color-border-faint)",
              }}
            >
              <X className="h-4 w-4" />
              Ignorar
            </motion.button>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              disabled={isBot || !canAfford}
              onClick={handleAnswer}
              className="flex w-full cursor-pointer items-center gap-2 rounded bg-blue-800 px-6 py-2.5 text-center text-sm font-bold text-white uppercase shadow-lg transition-all duration-300 hover:bg-blue-900 disabled:pointer-events-none disabled:bg-zinc-700"
              style={{
                border: "0.5px solid var(--color-blue-border-medium)",
              }}
            >
              <HelpCircle className="h-4 w-4" />
              Responder
            </motion.button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
