import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { TIME } from "@/constants/time";
import ModalWrapper from "../modals/modal-wrapper";

type AnswerType = "success" | "error";

interface AnswerFeedbackModalProps {
  type: AnswerType;
  headerTitle: string;
  mainIcon: LucideIcon;
  title: string;
  description: string;
  points?: number;
  pointsIcon: LucideIcon;
  onClose: () => void;
  autoCloseDelay?: number;
  customPointsDisplay?: ReactNode;
}

export default function AnswerFeedbackModal({
  type,
  headerTitle,
  mainIcon: MainIcon,
  title,
  description,
  points,
  pointsIcon: PointsIcon,
  onClose,
  autoCloseDelay = TIME.EXTRA_LONG_DELAY,
  customPointsDisplay,
}: AnswerFeedbackModalProps) {
  setTimeout(onClose, autoCloseDelay);

  const colors = {
    success: {
      headerBg: "bg-green-900",
      iconGradient: "bg-green-800",
      titleColor: "text-green-400",
      cardGradient: "bg-green-900",
      cardBorder: "rgba(34, 197, 94, 0.3)",
      pointsColor: "text-green-300",
      iconColor: "text-green-400",
    },
    error: {
      headerBg: "bg-red-900",
      iconGradient: "bg-red-800",
      titleColor: "text-red-400",
      cardGradient: "bg-red-900",
      cardBorder: "rgba(239, 68, 68, 0.3)",
      pointsColor: "text-red-300",
      iconColor: "text-red-400",
    },
  };

  const color = colors[type];

  return (
    <ModalWrapper
      isOpen={true}
      onClose={() => {}}
      maxWidth="md"
      disableBackdropClick
    >
      <div
        className={`rounded-t ${color.headerBg} p-4`}
        style={{
          borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="flex items-center justify-center gap-2">
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
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className={`rounded-full bg-gradient-to-br ${color.iconGradient} p-4 shadow-lg`}
          >
            <MainIcon className="h-12 w-12 text-white" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-center"
        >
          <h3 className={`mb-2 text-xl font-bold ${color.titleColor}`}>
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-gray-300">{description}</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className={`rounded bg-gradient-to-r ${color.cardGradient} p-4 backdrop-blur-sm`}
          style={{ border: `0.5px solid ${color.cardBorder}` }}
        >
          {customPointsDisplay || (
            <div className="flex items-center justify-center gap-2">
              <PointsIcon className={`h-5 w-5 ${color.iconColor}`} />
              <p className={`text-2xl font-bold ${color.pointsColor}`}>
                {type === "success" ? "+" : "-"}
                {points} pontos
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </ModalWrapper>
  );
}
