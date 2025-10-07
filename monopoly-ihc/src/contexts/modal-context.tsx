import React, {
  createContext,
  useContext,
  useState,
  Suspense,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import { ModalFactory } from "@/components/modals-factory";
import type { Tile } from "@/hooks/use-board";
import { eventBus } from "@/utils/event-emitter";

interface ModalContextType {
  showModalForTile: (tile: Tile, playerId: number) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
};

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null,
  );

  const closeModal = () => setModalContent(null);

  const showModalForTile = (tile: Tile, playerId: number) => {
    const ModalComponent = ModalFactory(tile);

    if (!ModalComponent) {
      console.warn(`Nenhum modal encontrado para tile do tipo "${tile.type}"`);
      return;
    }
    setModalContent(
      <Suspense fallback={<div className="text-white">Carregando...</div>}>
        <ModalComponent tile={tile} playerId={playerId} />
      </Suspense>,
    );
  };

  useEffect(() => {
    const handleShowModal = ({
      tile,
      playerId,
    }: {
      tile: Tile;
      playerId: number;
    }) => {
      showModalForTile(tile, playerId);
    };

    eventBus.on("showModal", handleShowModal);
    return () => {
      eventBus.off("showModal", handleShowModal);
    };
  }, []);

  useEffect(() => {
    const handleCloseModal = () => {
      closeModal();
    };
    eventBus.on("closeModal", handleCloseModal);
    return () => {
      eventBus.off("closeModal", handleCloseModal);
    };
  }, []);

  return (
    <ModalContext.Provider value={{ showModalForTile, closeModal }}>
      {children}
      {modalContent}
    </ModalContext.Provider>
  );
}
