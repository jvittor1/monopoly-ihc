import type { Contexts } from "@/types/contexts-type";
import type { Tile } from "@/types/tile";

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
