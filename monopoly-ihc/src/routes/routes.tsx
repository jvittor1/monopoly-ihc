import { createBrowserRouter } from "react-router-dom";
import { GamePage } from "@/pages/game";
import { MenuPage } from "@/pages/menu";
import App from "@/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MenuPage />,
      },
      {
        path: "games",
        element: <GamePage />,
      },
    ],
  },
]);
