import { useNavigate } from "react-router";
import { FaArrowRight, FaBook, FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { MenuButton } from "@/components/menu-button";
import RulesModal from "@/components/modals/rules-modal";
import GameSetupModal, {
  type GameConfig,
} from "@/components/modals/game-setup-modal";
import { useBoard } from "@/contexts/board-context";
import { usePlayer } from "@/contexts/player-context";
import { createPlayers } from "@/services/player-factory";
import backgroundMenuImg from "@/assets/images/background-menu.png";
import { useSound } from "@/contexts/sound-context";
import { useGame } from "@/contexts/game-context";

export const MenuPage = () => {
  const navigate = useNavigate();
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const { resetBoard } = useBoard();
  const { initializePlayers } = usePlayer();
  const { resetGame } = useGame();
  const { startBackgroundMusic } = useSound();

  const handleStartGame = () => {
    setIsSetupModalOpen(true);
  };

  const handleGameStart = (config: GameConfig) => {
    console.log("Starting new game with config:", config);
    setIsSetupModalOpen(false);

    const players = createPlayers(config);

    resetGame();
    initializePlayers(players);
    resetBoard();
    startBackgroundMusic();
    navigate("/game");
  };

  const menuOptions = [
    {
      label: "Iniciar Partida",
      icon: <FaArrowRight />,
      onClick: handleStartGame,
    },
    {
      label: "Regras",
      icon: <FaBook />,
      onClick: () => setIsRulesModalOpen(true),
    },
    {
      label: "Tutorial",
      icon: <FaGraduationCap />,
      onClick: () => {
        console.log("Tutorial clicked");
      },
    },
  ];

  return (
    <>
      <img
        src={backgroundMenuImg}
        className="absolute top-0 left-0 h-full w-full object-cover opacity-5"
        alt=""
      />
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col gap-6 overflow-x-hidden overflow-y-auto rounded bg-gray-900/95 p-6 text-white shadow-2xl backdrop-blur-sm"
        style={{ border: "0.5px solid rgba(255, 255, 255, 0.2)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="-m-6 mb-0 rounded-t bg-gray-800 p-4"
          style={{
            borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <h1 className="bg-gradient-to-r text-lg font-bold tracking-wide text-white/60 uppercase">
            Menu Principal
          </h1>
        </motion.div>

        <div className="flex w-full flex-col gap-3 pt-2">
          {menuOptions.map((option, index) => (
            <MenuButton
              key={option.label}
              label={option.label}
              icon={option.icon}
              onClick={option.onClick}
              index={index}
            />
          ))}
        </div>
      </div>

      <RulesModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
      />

      <GameSetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        onStartGame={handleGameStart}
      />
    </>
  );
};
