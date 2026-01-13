import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  disableBackdropClick?: boolean;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
};

export default function ModalWrapper({
  isOpen,
  onClose,
  children,
  maxWidth = "md",
  disableBackdropClick = false,
}: ModalWrapperProps) {
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    if (!disableBackdropClick && onClose) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4"
      >
        <motion.div
          key="modal"
          initial={{ y: 50, opacity: 0, scale: 0.85 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full ${maxWidthClasses[maxWidth]} rounded bg-gray-900/70 text-white shadow-2xl backdrop-blur-sm`}
          style={{ border: "0.5px solid rgba(255, 255, 255, 0.2)" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
