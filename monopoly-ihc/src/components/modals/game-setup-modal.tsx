import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, User, Palette, Brain, ArrowLeft } from "lucide-react";
import { useState } from "react";
import ModalWrapper from "./modal-wrapper";

interface GameSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: (config: GameConfig) => void;
}

export interface GameConfig {
  playerName: string;
  playerColor: string;
  botDifficulty: "easy" | "medium" | "hard" | "master";
}

const AVAILABLE_COLORS = [
  { name: "Azul", value: "#457B9D" },
  { name: "Vermelho", value: "#E63946" },
  { name: "Branco", value: "#FFFFFF" },
  { name: "Laranja", value: "#F4A261" },
  { name: "Roxo", value: "#9D4EDD" },
  { name: "Verde Neon", value: "#06FFA5" },
];

const BOT_DIFFICULTIES = [
  { id: "easy", label: "Fácil", description: "30% de acerto", color: "green" },
  {
    id: "medium",
    label: "Médio",
    description: "50% de acerto",
    color: "yellow",
  },
  {
    id: "hard",
    label: "Difícil",
    description: "70% de acerto",
    color: "orange",
  },
  { id: "master", label: "Mestre", description: "99% de acerto", color: "red" },
];

export default function GameSetupModal({
  isOpen,
  onClose,
  onStartGame,
}: GameSetupModalProps) {
  const [step, setStep] = useState(1);
  const [playerName, setPlayerName] = useState("Jogador 1");
  const [playerColor, setPlayerColor] = useState(AVAILABLE_COLORS[0].value);
  const [botDifficulty, setBotDifficulty] = useState<
    "easy" | "medium" | "hard" | "master"
  >("medium");

  if (!isOpen) return null;

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onStartGame({
        playerName,
        playerColor,
        botDifficulty,
      });
      // Reset modal state
      setStep(1);
      setPlayerName("Jogador 1");
      setPlayerColor(AVAILABLE_COLORS[0].value);
      setBotDifficulty("medium");
    }
  };

  const getStepIcon = () => {
    switch (step) {
      case 1:
        return <User className="h-5 w-5" />;
      case 2:
        return <Palette className="h-5 w-5" />;
      case 3:
        return <Brain className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Escolha seu nome";
      case 2:
        return "Escolha sua cor";
      case 3:
        return "Dificuldade do Bot";
      default:
        return "";
    }
  };

  const isStepValid = () => {
    if (step === 1) return playerName.trim().length > 0;
    if (step === 2) return playerColor !== "";
    return true;
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="md">
      <div
        className="flex items-center justify-between rounded-t bg-gray-800 p-5"
        style={{
          borderBottom: "0.5px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded bg-blue-800/30"
            style={{
              border: "0.5px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <span className="text-blue-400">{getStepIcon()}</span>
          </div>
          <h2 className="text-lg font-bold tracking-wide text-blue-400 uppercase">
            {getStepTitle()}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="cursor-pointer rounded p-2 transition-all duration-200 hover:bg-white/10"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="flex gap-2 px-6 pt-6">
        {[1, 2, 3].map((value) => (
          <div
            key={value}
            className="h-1 flex-1 rounded-full bg-gray-700 transition-all duration-300"
            style={{
              backgroundColor: value <= step ? "#3B82F6" : "#374151",
            }}
          />
        ))}
      </div>

      <div className="min-h-[280px] p-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <p className="text-sm text-gray-400">
                Digite o nome que você deseja usar durante a partida
              </p>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Seu nome"
                className="w-full rounded bg-gray-800/60 px-4 py-3 text-white placeholder-gray-500 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                style={{
                  border: "0.5px solid rgba(255, 255, 255, 0.1)",
                }}
                maxLength={20}
                autoFocus
              />
              <p className="text-xs text-gray-500">Máximo de 20 caracteres</p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <p className="text-sm text-gray-400">
                Selecione a cor do seu peão
              </p>
              <div className="grid grid-cols-3 gap-3">
                {AVAILABLE_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setPlayerColor(color.value)}
                    className="group relative flex cursor-pointer flex-col items-center gap-2 rounded bg-gray-800/60 p-4 transition-all duration-200 hover:bg-gray-700/70"
                    style={{
                      border:
                        playerColor === color.value
                          ? `1px solid ${color.value}`
                          : "0.5px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div
                      className="h-12 w-12 rounded-full transition-transform duration-200 group-hover:scale-110"
                      style={{
                        backgroundColor: color.value,
                        boxShadow:
                          playerColor === color.value
                            ? `0 0 20px ${color.value}80`
                            : "none",
                      }}
                    />
                    <span className="text-xs text-gray-300">{color.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <p className="text-sm text-gray-400">
                Escolha o nível de dificuldade do bot
              </p>
              <div className="space-y-3">
                {BOT_DIFFICULTIES.map((difficulty) => (
                  <button
                    key={difficulty.id}
                    onClick={() =>
                      setBotDifficulty(
                        difficulty.id as "easy" | "medium" | "hard" | "master",
                      )
                    }
                    className="group relative w-full cursor-pointer overflow-hidden rounded bg-gray-800/60 p-4 text-left transition-all duration-200 hover:bg-gray-700/70"
                    style={{
                      border:
                        botDifficulty === difficulty.id
                          ? "1px solid #3B82F6"
                          : "0.5px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {botDifficulty === difficulty.id && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-r opacity-40 ${
                          difficulty.color === "green"
                            ? "from-green-900/0 to-green-400/50"
                            : difficulty.color === "yellow"
                              ? "from-yellow-900/0 to-yellow-200/50"
                              : difficulty.color === "orange"
                                ? "from-orange-900/0 to-orange-400/50"
                                : "from-red-900/0 to-red-600/50"
                        }`}
                      />
                    )}
                    <div className="relative flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">
                          {difficulty.label}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {difficulty.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className="rounded-b bg-gray-800/50 p-6"
        style={{
          borderTop: "0.5px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (step > 1) {
                setStep(step - 1);
              }
            }}
            className={`group flex cursor-pointer items-center gap-2 rounded bg-zinc-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-zinc-600 ${step === 1 ? "pointer-events-none opacity-50" : ""}`}
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={handleContinue}
            disabled={!isStepValid()}
            className="group flex cursor-pointer items-center gap-2 rounded bg-blue-800 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-900"
          >
            {step === 3 ? "Iniciar Partida" : "Continuar"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
