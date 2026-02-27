import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.tsx";
import { DiceResultProvider } from "./contexts/dice-result-overlay-context.tsx";
import { ModalProvider } from "./contexts/modal-context.tsx";
import { AnswerProvider } from "./contexts/answer-context.tsx";
import { PlayerProvider } from "./contexts/player-context.tsx";
import { BoardProvider } from "./contexts/board-context.tsx";
import { SoundProvider } from "./contexts/sound-context.tsx";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SoundProvider>
      <BoardProvider>
        <PlayerProvider>
          <ModalProvider>
            <AnswerProvider>
              <DiceResultProvider>
                <RouterProvider router={router} />
                <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  theme="dark"
                  transition={Slide}
                />
              </DiceResultProvider>
            </AnswerProvider>
          </ModalProvider>
        </PlayerProvider>
      </BoardProvider>
    </SoundProvider>
  </StrictMode>,
);
