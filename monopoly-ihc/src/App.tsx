import "./App.css";
import Board from "./components/board-component";

function App() {
  return (
    <div className="from-primary to-secondary flex min-h-screen w-full flex-row items-center justify-center bg-linear-to-r py-2">
      <Board />
    </div>
  );
}

export default App;
