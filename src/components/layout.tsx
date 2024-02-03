import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";

export const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
