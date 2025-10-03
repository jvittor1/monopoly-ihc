import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DiceResultProvider } from "./contexts/dice-result-overlay-context.tsx";
import { GameProvider } from "./contexts/game-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameProvider>
      <DiceResultProvider>
        <App />
      </DiceResultProvider>
    </GameProvider>
  </StrictMode>,
);
