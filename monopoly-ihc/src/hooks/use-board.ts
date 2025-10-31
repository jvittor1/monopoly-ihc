// import { cornerTiles } from "@/data/corner-cards";
// import { mockQuestionCards } from "@/data/card-mock";
// import type { QuestionCard } from "@/interfaces/question-card";
// import type { CornerTile } from "@/interfaces/corner-tile";
// import { useState } from "react";

// const initialBoard: Tile[] = [
//   cornerTiles[0],
//   ...mockQuestionCards.slice(0, 4),
//   cornerTiles[1],
//   ...mockQuestionCards.slice(4, 10).reverse(),
//   cornerTiles[2],
//   ...mockQuestionCards.slice(10, 14).reverse(),
//   cornerTiles[3],
//   ...mockQuestionCards.slice(14, 20),
// ];

// export type BoardHookReturn = {
//   boardTiles: Tile[];
//   getTileByIndex: (index: number) => Tile;
//   updateTile: (tileId: number, ownerId: number) => void;
// };

// export function useBoard(): BoardHookReturn {
//   const [boardTiles, setBoardTiles] = useState<Tile[]>(initialBoard);

//   const getTileByIndex = (index: number) => boardTiles[index];

//   const updateTile = (tileId: number, ownerId: number) => {
//     setBoardTiles((prevTiles) =>
//       prevTiles.map((tile) =>
//         "ownerId" in tile && tile.id === tileId
//           ? { ...tile, ownerId, type: "property" }
//           : tile,
//       ),
//     );
//   };

//   return { boardTiles, getTileByIndex, updateTile };
// }
