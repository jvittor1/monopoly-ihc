import { X, Play, Book, Home } from "lucide-react";
import { useState } from "react";
import RulesModal from "./rules-modal";
import { MenuButton } from "@/components/menu-button";
import ModalWrapper from "./modal-wrapper";

interface GameMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToMenu: () => void;
}

import { useSound } from "@/contexts/sound-context";

export default function GameMenuModal({
  isOpen,
  onClose,
  onBackToMenu,
}: GameMenuModalProps) {
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const { stopBackgroundMusic } = useSound();

  const handleBackToMenu = () => {
    stopBackgroundMusic();
    onBackToMenu();
  };

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
      onClick: handleBackToMenu,
      description: "Sair e voltar ao menu",
    },
  ];

  return (
    <>
      <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="md">
        <div
          className="flex items-center justify-between rounded-t bg-gray-800 p-5"
          style={{
            borderBottom: "0.5px solid var(--color-border-light)",
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
      </ModalWrapper>

      <RulesModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
      />
    </>
  );
}
