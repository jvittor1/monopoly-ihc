import type { Tile } from "@/hooks/use-board";
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
    () => import("../components/modals/question-modal"),
  ) as ModalComponentForTile<QuestionCard>,
  jail: React.lazy(
    () => import("../components/modals/question-modal"),
  ) as ModalComponentForTile<QuestionCard>,
  free: React.lazy(
    () => import("../components/modals/question-modal"),
  ) as ModalComponentForTile<QuestionCard>,
  "go-to-jail": React.lazy(
    () => import("../components/modals/question-modal"),
  ) as ModalComponentForTile<QuestionCard>,
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
