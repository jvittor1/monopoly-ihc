import "./App.css";
import Board from "./components/board-component";
import Dice from "./components/dice-component";
import HudComponent from "./components/hud-component";
import { useGameEngine } from "./hooks/use-game-engine";

function App() {
  const { handleDiceResult } = useGameEngine();

  return (
    <div className="from-primary-gradient to-secondary-gradient flex min-h-screen w-full flex-row items-center justify-center gap-8 bg-linear-to-r p-4">
      <HudComponent />
      <Board />
      <Dice onDiceResult={handleDiceResult} />
    </div>
  );
}

export default App;
