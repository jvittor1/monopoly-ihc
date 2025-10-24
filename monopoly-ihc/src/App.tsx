import "./App.css";
import Board from "./components/board-component";
import Dice from "./components/dice-component";
import HudComponent from "./components/hud-component";

function App() {
  return (
    <div className="from-primary-gradient to-secondary-gradient flex min-h-screen w-full flex-row items-start gap-8 bg-linear-to-r p-4">
      <HudComponent />
      <Board />
      <Dice />
    </div>
  );
}

export default App;
