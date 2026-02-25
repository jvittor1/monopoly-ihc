import React, {
  createContext,
  useContext,
  useState,
  Suspense,
  useRef,
} from "react";
import { ModalFactory } from "@/factories/modals-factory";
import type { BaseModalProps } from "@/types/modal-type";
import type { Player } from "@/interfaces/player";
import type { Tile } from "@/types/tile";
import type { QuestionCard } from "@/interfaces/question-card";

const ChoiceModal = React.lazy(
  () => import("@/components/modals/choice-modal"),
);

export type ModalContextType = {
  showModalForTile: (
    tile: Tile,
    playerId: number,
    options?: Pick<BaseModalProps, "onAction">,
  ) => Promise<any>;
  showChoiceModal: (
    tile: QuestionCard,
    playerId: number,
    options?: Pick<BaseModalProps, "onAction">,
  ) => Promise<any>;
  closeModal: () => void;
  showJailTurnSkipModal: (player: Player) => Promise<void>;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
};

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null,
  );

  const resolveRef = useRef<((value: any) => void) | null>(null);
  const resolveJailRef = useRef<(() => void) | null>(null);

  const closeJailModal = () => {
    setModalContent(null);
    if (resolveJailRef.current) {
      resolveJailRef.current();
      resolveJailRef.current = null;
    }
  };

  const closeModal = (payload?: any) => {
    setModalContent(null);
    if (resolveRef.current) {
      resolveRef.current(payload);
      resolveRef.current = null;
    }
  };

  const showModalForTile = (
    tile: Tile,
    playerId: number,
    options?: Pick<BaseModalProps, "onAction">,
  ): Promise<any> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;

      const ModalComponent = ModalFactory(tile);
      if (!ModalComponent) {
        closeModal();
        return;
      }

      console.log("Showing modal for tile:", tile);

      setModalContent(
        <Suspense fallback={<div className="text-white">Carregando...</div>}>
          <ModalComponent
            tile={tile}
            playerId={playerId}
            onAction={async (payload: any) => {
              await options?.onAction?.(payload);
              closeModal(payload);
            }}
          />
        </Suspense>,
      );
    });
  };

  const showChoiceModal = (
    tile: QuestionCard,
    playerId: number,
    options?: Pick<BaseModalProps, "onAction">,
  ): Promise<any> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;

      setModalContent(
        <Suspense fallback={<div className="text-white">Carregando...</div>}>
          <ChoiceModal
            tile={tile}
            playerId={playerId}
            onAction={async (payload: any) => {
              await options?.onAction?.(payload);
              closeModal(payload);
            }}
          />
        </Suspense>,
      );
    });
  };

  const showJailTurnSkipModal = (player: Player): Promise<void> => {
    return new Promise((resolve) => {
      resolveJailRef.current = resolve;

      const ModalComponent = React.lazy(
        () => import("@/components/modals/jail-turn-modal"),
      );
      setModalContent(
        <Suspense fallback={<div className="text-white">Carregando...</div>}>
          <ModalComponent
            player={player}
            playerId={player.id}
            onClose={() => {
              closeJailModal();
            }}
          />
        </Suspense>,
      );
    });
  };

  return (
    <ModalContext.Provider
      value={{
        showModalForTile,
        showChoiceModal,
        closeModal,
        showJailTurnSkipModal,
      }}
    >
      {children}
      {modalContent}
    </ModalContext.Provider>
  );
}
