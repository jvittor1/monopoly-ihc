import React, { createContext, useContext, useState, Suspense } from "react";
import { ModalFactory } from "@/factories/modals-factory";
import type { Tile } from "@/hooks/use-board";
import type { BaseModalProps } from "@/types/modal-type";

export type ModalContextType = {
  showModalForTile: (
    tile: Tile,
    playerId: number,
    options?: Pick<BaseModalProps, "onClose" | "onAction">,
  ) => void;
  closeModal: () => void;
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

  const closeModal = () => setModalContent(null);

  const showModalForTile = (
    tile: Tile,
    playerId: number,
    options?: Pick<BaseModalProps, "onClose" | "onAction">,
  ) => {
    const ModalComponent = ModalFactory(tile);
    if (!ModalComponent) return;

    console.log("Showing modal for tile:", tile);

    setModalContent(
      <Suspense fallback={<div className="text-white">Carregando...</div>}>
        <ModalComponent
          tile={tile}
          playerId={playerId}
          onClose={() => {
            closeModal();
            options?.onClose?.();
          }}
          onAction={(payload) => {
            closeModal();
            options?.onAction?.(payload);
          }}
        />
      </Suspense>,
    );
  };

  return (
    <ModalContext.Provider value={{ showModalForTile, closeModal }}>
      {children}
      {modalContent}
    </ModalContext.Provider>
  );
}
