import "./App.css";
import Board from "./components/board-component";
import Dice from "./components/dice-component";

function App() {
  return (
    <div className="from-primary-gradient to-secondary-gradient flex min-h-screen w-full flex-row items-center justify-center bg-linear-to-r py-2">
      <Board />
      <Dice />
    </div>
  );
}

export default App;
