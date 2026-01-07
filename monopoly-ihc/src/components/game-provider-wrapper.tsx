import { useNavigate } from "react-router";
import { GameProvider } from "@/contexts/game-context";

interface GameProviderWrapperProps {
  children: React.ReactNode;
}

export const GameProviderWrapper: React.FC<GameProviderWrapperProps> = ({
  children,
}) => {
  const navigate = useNavigate();

  return (
    <GameProvider onBackToMenu={() => navigate("/")}>{children}</GameProvider>
  );
};
