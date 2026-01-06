import Board from "@/components/board-component";
import Dice from "@/components/dice-component";
import HudComponent from "@/components/hud-component";
import { useGameEngine } from "@/hooks/use-game-engine";

export const GamePage = () => {
  const { handleDiceResult } = useGameEngine();
  return (
    <>
      <HudComponent />
      <Board />
      <Dice onDiceResult={handleDiceResult} />
    </>
  );
};
