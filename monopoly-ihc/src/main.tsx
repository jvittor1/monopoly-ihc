import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DiceResultProvider } from "./contexts/dice-result-overlay-context.tsx";
import { GameProvider } from "./contexts/game-context.tsx";
import { ModalProvider } from "./contexts/modal-context.tsx";
import { AnswerProvider } from "./contexts/answer-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      <AnswerProvider>
        <GameProvider>
          <DiceResultProvider>
            <App />
          </DiceResultProvider>
        </GameProvider>
      </AnswerProvider>
    </ModalProvider>
  </StrictMode>,
);
