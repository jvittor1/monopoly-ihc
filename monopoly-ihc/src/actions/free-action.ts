import type { Tile } from "@/hooks/use-board";
import type { Contexts } from "@/types/contexts-type";

export async function handleFreeAction(
  tile: Tile,
  playerId: number,
  contexts: Contexts,
): Promise<void> {
  const { modal } = contexts;

  await modal.showModalForTile(tile, playerId, {
    onAction: () => {},
  });
}
