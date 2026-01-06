import "./App.css";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="from-primary-gradient to-secondary-gradient flex min-h-screen w-full flex-row items-center justify-center gap-8 bg-linear-to-r p-4">
      <Outlet />
    </div>
  );
}

export default App;
