import { createContext, useContext, useState, useEffect } from "react";
import DiceResultOverlay from "@/components/dice-result-overlay-component";

interface DiceResultOverlayProps {
  value: number;
  timer?: number;
}

type DiceResultContextType = {
  showDiceResult: (options: DiceResultOverlayProps) => void;
};

interface DiceResultProviderProps {
  children: React.ReactNode;
}

const DiceResultContext = createContext<DiceResultContextType | undefined>(
  undefined,
);

export const useDiceResult = () => {
  const context = useContext(DiceResultContext);
  if (!context)
    throw new Error("useDiceResult must be used within a DiceResultProvider");
  return context;
};

export const DiceResultProvider: React.FC<DiceResultProviderProps> = ({
  children,
}) => {
  const [overlay, setOverlay] = useState<DiceResultOverlayProps | null>(null);

  const showDiceResult = (options: DiceResultOverlayProps) => {
    setOverlay(options);
  };

  useEffect(() => {
    if (!overlay) return;

    const timeout = setTimeout(() => setOverlay(null), overlay.timer ?? 1800);
    return () => clearTimeout(timeout);
  }, [overlay]);

  return (
    <DiceResultContext.Provider value={{ showDiceResult }}>
      {children}
      {overlay && <DiceResultOverlay value={overlay.value} />}
    </DiceResultContext.Provider>
  );
};
