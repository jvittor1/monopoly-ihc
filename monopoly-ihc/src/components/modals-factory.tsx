import type { Tile } from "@/hooks/use-board";
import type { BaseTile } from "@/interfaces/base-tile";
import React from "react";

type ModalsFactoryProps = {
  tile: Tile;
  playerId: number;
};

const ModalsRegistry: Record<BaseTile["type"], React.FC<ModalsFactoryProps>> = {
  question: React.lazy(() => import("./modals/question-modal")),
  start: React.lazy(() => import("./modals/question-modal")),
  prison: React.lazy(() => import("./modals/question-modal")),
  free: React.lazy(() => import("./modals/question-modal")),
  "go-to-prison": React.lazy(() => import("./modals/question-modal")),
  random: React.lazy(() => import("./modals/question-modal")),
  property: React.lazy(() => import("./modals/question-modal")),
};

export function ModalFactory(tile: Tile) {
  return ModalsRegistry[tile.type] || null;
}
