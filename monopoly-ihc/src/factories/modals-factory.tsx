import type { Tile } from "@/hooks/use-board";
import type { CornerTile } from "@/interfaces/corner-tile";
import type { QuestionCard } from "@/interfaces/question-card";
import React from "react";

type ModalComponentForTile<T extends Tile> = React.FC<{
  tile: T;
  playerId: number;
}>;

const ModalsRegistry = {
  question: React.lazy(
    () => import("../components/modals/question-modal"),
  ) as ModalComponentForTile<QuestionCard>,
  start: React.lazy(
    () => import("../components/modals/start-modal"),
  ) as ModalComponentForTile<CornerTile>,
  jail: React.lazy(
    () => import("../components/modals/jail-modal"),
  ) as ModalComponentForTile<CornerTile>,
  free: React.lazy(
    () => import("../components/modals/free-parking-modal"),
  ) as ModalComponentForTile<CornerTile>,
  "go-to-jail": React.lazy(
    () => import("../components/modals/go-to-jail-modal"),
  ) as ModalComponentForTile<CornerTile>,
  random: React.lazy(
    () => import("../components/modals/question-modal"),
  ) as ModalComponentForTile<QuestionCard>,
  property: React.lazy(
    () => import("../components/modals/question-modal"),
  ) as ModalComponentForTile<QuestionCard>,
};

export function ModalFactory(tile: Tile) {
  return ModalsRegistry[tile.type] || null;
}
