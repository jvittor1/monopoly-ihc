import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.tsx";
import { DiceResultProvider } from "./contexts/dice-result-overlay-context.tsx";
import { GameProvider } from "./contexts/game-context.tsx";
import { ModalProvider } from "./contexts/modal-context.tsx";
import { AnswerProvider } from "./contexts/answer-context.tsx";
import { PlayerProvider } from "./contexts/player-context.tsx";
import { BoardProvider } from "./contexts/board-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BoardProvider>
      <PlayerProvider>
        <ModalProvider>
          <AnswerProvider>
            <GameProvider>
              <DiceResultProvider>
                <RouterProvider router={router} />
              </DiceResultProvider>
            </GameProvider>
          </AnswerProvider>
        </ModalProvider>
      </PlayerProvider>
    </BoardProvider>
  </StrictMode>,
);
