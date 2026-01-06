import { useNavigate } from "react-router";

export const MenuPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <h1>Menu</h1>
      <button
        onClick={() => {
          navigate("/games");
        }}
      >
        Jogar
      </button>
    </div>
  );
};
