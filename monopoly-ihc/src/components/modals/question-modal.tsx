import type { Tile } from "@/hooks/use-board";
import { eventBus } from "@/utils/event-emitter";

interface QuestionModalProps {
  tile: Tile;
  playerId: number;
}

export default function QuestionModal(props: QuestionModalProps) {
  const { tile, playerId } = props;

  const handleClose = () => {
    eventBus.emit("closeModal");
    eventBus.emit("nextTurn");
  };

  return (
    <div className="absolute top-1/2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded bg-white p-4 shadow-lg">
      Modal de {tile.type} para o jogador {playerId}
      <button onClick={handleClose}>Fechar</button>
    </div>
  );
}
