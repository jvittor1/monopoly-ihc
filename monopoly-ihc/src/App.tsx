import "./App.css";
import { Outlet } from "react-router";
import { GameProviderWrapper } from "./components/game-provider-wrapper";

function App() {
  return (
    <GameProviderWrapper>
      <div className="from-primary-gradient to-secondary-gradient flex min-h-screen w-full flex-row items-center justify-center gap-8 bg-linear-to-r p-4">
        <Outlet />
      </div>
    </GameProviderWrapper>
  );
}

export default App;
