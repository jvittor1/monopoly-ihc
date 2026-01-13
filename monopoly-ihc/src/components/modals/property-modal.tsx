import { usePlayer } from "@/contexts/player-context";
import type { Player } from "@/interfaces/player";
import type { QuestionCard } from "@/interfaces/question-card";
import type { BaseModalProps } from "@/types/modal-type";
import OwnPropertyModal from "./own-property-modal";
import PayRentModal from "./pay-rent-modal";

type QuestionModalProps = BaseModalProps<QuestionCard>;

export default function PropertyRentModal({
  tile,
  playerId,
  onAction,
}: QuestionModalProps) {
  const { getPlayerById } = usePlayer();
  const currentPlayer = getPlayerById(playerId) as Player;
  const owner = getPlayerById(tile.ownerId!) as Player;

  const propertyName = tile.text;
  const rentAmount = tile.rentPrice || 0;
  const isOwner = currentPlayer.id === owner.id;

  if (isOwner) {
    return (
      <OwnPropertyModal
        propertyName={propertyName}
        rentPrice={rentAmount}
        playerId={playerId}
        onAction={onAction}
      />
    );
  }

  return (
    <PayRentModal
      propertyName={propertyName}
      rentPrice={rentAmount}
      owner={owner}
      currentPlayer={currentPlayer}
      playerId={playerId}
      onAction={onAction}
    />
  );
}
