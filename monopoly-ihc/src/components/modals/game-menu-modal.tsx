import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Book, Home } from "lucide-react";
import { useState } from "react";
import RulesModal from "./rules-modal";
import { MenuButton } from "@/components/menu-button";

interface GameMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToMenu: () => void;
}

export default function GameMenuModal({
  isOpen,
  onClose,
  onBackToMenu,
}: GameMenuModalProps) {
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);

  if (!isOpen) return null;

  const menuOptions = [
    {
      label: "Continuar",
      icon: <Play />,
      onClick: () => onClose(),
      description: "Voltar ao jogo",
    },
    {
      label: "Regras",
      icon: <Book />,
      onClick: () => setIsRulesModalOpen(true),
      description: "Ver as regras do jogo",
    },
    {
      label: "Menu Principal",
      icon: <Home />,
      onClick: () => onBackToMenu(),
      description: "Sair e voltar ao menu",
    },
  ];

  return (
    <>
      <AnimatePresence>
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4"
        >
          <motion.div
            key="modal"
            initial={{ y: 50, opacity: 0, scale: 0.85 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded bg-gray-900/95 text-white shadow-2xl backdrop-blur-sm"
            style={{ border: "0.5px solid rgba(255, 255, 255, 0.2)" }}
          >
            <div
              className="flex items-center justify-between rounded-t bg-gray-800 p-5"
              style={{
                borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <h2 className="bg-gradient-to-r text-lg font-bold tracking-wide text-blue-400 uppercase">
                Menu do Jogo
              </h2>
              <button
                onClick={onClose}
                className="rounded p-2 transition-all duration-200 hover:bg-white/10"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-3 p-6">
              {menuOptions.map((option, index) => (
                <MenuButton
                  key={option.label}
                  label={option.label}
                  icon={option.icon}
                  onClick={option.onClick}
                  index={index}
                  description={option.description}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <RulesModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
      />
    </>
  );
}
